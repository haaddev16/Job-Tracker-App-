import { BoardEmpty } from '@/components/board/BoardEmpty'
import { KanbanColumn } from '@/components/board/KanbanColumn'
import { SkeletonCard } from '@/components/ui/SkeletonCard'
import { COLUMNS } from '@/constants/columns'
import { IconAlert } from '@/icons'
import { th } from '@/theme/theme'
import type { Application, BoardView, Status } from '@/types'

type Props = {
  apps: Application[]
  filtered: Application[]
  dark: boolean
  view: BoardView
  setView: (v: BoardView) => void
  draggingId: string | null
  exitingIds?: Set<string>
  settledId?: string | null
  onEdit: (a: Application) => void
  onDrop: (s: Status) => void
  onDragStart: (e: React.DragEvent, a: Application) => void
  onAdd: () => void
}

export function BoardMain({
  apps,
  filtered,
  dark,
  view,
  setView,
  draggingId,
  exitingIds,
  settledId,
  onEdit,
  onDrop,
  onDragStart,
  onAdd,
}: Props) {
  const t = th(dark)

  return (
    <>
      {view === 'error' && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 9,
            padding: '9px 18px',
            backgroundColor: '#fff1f2',
            borderBottom: '1px solid #fecaca',
            color: '#dc2626',
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          <IconAlert />
          <span>Failed to load applications —</span>
          <button
            onClick={() => setView('loaded')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#dc2626',
              fontWeight: 700,
              fontSize: 13,
              textDecoration: 'underline',
            }}
          >
            Retry
          </button>
        </div>
      )}
      <main className="board-main">
        {apps.length === 0 && view === 'loaded' ? (
          <BoardEmpty dark={dark} onAdd={onAdd} />
        ) : (
          <div className="kanban-board">
            {COLUMNS.map((c) =>
              view === 'loading' ? (
                <div key={c.id} className="kanban-column" style={{ gap: 7 }}>
                  <div
                    className={t.skelClass}
                    style={{ height: 40, borderRadius: '10px 10px 0 0', backgroundColor: t.skelBase }}
                  />
                  <div
                    className="kanban-column-body"
                    style={{
                      padding: 9,
                      backgroundColor: t.colBg,
                      borderRadius: '0 0 10px 10px',
                      border: `1px solid ${t.border}`,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 7,
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <SkeletonCard key={i} dark={dark} />
                    ))}
                  </div>
                </div>
              ) : (
                <KanbanColumn
                  key={c.id}
                  status={c.id}
                  apps={filtered.filter((a) => a.status === c.id)}
                  onEdit={onEdit}
                  onDrop={onDrop}
                  onDragStart={onDragStart}
                  draggingId={draggingId}
                  exitingIds={exitingIds}
                  settledId={settledId}
                  dark={dark}
                />
              ),
            )}
          </div>
        )}
      </main>
    </>
  )
}
