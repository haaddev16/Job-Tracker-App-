import { useEffect, useRef, useState } from 'react'
import { AppCard } from '@/components/board/AppCard'
import { COL, COLUMNS } from '@/constants/columns'
import { th } from '@/theme/theme'
import type { Application, Status } from '@/types'

type Props = {
  status: Status
  apps: Application[]
  onEdit: (a: Application) => void
  onDrop: (s: Status) => void
  onDragStart: (e: React.DragEvent, a: Application) => void
  draggingId: string | null
  exitingIds?: Set<string>
  settledId?: string | null
  dark: boolean
}

export function KanbanColumn({
  status,
  apps,
  onEdit,
  onDrop,
  onDragStart,
  draggingId,
  exitingIds,
  settledId,
  dark,
}: Props) {
  const t = th(dark)
  const [over, setOver] = useState(false)
  const [pulse, setPulse] = useState(false)
  const prevCount = useRef(apps.length)
  const cs = COL[status]
  const col = COLUMNS.find((c) => c.id === status)!

  useEffect(() => {
    if (prevCount.current !== apps.length) {
      prevCount.current = apps.length
      setPulse(true)
      const id = window.setTimeout(() => setPulse(false), 300)
      return () => clearTimeout(id)
    }
  }, [apps.length])

  return (
    <div className="kanban-column">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          padding: '9px 13px',
          backgroundColor: cs.hdr(dark),
          borderRadius: '10px 10px 0 0',
          border: `1px solid ${t.border}`,
          borderBottom: 'none',
          borderTop: `2.5px solid ${cs.dot}`,
        }}
      >
        <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: cs.dot, flexShrink: 0 }} />
        <span style={{ fontSize: 12.5, fontWeight: 700, color: t.text }}>{col.label}</span>
        <span
          className={`col-badge${pulse ? ' badge-pulse' : ''}`}
          style={{
            marginLeft: 'auto',
            fontSize: 11,
            fontWeight: 700,
            padding: '1px 7px',
            borderRadius: 99,
            backgroundColor: cs.badge,
            color: cs.badgeText,
          }}
        >
          {apps.length}
        </span>
      </div>
      <div
        className="kanban-column-body"
        onDragOver={(e) => {
          e.preventDefault()
          setOver(true)
        }}
        onDragLeave={() => setOver(false)}
        onDrop={() => {
          setOver(false)
          onDrop(status)
        }}
        style={{
          flex: 1,
          padding: 9,
          borderRadius: '0 0 10px 10px',
          border: `1px solid ${over ? cs.dot : t.border}`,
          borderTop: 'none',
          backgroundColor: over ? (dark ? '#1a2030' : '#f0f3ff') : t.colBg,
          display: 'flex',
          flexDirection: 'column',
          gap: 7,
          transition: 'background-color 0.2s ease, border-color 0.2s ease',
        }}
      >
        {over && (
          <div
            style={{
              height: 68,
              border: `2px dashed ${cs.dot}`,
              borderRadius: 8,
              backgroundColor: cs.dot + '12',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: 12, color: cs.dot, fontWeight: 600 }}>Drop here</span>
          </div>
        )}
        {apps.length === 0 && !over && (
          <div
            style={{
              flex: 1,
              border: `1.5px dashed ${t.border}`,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
            }}
          >
            <p style={{ fontSize: 12, color: t.textMuted, textAlign: 'center', margin: 0 }}>No applications yet</p>
          </div>
        )}
        {apps.map((app) => (
          <AppCard
            key={app.id}
            app={app}
            onEdit={onEdit}
            onDragStart={onDragStart}
            isDragging={draggingId === app.id}
            isExiting={exitingIds?.has(app.id)}
            justSettled={settledId === app.id}
            dark={dark}
          />
        ))}
      </div>
    </div>
  )
}
