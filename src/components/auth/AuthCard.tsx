import { LogoMark } from '@/components/ui/LogoMark'
import { th } from '@/theme/theme'

type Props = { dark: boolean; children: React.ReactNode }

export function AuthCard({ dark, children }: Props) {
  const t = th(dark)
  return (
    <div
      className="auth-rgb-bg auth-card-outer"
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="auth-rgb-blob auth-rgb-blob-r" />
      <div className="auth-rgb-blob auth-rgb-blob-g" />
      <div className="auth-rgb-blob auth-rgb-blob-b" />

      <div
        className="auth-card-inner"
        style={{
          position: 'relative',
          zIndex: 1,
          backgroundColor: dark ? 'rgba(15, 23, 42, 0.82)' : 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          borderRadius: 16,
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
          border: `1px solid ${dark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.55)'}`,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            marginBottom: 28,
          }}
        >
          <LogoMark size={52} />
          <span style={{ fontSize: 15, fontWeight: 700, color: t.text, letterSpacing: '-0.3px' }}>
            Job Tracker
          </span>
        </div>
        {children}
      </div>
    </div>
  )
}
