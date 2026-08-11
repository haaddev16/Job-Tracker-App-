import { COMPANY_COLORS } from '@/constants/columns'

export function daysAgo(d: string): string {
  const diff = Math.floor((Date.now() - new Date(d).getTime()) / 86400000)
  if (diff === 0) return 'Applied today'
  if (diff === 1) return 'Applied 1 day ago'
  return `Applied ${diff} days ago`
}

export function toDay(): string {
  return new Date().toISOString().slice(0, 10)
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 9)
}

export function initials(n: string): string {
  return n
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase()
}

export function companyColor(c: string): string {
  return COMPANY_COLORS[c] ?? '#6366f1'
}

export function passwordStrength(p: string) {
  if (!p) return null
  if (p.length < 8) return { label: 'Too short', color: '#ef4444', w: '20%' }
  if (p.length < 10 || !/[A-Z]/.test(p)) return { label: 'Fair', color: '#f59e0b', w: '50%' }
  if (p.length < 14) return { label: 'Good', color: '#3b82f6', w: '75%' }
  return { label: 'Strong', color: '#10b981', w: '100%' }
}

export function greetingForHour(hour = new Date().getHours()): string {
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}
