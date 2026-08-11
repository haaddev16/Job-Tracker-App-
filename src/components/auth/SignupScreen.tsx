import { useState } from 'react'
import { AuthCard } from '@/components/auth/AuthCard'
import { GoogleBtn } from '@/components/auth/GoogleBtn'
import { Divider } from '@/components/ui/Divider'
import { PrimaryBtn } from '@/components/ui/PrimaryBtn'
import { TextInput } from '@/components/ui/TextInput'
import { IconCheck, IconEye, IconEyeOff } from '@/icons'
import { passwordStrength } from '@/utils/helpers'
import { th, ACCENT_SOFT } from '@/theme/theme'
import type { Screen } from '@/types'

type Props = {
  nav: (s: Screen) => void
  dark: boolean
  onSignup: (name: string, email: string, password: string) => Promise<void>
  error?: string | null
}

export function SignupScreen({ nav, dark, onSignup, error }: Props) {
  const t = th(dark)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [confirm, setConfirm] = useState('')
  const [show, setShow] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [busy, setBusy] = useState(false)
  const [localErr, setLocalErr] = useState<string | null>(null)
  const s = passwordStrength(pass)

  async function submit() {
    setLocalErr(null)
    if (!name.trim() || !email.trim() || !pass) return
    if (pass.length < 8) {
      setLocalErr('Password should be at least 8 characters')
      return
    }
    if (pass !== confirm) {
      setLocalErr('Passwords do not match')
      return
    }
    setBusy(true)
    try {
      await onSignup(name.trim(), email.trim(), pass)
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
        Create your account
      </h1>
      <p style={{ fontSize: 14, color: t.textSub, textAlign: 'center', margin: '0 0 28px' }}>
        Start tracking your job search today.
      </p>
      <div className="auth-form-fields" style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
        <TextInput label="Full Name" placeholder="Haad Rahman" value={name} onChange={setName} dark={dark} required />
        <TextInput label="Email" type="email" placeholder="you@example.com" value={email} onChange={setEmail} dark={dark} required />
        <div>
          <TextInput
            label="Password"
            type={show ? 'text' : 'password'}
            placeholder="Create a strong password"
            value={pass}
            onChange={setPass}
            dark={dark}
            required
            hint="Password should be at least 8 characters"
            suffix={
              <button
                onClick={() => setShow((v) => !v)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: t.textMuted, display: 'flex' }}
              >
                {show ? <IconEyeOff /> : <IconEye />}
              </button>
            }
          />
          {s && (
            <div style={{ marginTop: 7 }}>
              <div style={{ height: 3, borderRadius: 99, backgroundColor: t.border, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: s.w, backgroundColor: s.color, borderRadius: 99, transition: 'all 0.3s' }} />
              </div>
              <p style={{ fontSize: 11, color: s.color, margin: '3px 0 0', fontWeight: 600 }}>{s.label}</p>
            </div>
          )}
        </div>
        <TextInput label="Confirm Password" type="password" placeholder="Repeat your password" value={confirm} onChange={setConfirm} dark={dark} required />
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 9, cursor: 'pointer' }}>
          <div
            onClick={() => setAgreed((v) => !v)}
            style={{
              width: 18,
              height: 18,
              borderRadius: 4,
              border: `2px solid ${agreed ? ACCENT_SOFT : t.textMuted}`,
              backgroundColor: agreed ? ACCENT_SOFT : t.input,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: 1,
              cursor: 'pointer',
              boxSizing: 'border-box',
            }}
          >
            {agreed && <span style={{ color: '#fff' }}><IconCheck /></span>}
          </div>
          <span style={{ fontSize: 12.5, color: t.textSub, lineHeight: 1.5 }}>
            I agree to the <span style={{ color: ACCENT_SOFT }}>Terms of Service</span> and{' '}
            <span style={{ color: ACCENT_SOFT }}>Privacy Policy</span>
          </span>
        </label>
        {(localErr || error) && (
          <p className="auth-error" style={{ margin: 0, fontSize: 13, color: '#dc2626', textAlign: 'center' }}>
            {localErr || error}
          </p>
        )}
        <PrimaryBtn full disabled={!agreed || busy} onClick={submit}>
          {busy ? 'Creating…' : 'Sign Up'}
        </PrimaryBtn>
        <Divider text="or" dark={dark} />
        <GoogleBtn dark={dark} />
        <p style={{ textAlign: 'center', fontSize: 13, color: t.textSub, margin: 0 }}>
          Already have an account?{' '}
          <button
            onClick={() => nav('login')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: ACCENT_SOFT, fontWeight: 600, fontSize: 13 }}
          >
            Log in
          </button>
        </p>
      </div>
    </AuthCard>
  )
}
