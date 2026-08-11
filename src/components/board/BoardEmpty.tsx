import { PrimaryBtn } from '@/components/ui/PrimaryBtn'
import { ACCENT } from '@/theme/theme'
import { th } from '@/theme/theme'

type Props = { dark: boolean; onAdd: () => void }

export function BoardEmpty({ dark, onAdd }: Props) {
  const t = th(dark)
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(2.5rem, 10vw, 5rem) clamp(1rem, 4vw, 1.5rem)',
        gap: 16,
        width: '100%',
        boxSizing: 'border-box' as const,
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 18,
          backgroundColor: '#eef2ff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="3" y="4" width="8" height="24" rx="2.5" fill="#6366f1" opacity="0.2" />
          <rect x="13" y="4" width="8" height="15" rx="2.5" fill="#6366f1" opacity="0.5" />
          <rect x="23" y="4" width="6" height="19" rx="2.5" fill="#6366f1" opacity="0.75" />
          <circle cx="25" cy="26" r="6" fill={ACCENT} />
          <path d="M25 23v6M22 26h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: t.text, margin: '0 0 6px', letterSpacing: '-0.4px' }}>
          No applications yet
        </h2>
        <p style={{ fontSize: 13.5, color: t.textSub, margin: 0, lineHeight: 1.55, maxWidth: 290 }}>
          Start tracking your job search — add your first application to get started.
        </p>
      </div>
      <PrimaryBtn onClick={onAdd}>+ Add Application</PrimaryBtn>
    </div>
  )
}
