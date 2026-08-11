import { useState } from 'react'
import { th } from '@/theme/theme'

type Props = {
  children: React.ReactNode
  onClick?: () => void
  dark: boolean
}

export function GhostBtn({ children, onClick, dark }: Props) {
  const t = th(dark)
  const [hov, setHov] = useState(false)
  return (
    <button
      className="btn-ghost"
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: '10px 18px',
        borderRadius: 8,
        border: `1.5px solid ${t.border}`,
        backgroundColor: hov ? t.surfaceHov : 'transparent',
        color: t.textSub,
        fontSize: 13.5,
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.15s ease, transform 0.15s ease',
      }}
    >
      {children}
    </button>
  )
}
