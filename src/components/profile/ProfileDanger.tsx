import { IconLogOut, IconTrash } from '@/icons'
import type { ThemeTokens } from '@/types'

type Props = {
  t: ThemeTokens
  onLogout: () => void
  onDeleteAccount: () => void
}

export function ProfileDanger({ t, onLogout, onDeleteAccount }: Props) {
  const btn = {
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: 7,
    padding: '8px 14px',
    minHeight: 44,
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer' as const,
    width: 'fit-content' as const,
    maxWidth: '100%',
  }
  return (
    <div
      style={{
        backgroundColor: t.surface,
        borderRadius: 12,
        border: `1px solid ${t.border}`,
        overflow: 'hidden',
        marginBottom: 14,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}
    >
      <div style={{ padding: '13px 18px', borderBottom: `1px solid ${t.borderLight}` }}>
        <p style={{ margin: 0, fontSize: 12.5, fontWeight: 700, color: t.text }}>Danger Zone</p>
      </div>
      <div style={{ padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button
          onClick={onLogout}
          style={{
            ...btn,
            border: `1.5px solid ${t.border}`,
            background: 'transparent',
            color: t.textSub,
          }}
        >
          <IconLogOut /> Log out
        </button>
        <button
          onClick={onDeleteAccount}
          style={{
            ...btn,
            border: '1.5px solid #fecaca',
            backgroundColor: '#fff1f2',
            color: '#dc2626',
          }}
        >
          <IconTrash /> Delete Account
        </button>
      </div>
    </div>
  )
}
