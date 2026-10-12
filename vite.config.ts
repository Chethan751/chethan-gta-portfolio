import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import type { IncomingMessage, ServerResponse } from 'http'
import chatHandler from './api/chat.ts'

function localApiPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'local-api-handler',
    configureServer(server) {
      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
        const url = req.url || ''
        if (url === '/api/chat' || url.startsWith('/api/chat?')) {
          // Inject loaded env into process.env for local development
          Object.assign(process.env, env)

          let rawBody = ''
          req.on('data', (chunk) => {
            rawBody += chunk
          })

          req.on('end', async () => {
            try {
              ;(req as unknown as { body: unknown }).body = rawBody ? JSON.parse(rawBody) : {}
            } catch {
              ;(req as unknown as { body: unknown }).body = {}
            }

            const vercelRes = res as unknown as {
              status: (code: number) => typeof vercelRes
              json: (data: unknown) => typeof vercelRes
              setHeader: (key: string, value: string) => void
              statusCode: number
              end: (data?: string) => void
            }

            vercelRes.status = (code: number) => {
              res.statusCode = code
              return vercelRes
            }

            vercelRes.json = (data: unknown) => {
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(data))
              return vercelRes
            }

            try {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              await chatHandler(req as any, vercelRes as any)
            } catch (err) {
              console.error('Local API dev handler error:', err)
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'LOCAL_DEV_ERROR', message: String(err) }))
            }
          })
          return
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss(), localApiPlugin(env)],
  }
})
