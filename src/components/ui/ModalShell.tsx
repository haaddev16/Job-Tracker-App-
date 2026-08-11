import { Children, cloneElement, isValidElement, useEffect, useState } from 'react'
import { th } from '@/theme/theme'

type Props = {
  dark: boolean
  onClose: () => void
  children: React.ReactNode
}

export function ModalShell({ dark, onClose, children }: Props) {
  const t = th(dark)
  const [open, setOpen] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setOpen(true))
    return () => cancelAnimationFrame(id)
  }, [])

  function requestClose() {
    if (leaving) return
    setLeaving(true)
    setOpen(false)
    window.setTimeout(onClose, 200)
  }

  const content = Children.map(children, (child) => {
    if (!isValidElement<{ onClose?: () => void }>(child)) return child
    return cloneElement(child, { onClose: requestClose })
  })

  return (
    <div
      className={`modal-overlay${open && !leaving ? ' is-open' : ''}${leaving ? ' is-leaving' : ''}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'center',
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) requestClose()
      }}
    >
      <div
        className={`modal-panel${open && !leaving ? ' is-open' : ''}${leaving ? ' is-leaving' : ''}`}
        style={{
          backgroundColor: t.surface,
          borderRadius: 14,
          border: `1px solid ${t.border}`,
          boxShadow: '0 24px 80px rgba(0,0,0,0.24)',
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {content}
      </div>
    </div>
  )
}
