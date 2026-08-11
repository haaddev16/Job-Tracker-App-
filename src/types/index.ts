export type Screen =
  | 'login'
  | 'signup'
  | 'forgot'
  | 'onboarding'
  | 'dashboard'
  | 'board'
  | 'applications'
  | 'profile'

export type BoardView = 'loaded' | 'loading' | 'error'
export type Status = 'applied' | 'interview' | 'offer' | 'rejected'

export interface User {
  id: string
  name: string
  email: string
}

export interface Application {
  id: string
  company: string
  role: string
  appliedDate: string
  jobLink: string
  notes: string
  status: Status
  color: string
}

export interface ToastItem {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
  leaving?: boolean
}

export type ThemeTokens = {
  bg: string
  surface: string
  surfaceHov: string
  border: string
  borderLight: string
  text: string
  textSub: string
  textMuted: string
  input: string
  inputBorder: string
  colBg: string
  nav: string
  skelBase: string
  skelClass: string
}
