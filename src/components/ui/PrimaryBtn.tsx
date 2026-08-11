import { useState } from 'react'
import { ACCENT, ACCENT_HOV } from '@/theme/theme'

type Props = {
  children: React.ReactNode
  onClick?: () => void
  full?: boolean
  disabled?: boolean
}

export function PrimaryBtn({ children, onClick, full, disabled }: Props) {
  const [hov, setHov] = useState(false)
  return (
    <button
      className="btn-primary"
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: full ? '100%' : undefined,
        padding: '10px 18px',
        borderRadius: 8,
        border: 'none',
        backgroundColor: disabled ? '#a5b4fc' : hov ? ACCENT_HOV : ACCENT,
        color: '#fff',
        fontSize: 13.5,
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background-color 0.15s ease, transform 0.15s ease',
        letterSpacing: '-0.1px',
      }}
    >
      {children}
    </button>
  )
}
