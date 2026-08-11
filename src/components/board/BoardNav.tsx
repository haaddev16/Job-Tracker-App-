import { useEffect, useRef, useState } from 'react'
import { IconCalendar, IconChevron, IconSearch } from '@/icons'
import { th, ACCENT } from '@/theme/theme'

export type DateRangeKey = 'all' | 'today' | '7d' | '30d' | 'month' | '90d'

export const DATE_RANGE_OPTIONS: { id: DateRangeKey; label: string }[] = [
  { id: 'all', label: 'All time' },
  { id: 'today', label: 'Today' },
  { id: '7d', label: 'Last 7 days' },
  { id: '30d', label: 'Last 30 days' },
  { id: 'month', label: 'This month' },
  { id: '90d', label: 'Last 3 months' },
]

type Props = {
  search: string
  setSearch: (v: string) => void
  dark: boolean
  onAdd: () => void
  dateRange: DateRangeKey
  setDateRange: (v: DateRangeKey) => void
}

export function BoardNav({ search, setSearch, dark, onAdd, dateRange, setDateRange }: Props) {
  const t = th(dark)
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const current = DATE_RANGE_OPTIONS.find((o) => o.id === dateRange) ?? DATE_RANGE_OPTIONS[0]

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <nav
      className="board-nav"
      style={{
        borderBottom: `1px solid ${t.border}`,
        backgroundColor: t.nav,
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 20,
        flexShrink: 0,
      }}
    >
      <div className="board-nav-search" style={{ maxWidth: 'none', flex: '1 1 auto' }}>
        <span style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', color: t.textMuted }}>
          <IconSearch />
        </span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by company…"
          style={{
            width: '100%',
            padding: '7px 11px 7px 28px',
            borderRadius: 8,
            border: `1.5px solid ${t.inputBorder}`,
            backgroundColor: t.input,
            color: t.text,
            fontSize: 13,
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div className="board-nav-filter" ref={wrapRef} style={{ position: 'relative', flexShrink: 0 }}>
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            padding: '7px 11px',
            minHeight: 44,
            borderRadius: 8,
            border: `1.5px solid ${open ? ACCENT : t.border}`,
            backgroundColor: open ? (dark ? 'rgba(99,102,241,0.12)' : 'rgba(79,70,229,0.06)') : 'transparent',
            color: t.textSub,
            fontSize: 12,
            fontWeight: 500,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'border-color 0.15s ease, background-color 0.15s ease',
          }}
        >
          <IconCalendar />
          {current.label}
          <span
            style={{
              display: 'inline-flex',
              transition: 'transform 0.15s ease',
              transform: open ? 'rotate(180deg)' : 'none',
            }}
          >
            <IconChevron />
          </span>
        </button>

        {open && (
          <div
            role="listbox"
            className="anim-fade-up"
            style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              right: 0,
              minWidth: 180,
              backgroundColor: t.surface,
              border: `1px solid ${t.border}`,
              borderRadius: 10,
              boxShadow: dark ? '0 10px 32px rgba(0,0,0,0.4)' : '0 10px 28px rgba(0,0,0,0.12)',
              overflow: 'hidden',
              zIndex: 40,
            }}
          >
            {DATE_RANGE_OPTIONS.map((opt) => {
              const active = opt.id === dateRange
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    setDateRange(opt.id)
                    setOpen(false)
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 10,
                    padding: '10px 14px',
                    minHeight: 44,
                    border: 'none',
                    backgroundColor: active ? (dark ? 'rgba(99,102,241,0.15)' : 'rgba(79,70,229,0.08)') : 'transparent',
                    color: active ? ACCENT : t.text,
                    fontSize: 13,
                    fontWeight: active ? 650 : 500,
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.backgroundColor = t.surfaceHov
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = active
                      ? dark
                        ? 'rgba(99,102,241,0.15)'
                        : 'rgba(79,70,229,0.08)'
                      : 'transparent'
                  }}
                >
                  {opt.label}
                  {active && <span style={{ fontSize: 12 }}>✓</span>}
                </button>
              )
            })}
          </div>
        )}
      </div>

      <div className="board-nav-actions">
        <button
          className="nav-add-btn"
          type="button"
          onClick={onAdd}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            padding: '7px 13px',
            minHeight: 44,
            borderRadius: 8,
            border: 'none',
            backgroundColor: ACCENT,
            color: '#fff',
            fontSize: 12.5,
            fontWeight: 600,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ fontSize: 15, lineHeight: 1 }}>+</span> Add Application
        </button>
      </div>
    </nav>
  )
}

/** Returns true if appliedDate (YYYY-MM-DD) is within the selected range. */
export function matchesDateRange(appliedDate: string, range: DateRangeKey): boolean {
  if (range === 'all') return true
  const d = new Date(appliedDate + 'T00:00:00')
  if (Number.isNaN(d.getTime())) return true

  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  if (range === 'today') {
    return d >= startOfToday
  }
  if (range === '7d') {
    const from = new Date(startOfToday)
    from.setDate(from.getDate() - 6)
    return d >= from
  }
  if (range === '30d') {
    const from = new Date(startOfToday)
    from.setDate(from.getDate() - 29)
    return d >= from
  }
  if (range === 'month') {
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
  }
  if (range === '90d') {
    const from = new Date(startOfToday)
    from.setDate(from.getDate() - 89)
    return d >= from
  }
  return true
}
