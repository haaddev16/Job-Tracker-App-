import { useState } from 'react'
import { forgotPassword } from '@/api/auth'
import { AuthCard } from '@/components/auth/AuthCard'
import { PrimaryBtn } from '@/components/ui/PrimaryBtn'
import { TextInput } from '@/components/ui/TextInput'
import { IconCheck } from '@/icons'
import { th, ACCENT_SOFT } from '@/theme/theme'
import type { Screen } from '@/types'

type Props = { nav: (s: Screen) => void; dark: boolean }

export function ForgotScreen({ nav, dark }: Props) {
  const t = th(dark)
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [hint, setHint] = useState<string | null>(null)

  async function submit() {
    if (!email.trim()) return
    setBusy(true)
    try {
      const res = await forgotPassword(email.trim())
      setHint(res.reset_token ? `Dev reset token: ${res.reset_token}` : null)
      setSent(true)
    } catch {
      setSent(true)
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthCard dark={dark}>
      {sent ? (
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              backgroundColor: '#d1fae5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              color: '#059669',
            }}
          >
            <IconCheck />
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: t.text, margin: '0 0 8px', letterSpacing: '-0.4px' }}>
            Check your inbox
          </h1>
          <p style={{ fontSize: 13.5, color: t.textSub, margin: '0 0 12px', lineHeight: 1.6 }}>
            We sent a reset link to <strong style={{ color: t.text }}>{email}</strong>. It expires in 15 minutes.
          </p>
          {hint && <p style={{ fontSize: 11, color: t.textMuted, margin: '0 0 16px', wordBreak: 'break-all' }}>{hint}</p>}
          <button
            onClick={() => nav('login')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: ACCENT_SOFT, fontWeight: 600, fontSize: 13.5 }}
          >
            ← Back to Log In
          </button>
        </div>
      ) : (
        <>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 5px', textAlign: 'center', letterSpacing: '-0.5px' }}>
            Reset your password
          </h1>
          <p style={{ fontSize: 13.5, color: t.textSub, textAlign: 'center', margin: '0 0 28px', lineHeight: 1.5 }}>
            {"Enter your email and we'll send you a reset link."}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            <TextInput label="Email" type="email" placeholder="you@example.com" value={email} onChange={setEmail} dark={dark} required />
            <PrimaryBtn full disabled={busy} onClick={submit}>
              {busy ? 'Sending…' : 'Send Reset Link'}
            </PrimaryBtn>
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => nav('login')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: ACCENT_SOFT, fontWeight: 500, fontSize: 13 }}
              >
                ← Back to Log In
              </button>
            </div>
          </div>
        </>
      )}
    </AuthCard>
  )
}
