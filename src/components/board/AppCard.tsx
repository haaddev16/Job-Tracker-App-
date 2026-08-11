import { CompanyBadge } from '@/components/ui/CompanyBadge'
import { COL } from '@/constants/columns'
import { daysAgo } from '@/utils/helpers'
import { th } from '@/theme/theme'
import type { Application } from '@/types'

type Props = {
  app: Application
  onEdit: (a: Application) => void
  onDragStart: (e: React.DragEvent, a: Application) => void
  isDragging: boolean
  isExiting?: boolean
  justSettled?: boolean
  dark: boolean
}

export function AppCard({
  app,
  onEdit,
  onDragStart,
  isDragging,
  isExiting,
  justSettled,
  dark,
}: Props) {
  const t = th(dark)
  const cs = COL[app.status]

  const classes = [
    'kanban-card',
    'card-enter',
    isDragging ? 'is-dragging' : '',
    isExiting ? 'is-exiting' : '',
    justSettled ? 'card-settle' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={classes}
      draggable={!isExiting}
      onDragStart={(e) => onDragStart(e, app)}
      onClick={() => {
        if (!isExiting) onEdit(app)
      }}
      style={{
        backgroundColor: t.surface,
        borderRadius: 10,
        padding: '13px 13px 11px',
        border: `1px solid ${t.border}`,
        borderLeft: `3px solid ${cs.dot}`,
        boxShadow: dark ? '0 1px 4px rgba(0,0,0,0.4)' : '0 1px 3px rgba(0,0,0,0.06)',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
        <CompanyBadge company={app.company} color={app.color} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontSize: 12.5,
              fontWeight: 700,
              color: t.text,
              margin: 0,
              lineHeight: 1.3,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {app.company}
          </p>
          <p
            style={{
              fontSize: 11.5,
              color: t.textSub,
              margin: '2px 0 0',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {app.role}
          </p>
        </div>
      </div>
      {app.notes && (
        <p
          style={{
            fontSize: 11.5,
            color: t.textMuted,
            margin: '9px 0 0',
            lineHeight: 1.55,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {app.notes}
        </p>
      )}
      <p style={{ fontSize: 10.5, color: t.textMuted, margin: '9px 0 0' }}>{daysAgo(app.appliedDate)}</p>
    </div>
  )
}
