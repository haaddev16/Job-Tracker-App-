import type { Status } from '@/types'

export const COLUMNS: { id: Status; label: string }[] = [
  { id: 'applied', label: 'Applied' },
  { id: 'interview', label: 'Interview' },
  { id: 'offer', label: 'Offer' },
  { id: 'rejected', label: 'Rejected' },
]

export const COL: Record<
  Status,
  { dot: string; badge: string; badgeText: string; hdr: (d: boolean) => string }
> = {
  applied: {
    dot: '#94a3b8',
    badge: '#efe8dc',
    badgeText: '#475569',
    hdr: (d) => (d ? '#171f2e' : '#f7f1dc'),
  },
  interview: {
    dot: '#f59e0b',
    badge: '#fef3c7',
    badgeText: '#78350f',
    hdr: (d) => (d ? '#1c1a10' : '#fbf3d4'),
  },
  offer: {
    dot: '#10b981',
    badge: '#d1fae5',
    badgeText: '#065f46',
    hdr: (d) => (d ? '#0d1f16' : '#eef8f0'),
  },
  rejected: {
    dot: '#ef4444',
    badge: '#fee2e2',
    badgeText: '#991b1b',
    hdr: (d) => (d ? '#1f1010' : '#faf0ee'),
  },
}

export const COMPANY_COLORS: Record<string, string> = {
  Stripe: '#635bff',
  Notion: '#374151',
  Airbnb: '#ff385c',
  Google: '#4285f4',
  Figma: '#a259ff',
  Linear: '#5e6ad2',
  Vercel: '#000000',
  Netflix: '#e50914',
  Spotify: '#1db954',
  Meta: '#0866ff',
  Apple: '#555',
  Shopify: '#5a8a3c',
  'Goldman Sachs & Co.': '#6b5e3a',
  Anthropic: '#d97706',
}
