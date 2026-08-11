import { useEffect, useState } from 'react'
import { LogoMark } from '@/components/ui/LogoMark'
import {
  IconBoard,
  IconDashboard,
  IconList,
  IconLogOut,
  IconMenu,
  IconMoon,
  IconSettings,
  IconSun,
  IconX,
} from '@/icons'
import { th, ACCENT } from '@/theme/theme'
import type { Screen, User } from '@/types'

type Props = {
  user: User
  active: Screen
  nav: (s: Screen) => void
  dark: boolean
  setDark: (v: boolean) => void
  onLogout: () => void
  children: React.ReactNode
}

const MENU: { id: Screen; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <IconDashboard /> },
  { id: 'board', label: 'Board', icon: <IconBoard /> },
  { id: 'applications', label: 'All Applications', icon: <IconList /> },
  { id: 'profile', label: 'Settings', icon: <IconSettings /> },
]

export function AppShell({ user, active, nav, dark, setDark, onLogout, children }: Props) {
  const t = th(dark)
  const [open, setOpen] = useState(false)
  const first = user.name.split(' ')[0] || user.name

  useEffect(() => {
    setOpen(false)
  }, [active])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  function go(s: Screen) {
    nav(s)
    setOpen(false)
  }

  const sidebar = (
    <aside
      className={`app-sidebar${open ? ' is-open' : ''}`}
      style={{
        backgroundColor: t.surface,
        borderRight: `1px solid ${t.border}`,
        color: t.text,
      }}
    >
      <div className="app-sidebar-brand">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <LogoMark size={34} />
          <div style={{ minWidth: 0 }}>
            <p
              style={{
                margin: 0,
                fontSize: 14.5,
                fontWeight: 700,
                color: t.text,
                letterSpacing: '-0.3px',
                whiteSpace: 'nowrap',
              }}
            >
              Job Tracker
            </p>
            <p
              style={{
                margin: '2px 0 0',
                fontSize: 12,
                color: t.textMuted,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: 140,
              }}
            >
              {user.name}
            </p>
          </div>
        </div>
      </div>

      <nav className="app-sidebar-nav" aria-label="Main">
        {MENU.map((item) => {
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              type="button"
              className={`app-sidebar-link${isActive ? ' is-active' : ''}`}
              onClick={() => go(item.id)}
              style={{
                color: isActive ? ACCENT : t.textSub,
                backgroundColor: isActive ? (dark ? 'rgba(99,102,241,0.15)' : 'rgba(79,70,229,0.08)') : 'transparent',
              }}
            >
              <span className="app-sidebar-link-accent" style={{ backgroundColor: isActive ? ACCENT : 'transparent' }} />
              <span style={{ display: 'flex', flexShrink: 0 }}>{item.icon}</span>
              <span style={{ fontWeight: isActive ? 650 : 500 }}>{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="app-sidebar-footer">
        <button
          type="button"
          className="app-sidebar-link"
          onClick={() => setDark(!dark)}
          style={{ color: t.textSub }}
        >
          <span className="app-sidebar-link-accent" />
          <span style={{ display: 'flex' }}>{dark ? <IconSun /> : <IconMoon />}</span>
          <span>{dark ? 'Light mode' : 'Dark mode'}</span>
        </button>
        <button
          type="button"
          className="app-sidebar-link"
          onClick={onLogout}
          style={{ color: '#ef4444' }}
        >
          <span className="app-sidebar-link-accent" />
          <span style={{ display: 'flex' }}>
            <IconLogOut />
          </span>
          <span>Log out</span>
        </button>
      </div>
    </aside>
  )

  return (
    <div className="app-shell" style={{ backgroundColor: t.bg }}>
      <div
        className={`app-sidebar-backdrop${open ? ' is-open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />
      {sidebar}
      <div className="app-shell-main">
        <header
          className="app-topbar"
          style={{
            backgroundColor: t.nav,
            borderBottom: `1px solid ${t.border}`,
          }}
        >
          <button
            type="button"
            className="app-hamburger touch-target"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            style={{
              color: t.textSub,
              background: 'none',
              border: `1px solid ${t.border}`,
              borderRadius: 8,
            }}
          >
            <IconMenu />
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: 13.5, fontWeight: 700, color: t.text }}>
              {MENU.find((m) => m.id === active)?.label ?? 'Job Tracker'}
            </p>
            <p style={{ margin: 0, fontSize: 11.5, color: t.textMuted, display: 'none' }} className="app-topbar-user">
              {first}
            </p>
          </div>
          {open && (
            <button
              type="button"
              className="app-hamburger touch-target"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              style={{
                color: t.textSub,
                background: 'none',
                border: `1px solid ${t.border}`,
                borderRadius: 8,
              }}
            >
              <IconX />
            </button>
          )}
        </header>
        <div className="app-shell-content">
          <div key={active} className="page-fade">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
