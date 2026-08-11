import type { ThemeTokens } from '@/types'

export function th(dark: boolean): ThemeTokens {
  if (dark) {
    return {
      bg: '#0f172a',
      surface: '#1e293b',
      surfaceHov: '#273348',
      border: '#334155',
      borderLight: '#1e2d42',
      text: '#f1f5f9',
      textSub: '#94a3b8',
      textMuted: '#64748b',
      input: '#1e293b',
      inputBorder: '#334155',
      colBg: '#111827',
      nav: 'rgba(15,23,42,0.95)',
      skelBase: '#1e293b',
      skelClass: 'skeleton-dark',
    }
  }
  return {
    bg: '#fbf6e4',
    surface: '#fffced',
    surfaceHov: '#f5efd8',
    border: '#ebe2c4',
    borderLight: '#f3ecd4',
    text: '#0f172a',
    textSub: '#64748b',
    textMuted: '#94a3b8',
    input: '#fffced',
    inputBorder: '#e5dcb8',
    colBg: '#f5efd8',
    nav: 'rgba(251,246,228,0.95)',
    skelBase: '#ebe2c4',
    skelClass: 'skeleton',
  }
}

export const ACCENT = '#4f46e5'
export const ACCENT_HOV = '#4338ca'
export const ACCENT_SOFT = '#6366f1'
