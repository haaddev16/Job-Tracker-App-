import { IconAlert, IconCheck, IconX } from '@/icons'
import type { ToastItem } from '@/types'

type Props = {
  items: ToastItem[]
  dismiss: (id: string) => void
}

export function Toasts({ items, dismiss }: Props) {
  return (
    <div
      className="toast-stack"
      style={{
        position: 'fixed',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        pointerEvents: 'none',
      }}
    >
      {items.map((t) => {
        const err = t.type === 'error'
        return (
          <div
            key={t.id}
            className={`toast-item ${t.leaving ? 'toast-leave' : 'toast-enter'}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: err ? '#fff1f2' : '#f0fdf4',
              border: `1px solid ${err ? '#fca5a5' : '#86efac'}`,
              borderRadius: 10,
              padding: '10px 14px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
              fontSize: 13,
              fontWeight: 500,
              color: err ? '#dc2626' : '#16a34a',
              pointerEvents: 'all',
              boxSizing: 'border-box',
            }}
          >
            <span style={{ flexShrink: 0 }}>{err ? <IconAlert /> : <IconCheck />}</span>
            <span style={{ flex: 1, minWidth: 0, wordBreak: 'break-word' }}>{t.message}</span>
            <button
              className="touch-target"
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                color: 'currentColor',
                opacity: 0.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 44,
                flexShrink: 0,
                margin: '-8px -8px -8px 0',
              }}
            >
              <IconX />
            </button>
          </div>
        )
      })}
    </div>
  )
}
