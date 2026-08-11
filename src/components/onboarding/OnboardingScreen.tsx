import { LogoMark } from '@/components/ui/LogoMark'
import { th, ACCENT } from '@/theme/theme'
import type { Screen, User } from '@/types'

type Props = {
  user: User
  dark: boolean
  nav: (s: Screen) => void
  onAdd: () => void
}

export function OnboardingScreen({ user, dark, nav, onAdd }: Props) {
  const t = th(dark)
  const first = user.name.split(' ')[0] || 'there'

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', backgroundColor: t.bg, overflowX: 'hidden' }}>
      <nav
        className="profile-nav"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: 52,
          borderBottom: `1px solid ${t.border}`,
          backgroundColor: t.nav,
          backdropFilter: 'blur(10px)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <LogoMark size={28} />
          <span style={{ fontSize: 14, fontWeight: 700, color: t.text, letterSpacing: '-0.3px' }}>
            Job Tracker
          </span>
        </div>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            backgroundColor: ACCENT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 12,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {first[0].toUpperCase()}
        </div>
      </nav>
      <div
        className="onboarding-content"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            width: 76,
            height: 76,
            borderRadius: 22,
            backgroundColor: '#eef2ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
            <rect x="3" y="5" width="10" height="28" rx="3" fill="#6366f1" opacity="0.2" />
            <rect x="15" y="5" width="10" height="18" rx="3" fill="#6366f1" opacity="0.5" />
            <rect x="27" y="5" width="8" height="22" rx="3" fill="#6366f1" opacity="0.75" />
            <circle cx="30" cy="30" r="7.5" fill={ACCENT} />
            <path d="M30 26.5v7M26.5 30h7" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
        <div style={{ textAlign: 'center', width: '100%', maxWidth: 340, padding: '0 0.25rem' }}>
          <h1
            style={{
              fontSize: 'clamp(1.35rem, 5vw, 1.625rem)',
              fontWeight: 800,
              color: t.text,
              margin: '0 0 8px',
              letterSpacing: '-0.6px',
            }}
          >
            Welcome, {first} 👋
          </h1>
          <p style={{ fontSize: 15, color: t.textSub, margin: '0 0 4px' }}>
            Your board already has sample applications to explore.
          </p>
          <p style={{ fontSize: 13.5, color: t.textMuted, margin: '0 auto', lineHeight: 1.6 }}>
            Track every job you apply to — from first touch to final offer.
          </p>
        </div>
        <button
          onClick={() => {
            onAdd()
            nav('board')
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 24px',
            minHeight: 44,
            borderRadius: 10,
            border: 'none',
            backgroundColor: ACCENT,
            color: '#fff',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 18px rgba(79,70,229,0.35)',
          }}
        >
          <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> Add Application
        </button>
        <p style={{ fontSize: 13, color: t.textMuted }}>
          {'or '}
          <button
            onClick={() => nav('dashboard')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#6366f1',
              fontWeight: 500,
              fontSize: 13,
              minHeight: 44,
              padding: '0 4px',
            }}
          >
            go to your dashboard
          </button>
        </p>
      </div>
    </div>
  )
}
