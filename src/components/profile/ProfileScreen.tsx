import { useState } from 'react'
import { deleteMe, updateMe } from '@/api/auth'
import { ProfileDanger } from '@/components/profile/ProfileDanger'
import { PrimaryBtn } from '@/components/ui/PrimaryBtn'
import { initials } from '@/utils/helpers'
import { th, ACCENT, ACCENT_SOFT } from '@/theme/theme'
import type { Screen, User } from '@/types'

type Props = {
  user: User
  setUser: (u: User) => void
  nav: (s: Screen) => void
  dark: boolean
  onLogout: () => void
}

export function ProfileScreen({ user, setUser, nav, dark, onLogout }: Props) {
  const t = th(dark)
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const sec = {
    backgroundColor: t.surface,
    borderRadius: 12,
    border: `1px solid ${t.border}`,
    overflow: 'hidden' as const,
    marginBottom: 14,
    boxShadow: dark ? '0 1px 4px rgba(0,0,0,0.25)' : '0 1px 3px rgba(0,0,0,0.05)',
  }
  const iStyle = {
    width: '100%',
    minHeight: 44,
    padding: '9px 12px',
    borderRadius: 8,
    border: `1.5px solid ${t.inputBorder}`,
    backgroundColor: t.input,
    color: t.text,
    fontSize: 16,
    outline: 'none',
    boxSizing: 'border-box' as const,
  }

  async function save() {
    setBusy(true)
    setError(null)
    try {
      const me = await updateMe({ name, email })
      setUser(me)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setBusy(false)
    }
  }

  async function removeAccount() {
    if (!confirm('Delete your account permanently?')) return
    await deleteMe()
    onLogout()
  }

  return (
    <div className="page-pad" style={{ maxWidth: 640 }}>
      <h1
        style={{
          fontSize: 'clamp(1.25rem, 4vw, 1.375rem)',
          fontWeight: 800,
          color: t.text,
          margin: '0 0 24px',
        }}
      >
        Profile & Settings
      </h1>
      <div style={{ ...sec, padding: 'clamp(1rem, 4vw, 1.5rem)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              backgroundColor: ACCENT,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 20,
              fontWeight: 800,
            }}
          >
            {initials(name)}
          </div>
          <div>
            <p style={{ margin: '0 0 3px', fontSize: 15, fontWeight: 700, color: t.text }}>{name || 'Your Name'}</p>
            <p style={{ margin: 0, fontSize: 13, color: t.textSub }}>{email}</p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: t.textSub, display: 'block', marginBottom: 6 }}>
              Full Name
            </label>
            <input style={iStyle} value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: t.textSub, display: 'block', marginBottom: 6 }}>
              Email
            </label>
            <input type="email" style={iStyle} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          {error && <p style={{ margin: 0, color: '#dc2626', fontSize: 13 }}>{error}</p>}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <PrimaryBtn disabled={busy} onClick={save}>
              {saved ? '✓ Saved' : busy ? 'Saving…' : 'Save Changes'}
            </PrimaryBtn>
          </div>
        </div>
      </div>
      <div style={sec}>
        <div style={{ padding: '13px 18px', borderBottom: `1px solid ${t.borderLight}` }}>
          <p style={{ margin: 0, fontSize: 12.5, fontWeight: 700, color: t.text }}>Security</p>
        </div>
        <div
          style={{
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ minWidth: 0, flex: '1 1 10rem' }}>
            <p style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 600, color: t.text }}>Password</p>
            <p style={{ margin: 0, fontSize: 12, color: t.textSub }}>Use forgot password to reset</p>
          </div>
          <button
            onClick={() => nav('forgot')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: ACCENT_SOFT,
              fontSize: 13,
              fontWeight: 600,
              minHeight: 44,
              padding: '0 4px',
              whiteSpace: 'nowrap',
            }}
          >
            Change Password
          </button>
        </div>
      </div>
      <ProfileDanger t={t} onLogout={onLogout} onDeleteAccount={removeAccount} />
    </div>
  )
}
