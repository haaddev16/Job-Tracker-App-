import { IconLogOut, IconSettings, IconUser } from '@/icons'
import { th } from '@/theme/theme'
import type { Screen, User } from '@/types'

type Props = {
  user: User
  dark: boolean
  nav: (s: Screen) => void
  onLogout: () => void
  onClose: () => void
}

export function AvatarMenu({ user, dark, nav, onLogout, onClose }: Props) {
  const t = th(dark)
  return (
    <div
      className="avatar-menu"
      onMouseDown={(e) => e.stopPropagation()}
      style={{
        position: 'absolute',
        right: 0,
        top: 'calc(100% + 8px)',
        backgroundColor: t.surface,
        borderRadius: 10,
        border: `1px solid ${t.border}`,
        boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
        overflow: 'hidden',
        zIndex: 100,
      }}
    >
      <div style={{ padding: '12px 14px', borderBottom: `1px solid ${t.borderLight}` }}>
        <p style={{ margin: '0 0 2px', fontSize: 12.5, fontWeight: 700, color: t.text }}>{user.name}</p>
        <p style={{ margin: 0, fontSize: 11.5, color: t.textSub }}>{user.email}</p>
      </div>
      {(
        [
          { icon: <IconUser />, label: 'Profile', action: () => nav('profile') },
          { icon: <IconSettings />, label: 'Settings', action: () => nav('profile') },
        ] as const
      ).map((item) => (
        <button
          key={item.label}
          onClick={() => {
            item.action()
            onClose()
          }}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 9,
            padding: '9px 14px',
            border: 'none',
            backgroundColor: 'transparent',
            color: t.textSub,
            fontSize: 12.5,
            fontWeight: 500,
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          {item.icon} {item.label}
        </button>
      ))}
      <div style={{ borderTop: `1px solid ${t.borderLight}` }}>
        <button
          onClick={onLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 9,
            padding: '9px 14px',
            border: 'none',
            backgroundColor: 'transparent',
            color: '#ef4444',
            fontSize: 12.5,
            fontWeight: 500,
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <IconLogOut /> Log out
        </button>
      </div>
    </div>
  )
}
