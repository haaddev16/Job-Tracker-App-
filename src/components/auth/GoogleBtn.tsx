import { IconGoogle } from '@/icons'
import { th } from '@/theme/theme'

type Props = { dark: boolean; onClick?: () => void }

export function GoogleBtn({ dark, onClick }: Props) {
  const t = th(dark)
  return (
    <button
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = t.surfaceHov
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent'
      }}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 9,
        padding: '9px 16px',
        minHeight: 44,
        borderRadius: 8,
        border: `1.5px solid ${t.border}`,
        backgroundColor: 'transparent',
        color: t.text,
        fontSize: 13.5,
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'background-color 0.15s',
      }}
    >
      <IconGoogle /> Continue with Google
    </button>
  )
}
