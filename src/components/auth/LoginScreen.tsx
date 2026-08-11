import { useState } from 'react'
import { AuthCard } from '@/components/auth/AuthCard'
import { GoogleBtn } from '@/components/auth/GoogleBtn'
import { Divider } from '@/components/ui/Divider'
import { PrimaryBtn } from '@/components/ui/PrimaryBtn'
import { TextInput } from '@/components/ui/TextInput'
import { IconEye, IconEyeOff } from '@/icons'
import { th, ACCENT_SOFT } from '@/theme/theme'
import type { Screen } from '@/types'

type Props = {
  nav: (s: Screen) => void
  dark: boolean
  onLogin: (email: string, password: string) => Promise<void>
  error?: string | null
}

export function LoginScreen({ nav, dark, onLogin, error }: Props) {
  const t = th(dark)
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [show, setShow] = useState(false)
  const [busy, setBusy] = useState(false)

  async function submit() {
    if (!email.trim() || !pass) return
    setBusy(true)
    try {
      await onLogin(email.trim(), pass)
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthCard dark={dark}>
      <h1
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: t.text,
          margin: '0 0 5px',
          textAlign: 'center',
          letterSpacing: '-0.5px',
        }}
      >
        Welcome back
      </h1>
      <p style={{ fontSize: 14, color: t.textSub, textAlign: 'center', margin: '0 0 28px' }}>
        Sign in to your account to continue.
      </p>
      <div className="auth-form-fields" style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
        <TextInput
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={setEmail}
          dark={dark}
          required
        />
        <TextInput
          label="Password"
          type={show ? 'text' : 'password'}
          placeholder="••••••••"
          value={pass}
          onChange={setPass}
          dark={dark}
          required
          suffix={
            <button
              onClick={() => setShow((v) => !v)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                color: t.textMuted,
                display: 'flex',
              }}
            >
              {show ? <IconEyeOff /> : <IconEye />}
            </button>
          }
        />
        <div style={{ textAlign: 'right', marginTop: -6 }}>
          <button
            onClick={() => nav('forgot')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 13,
              color: ACCENT_SOFT,
              fontWeight: 500,
            }}
          >
            Forgot password?
          </button>
        </div>
        {error && (
          <p className="auth-error" style={{ margin: 0, fontSize: 13, color: '#dc2626', textAlign: 'center' }}>
            {error}
          </p>
        )}
        <PrimaryBtn full disabled={busy} onClick={submit}>
          {busy ? 'Logging in…' : 'Log In'}
        </PrimaryBtn>
        <Divider text="or" dark={dark} />
        <GoogleBtn dark={dark} />
        <p style={{ textAlign: 'center', fontSize: 13, color: t.textSub, margin: 0 }}>
          {"Don't have an account? "}
          <button
            onClick={() => nav('signup')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: ACCENT_SOFT,
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            Sign up
          </button>
        </p>
      </div>
    </AuthCard>
  )
}
