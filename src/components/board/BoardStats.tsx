import { COL, COLUMNS } from '@/constants/columns'
import { th } from '@/theme/theme'
import type { Application, Status } from '@/types'

type Props = {
  apps: Application[]
  dark: boolean
}

export function BoardStats({ apps, dark }: Props) {
  const t = th(dark)
  const counts = COLUMNS.reduce(
    (acc, c) => {
      acc[c.id] = apps.filter((a) => a.status === c.id).length
      return acc
    },
    {} as Record<Status, number>,
  )

  return (
    <div
      className="board-stats"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: `1px solid ${t.borderLight}`,
        backgroundColor: t.bg,
        flexWrap: 'wrap',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 11.5,
          color: t.textMuted,
          fontWeight: 500,
          flexWrap: 'wrap',
        }}
      >
        {COLUMNS.map((c, i) => (
          <span key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {i > 0 && <span style={{ opacity: 0.35, marginRight: 2 }}>·</span>}
            <span style={{ color: COL[c.id].dot, fontSize: 8 }}>●</span>
            <span>
              {counts[c.id]} {c.label}
              {counts[c.id] !== 1 && c.id === 'interview' ? 's' : ''}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
