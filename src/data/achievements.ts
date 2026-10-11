import type { AchievementItem } from '../types'

/**
 * ACHIEVEMENTS CONFIGURATION
 * 
 * In adherence to portfolio truthfulness standards:
 * No certificates, awards, rankings, or hackathon achievements are currently claimed.
 * 
 * To add a verified achievement in the future:
 * Add an entry to the `achievements` array with title, description, issuing organization,
 * date, and optional certificate image / verification URL.
 */
export const initialAchievements: AchievementItem[] = [
  // Deliberately empty: Will render a respectful GTA V heist/mission "NO ACTIVE UNLOCKED AWARDS YET" empty state.
]
