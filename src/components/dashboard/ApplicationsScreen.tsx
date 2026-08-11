import { useEffect, useMemo, useState } from 'react'
import { AppForm } from '@/components/board/AppForm'
import { CompanyBadge } from '@/components/ui/CompanyBadge'
import { ModalShell } from '@/components/ui/ModalShell'
import { COL, COLUMNS } from '@/constants/columns'
import { daysAgo } from '@/utils/helpers'
import { th } from '@/theme/theme'
import type { Application, Status } from '@/types'

type Props = {
  apps: Application[]
  dark: boolean
  onSave: (data: Omit<Application, 'id'> & { id?: string }) => Promise<void>
  onDelete: (id: string) => Promise<void>
  addToast: (msg: string, type?: 'success' | 'error' | 'info') => void
  initialEdit?: Application | null
  onClearInitialEdit?: () => void
}

export function ApplicationsScreen({
  apps,
  dark,
  onSave,
  onDelete,
  addToast,
  initialEdit,
  onClearInitialEdit,
}: Props) {
  const t = th(dark)
  const [filter, setFilter] = useState<Status | 'all'>('all')
  const [editTarget, setEditTarget] = useState<Application | null>(null)

  useEffect(() => {
    if (initialEdit) setEditTarget(initialEdit)
  }, [initialEdit])

  const filtered = useMemo(() => {
    const list = filter === 'all' ? apps : apps.filter((a) => a.status === filter)
    return [...list].sort((a, b) => b.appliedDate.localeCompare(a.appliedDate))
  }, [apps, filter])

  async function handleSave(data: Omit<Application, 'id'> & { id?: string }) {
    try {
      await onSave(data)
      addToast('Application saved ✓', 'success')
      setEditTarget(null)
      onClearInitialEdit?.()
    } catch (e) {
      addToast(e instanceof Error ? e.message : 'Save failed', 'error')
    }
  }

  async function handleDelete(id: string) {
    try {
      await onDelete(id)
      addToast('Application deleted', 'info')
      setEditTarget(null)
      onClearInitialEdit?.()
    } catch (e) {
      addToast(e instanceof Error ? e.message : 'Delete failed', 'error')
    }
  }

  return (
    <div className="page-pad">
      <div style={{ marginBottom: '1.25rem' }}>
        <h1
          style={{
            margin: '0 0 6px',
            fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
            fontWeight: 800,
            color: t.text,
            letterSpacing: '-0.35px',
          }}
        >
          All Applications
        </h1>
        <p style={{ margin: 0, fontSize: 13.5, color: t.textSub }}>
          {filtered.length} application{filtered.length === 1 ? '' : 's'}
          {filter !== 'all' ? ` in ${COLUMNS.find((c) => c.id === filter)?.label}` : ''}
        </p>
      </div>

      <div className="apps-filter-row">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className="apps-filter-chip"
          style={{
            backgroundColor: filter === 'all' ? (dark ? 'rgba(99,102,241,0.2)' : 'rgba(79,70,229,0.12)') : t.surface,
            color: filter === 'all' ? '#6366f1' : t.textSub,
            border: `1px solid ${filter === 'all' ? '#6366f1' : t.border}`,
          }}
        >
          All
        </button>
        {COLUMNS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setFilter(c.id)}
            className="apps-filter-chip"
            style={{
              backgroundColor: filter === c.id ? COL[c.id].badge : t.surface,
              color: filter === c.id ? COL[c.id].badgeText : t.textSub,
              border: `1px solid ${filter === c.id ? COL[c.id].dot + '55' : t.border}`,
            }}
          >
            <span style={{ color: COL[c.id].dot, fontSize: 8 }}>●</span> {c.label}
          </button>
        ))}
      </div>

      <div
        className="apps-table-wrap"
        style={{
          backgroundColor: t.surface,
          border: `1px solid ${t.border}`,
          borderRadius: 14,
          boxShadow: dark ? '0 1px 4px rgba(0,0,0,0.25)' : '0 1px 3px rgba(0,0,0,0.05)',
        }}
      >
        {filtered.length === 0 ? (
          <p style={{ margin: 0, padding: '32px 18px', textAlign: 'center', color: t.textMuted, fontSize: 13.5 }}>
            No applications found.
          </p>
        ) : (
          <>
            <table className="apps-table">
              <thead>
                <tr style={{ borderBottom: `1px solid ${t.borderLight}` }}>
                  {['Company', 'Role', 'Status', 'Applied', 'Notes'].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: 'left',
                        padding: '12px 14px',
                        fontSize: 11.5,
                        fontWeight: 700,
                        color: t.textMuted,
                        textTransform: 'uppercase',
                        letterSpacing: '0.03em',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => {
                  const cs = COL[a.status]
                  const label = COLUMNS.find((c) => c.id === a.status)?.label ?? a.status
                  return (
                    <tr
                      key={a.id}
                      onClick={() => setEditTarget(a)}
                      style={{ borderBottom: `1px solid ${t.borderLight}`, cursor: 'pointer' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = t.surfaceHov
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }}
                    >
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <CompanyBadge company={a.company} color={a.color} />
                          <span style={{ fontSize: 13.5, fontWeight: 700, color: t.text }}>{a.company}</span>
                        </div>
                      </td>
                      <td style={{ padding: '12px 14px', fontSize: 13, color: t.textSub }}>{a.role}</td>
                      <td style={{ padding: '12px 14px' }}>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: 99,
                            backgroundColor: cs.badge,
                            color: cs.badgeText,
                          }}
                        >
                          {label}
                        </span>
                      </td>
                      <td style={{ padding: '12px 14px', fontSize: 12.5, color: t.textMuted, whiteSpace: 'nowrap' }}>
                        {daysAgo(a.appliedDate)}
                      </td>
                      <td
                        style={{
                          padding: '12px 14px',
                          fontSize: 12.5,
                          color: t.textMuted,
                          maxWidth: 220,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {a.notes || '—'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            <div className="apps-card-list">
              {filtered.map((a) => {
                const cs = COL[a.status]
                const label = COLUMNS.find((c) => c.id === a.status)?.label ?? a.status
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setEditTarget(a)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 12,
                      padding: '14px 16px',
                      background: 'none',
                      border: 'none',
                      borderBottom: `1px solid ${t.borderLight}`,
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <CompanyBadge company={a.company} color={a.color} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'flex-start' }}>
                        <p style={{ margin: 0, fontSize: 13.5, fontWeight: 700, color: t.text }}>{a.company}</p>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: 99,
                            backgroundColor: cs.badge,
                            color: cs.badgeText,
                            flexShrink: 0,
                          }}
                        >
                          {label}
                        </span>
                      </div>
                      <p style={{ margin: '3px 0 0', fontSize: 12.5, color: t.textSub }}>{a.role}</p>
                      <p style={{ margin: '6px 0 0', fontSize: 11.5, color: t.textMuted }}>{daysAgo(a.appliedDate)}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </>
        )}
      </div>

      {editTarget && (
        <ModalShell
          dark={dark}
          onClose={() => {
            setEditTarget(null)
            onClearInitialEdit?.()
          }}
        >
          <AppForm
            initial={editTarget}
            onSave={handleSave}
            onDelete={handleDelete}
            onClose={() => {
              setEditTarget(null)
              onClearInitialEdit?.()
            }}
            dark={dark}
          />
        </ModalShell>
      )}
    </div>
  )
}
