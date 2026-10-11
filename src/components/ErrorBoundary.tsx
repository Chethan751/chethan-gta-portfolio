import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by portfolio ErrorBoundary:', error, errorInfo)
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0a0b10] flex items-center justify-center p-6 text-slate-100">
          <div className="max-w-md w-full bg-[#141724] border border-amber-500/40 p-8 rounded-lg text-center shadow-2xl">
            <div className="w-16 h-16 mx-auto mb-4 bg-amber-500/10 border border-amber-500 rounded-full flex items-center justify-center text-amber-500">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black font-gta tracking-wider text-amber-400 mb-2">
              MISSION SYSTEM INTERRUPTED
            </h2>
            <p className="text-sm text-slate-300 mb-6">
              An unexpected interface error occurred. You can restore the connection by reloading.
            </p>
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-gta font-bold rounded tracking-wider transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              RELOAD WORLD
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
