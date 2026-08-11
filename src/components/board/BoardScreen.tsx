import { useCallback, useRef, useState } from 'react'
import { AppForm } from '@/components/board/AppForm'
import { BoardMain } from '@/components/board/BoardMain'
import { BoardNav, matchesDateRange, type DateRangeKey } from '@/components/board/BoardNav'
import { BoardStats } from '@/components/board/BoardStats'
import { ModalShell } from '@/components/ui/ModalShell'
import { COLUMNS } from '@/constants/columns'
import { ACCENT } from '@/theme/theme'
import type { Application, BoardView, Status } from '@/types'

type Props = {
  apps: Application[]
  dark: boolean
  addToast: (msg: string, type?: 'success' | 'error' | 'info') => void
  view: BoardView
  setView: (v: BoardView) => void
  onSave: (data: Omit<Application, 'id'> & { id?: string }) => Promise<void>
  onDelete: (id: string) => Promise<void>
  onMove: (id: string, status: Status, prev: Status) => Promise<void>
  onRetry: () => void
}

export function BoardScreen({
  apps,
  dark,
  addToast,
  view,
  setView,
  onSave,
  onDelete,
  onMove,
  onRetry,
}: Props) {
  const [search, setSearch] = useState('')
  const [dateRange, setDateRange] = useState<DateRangeKey>('all')
  const [modal, setModal] = useState(false)
  const [editTarget, setEditTarget] = useState<Application | null>(null)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [exitingIds, setExitingIds] = useState<Set<string>>(() => new Set())
  const [settledId, setSettledId] = useState<string | null>(null)
  const dragRef = useRef<Application | null>(null)

  const openAdd = () => {
    setEditTarget(null)
    setModal(true)
  }
  const openEdit = (a: Application) => {
    setEditTarget(a)
    setModal(true)
  }
  const closeModal = () => {
    setModal(false)
    setEditTarget(null)
  }

  const handleSave = useCallback(
    async (data: Omit<Application, 'id'> & { id?: string }) => {
      try {
        await onSave(data)
        addToast('Application saved ✓', 'success')
        closeModal()
      } catch (e) {
        addToast(e instanceof Error ? e.message : 'Save failed', 'error')
      }
    },
    [onSave, addToast],
  )

  const handleDelete = useCallback(
    async (id: string) => {
      closeModal()
      setExitingIds((prev) => new Set(prev).add(id))
      await new Promise((r) => setTimeout(r, 220))
      try {
        await onDelete(id)
        addToast('Application deleted', 'info')
      } catch (e) {
        setExitingIds((prev) => {
          const next = new Set(prev)
          next.delete(id)
          return next
        })
        addToast(e instanceof Error ? e.message : 'Delete failed', 'error')
      }
    },
    [onDelete, addToast],
  )

  const handleDragStart = useCallback((e: React.DragEvent, a: Application) => {
    dragRef.current = a
    setDraggingId(a.id)
    e.dataTransfer.effectAllowed = 'move'
  }, [])

  const handleDrop = useCallback(
    async (targetStatus: Status) => {
      const current = dragRef.current
      setDraggingId(null)
      dragRef.current = null
      if (!current || current.status === targetStatus) return
      try {
        await onMove(current.id, targetStatus, current.status)
        setSettledId(current.id)
        window.setTimeout(() => setSettledId(null), 300)
        addToast(`Moved to ${COLUMNS.find((c) => c.id === targetStatus)!.label}`, 'success')
      } catch (e) {
        addToast(e instanceof Error ? e.message : 'Move failed', 'error')
      }
    },
    [onMove, addToast],
  )

  const filtered = apps.filter((a) => {
    const q = search.trim().toLowerCase()
    const matchesSearch =
      !q || a.company.toLowerCase().includes(q) || a.role.toLowerCase().includes(q)
    return matchesSearch && matchesDateRange(a.appliedDate, dateRange)
  })

  return (
    <div
      className="board-shell board-shell-embedded"
      style={{ backgroundColor: 'transparent' }}
      onDragEnd={() => setDraggingId(null)}
    >
      <BoardNav
        search={search}
        setSearch={setSearch}
        dark={dark}
        onAdd={openAdd}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      <BoardStats apps={apps} dark={dark} />
      <BoardMain
        apps={apps}
        filtered={filtered}
        dark={dark}
        view={view}
        setView={(v) => {
          if (v === 'loaded') onRetry()
          setView(v)
        }}
        draggingId={draggingId}
        exitingIds={exitingIds}
        settledId={settledId}
        onEdit={openEdit}
        onDrop={handleDrop}
        onDragStart={handleDragStart}
        onAdd={openAdd}
      />
      {modal && (
        <ModalShell dark={dark} onClose={closeModal}>
          <AppForm
            initial={editTarget}
            onSave={handleSave}
            onDelete={handleDelete}
            onClose={closeModal}
            dark={dark}
          />
        </ModalShell>
      )}
      <button
        className="fab fab-pulse"
        onClick={openAdd}
        aria-label="Add application"
        style={{
          display: 'none',
          position: 'fixed',
          borderRadius: '50%',
          backgroundColor: ACCENT,
          color: '#fff',
          fontSize: 26,
          border: 'none',
          cursor: 'pointer',
          zIndex: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        +
      </button>
    </div>
  )
}
