import { useState } from 'react'
import { th, ACCENT_SOFT } from '@/theme/theme'

type Props = {
  label?: string
  type?: string
  placeholder?: string
  value: string
  onChange: (v: string) => void
  dark: boolean
  suffix?: React.ReactNode
  required?: boolean
  hint?: string
}

export function TextInput({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  dark,
  suffix,
  required,
  hint,
}: Props) {
  const t = th(dark)
  const [foc, setFoc] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {label && (
        <label style={{ fontSize: 12.5, fontWeight: 600, color: t.textSub }}>
          {label}
          {required && <span style={{ color: ACCENT_SOFT, marginLeft: 1 }}>*</span>}
        </label>
      )}
      {hint && <p style={{ fontSize: 11.5, color: t.textMuted, margin: 0 }}>{hint}</p>}
      <div style={{ position: 'relative' }}>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFoc(true)}
          onBlur={() => setFoc(false)}
          style={{
            width: '100%',
            minHeight: 44,
            padding: suffix ? '10px 44px 10px 13px' : '10px 13px',
            borderRadius: 8,
            border: `1.5px solid ${foc ? ACCENT_SOFT : t.inputBorder}`,
            backgroundColor: t.input,
            color: t.text,
            fontSize: 16,
            outline: 'none',
            boxSizing: 'border-box',
            boxShadow: foc ? '0 0 0 3px rgba(99,102,241,0.1)' : 'none',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          }}
        />
        {suffix && (
          <div
            style={{
              position: 'absolute',
              right: 4,
              top: '50%',
              transform: 'translateY(-50%)',
              color: t.textMuted,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 44,
              minHeight: 44,
            }}
          >
            {suffix}
          </div>
        )}
      </div>
    </div>
  )
}
