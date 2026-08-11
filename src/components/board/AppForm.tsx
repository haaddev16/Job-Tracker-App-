import { useState } from 'react'
import { GhostBtn } from '@/components/ui/GhostBtn'
import { PrimaryBtn } from '@/components/ui/PrimaryBtn'
import { COLUMNS } from '@/constants/columns'
import { IconLink, IconTrash, IconX } from '@/icons'
import { companyColor, toDay } from '@/utils/helpers'
import { th, ACCENT_SOFT } from '@/theme/theme'
import type { Application, Status } from '@/types'

type Props = {
  initial?: Application | null
  onSave: (a: Omit<Application, 'id'> & { id?: string }) => void | Promise<void>
  onDelete?: (id: string) => void | Promise<void>
  onClose: () => void
  dark: boolean
}

export function AppForm({ initial, onSave, onDelete, onClose, dark }: Props) {
  const t = th(dark)
  const [company, setCompany] = useState(initial?.company ?? '')
  const [role, setRole] = useState(initial?.role ?? '')
  const [date, setDate] = useState(initial?.appliedDate ?? toDay())
  const [link, setLink] = useState(initial?.jobLink ?? '')
  const [notes, setNotes] = useState(initial?.notes ?? '')
  const [status, setStatus] = useState<Status>(initial?.status ?? 'applied')
  const [delConfirm, setDelConfirm] = useState(false)
  const isEdit = !!initial

  const iStyle = {
    width: '100%',
    minHeight: 44,
    padding: '9px 12px',
    borderRadius: 8,
    border: `1.5px solid ${t.inputBorder}`,
    backgroundColor: t.input,
    color: t.text,
    fontSize: 16,
    outline: 'none',
    boxSizing: 'border-box' as const,
  }

  if (delConfirm && initial) {
    return (
      <div style={{ padding: 'clamp(1.25rem, 5vw, 1.75rem) clamp(0.875rem, 4vw, 1.5rem)' }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: t.text, margin: '0 0 8px' }}>
          Delete this application?
        </h2>
        <p style={{ fontSize: 13.5, color: t.textSub, margin: '0 0 24px', lineHeight: 1.55 }}>
          <strong style={{ color: t.text }}>{initial.company}</strong> will be permanently removed.
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap', gap: 8 }}>
          <GhostBtn onClick={() => setDelConfirm(false)} dark={dark}>
            Cancel
          </GhostBtn>
          <button
            onClick={() => onDelete!(initial.id)}
            style={{
              padding: '10px 20px',
              minHeight: 44,
              borderRadius: 8,
              border: 'none',
              backgroundColor: '#ef4444',
              color: '#fff',
              fontSize: 13.5,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Delete
          </button>
        </div>
      </div>
    )
  }

  function handleSave() {
    if (!company.trim() || !role.trim()) return
    void onSave({
      id: initial?.id,
      company: company.trim(),
      role: role.trim(),
      appliedDate: date,
      jobLink: link.trim(),
      notes: notes.trim(),
      status,
      color: companyColor(company.trim()),
    })
  }

  return (
    <>
      <div
        className="app-form-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 16,
          paddingBottom: 16,
          borderBottom: `1px solid ${t.borderLight}`,
        }}
      >
        <h2 style={{ fontSize: 14.5, fontWeight: 700, color: t.text, margin: 0 }}>
          {isEdit ? 'Edit Application' : 'Add Application'}
        </h2>
        <button
          className="touch-target"
          onClick={onClose}
          aria-label="Close"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: t.textMuted,
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 44,
            height: 44,
            marginRight: -8,
          }}
        >
          <IconX />
        </button>
      </div>
      <div
        className="app-form-body"
        style={{ paddingTop: 18, paddingBottom: 18, display: 'flex', flexDirection: 'column', gap: 14 }}
      >
        {(
          [
            { label: 'Company', val: company, set: setCompany, ph: 'e.g. Stripe', req: true },
            { label: 'Role / Title', val: role, set: setRole, ph: 'e.g. Product Engineer', req: true },
          ] as const
        ).map((f) => (
          <div key={f.label} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: t.textSub }}>
              {f.label}
              {f.req && <span style={{ color: ACCENT_SOFT }}>*</span>}
            </label>
            <input style={iStyle} value={f.val} onChange={(e) => f.set(e.target.value)} placeholder={f.ph} />
          </div>
        ))}
        <div className="app-form-grid-2">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: t.textSub }}>
              Applied Date<span style={{ color: ACCENT_SOFT }}>*</span>
            </label>
            <input type="date" style={iStyle} value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: t.textSub }}>Status</label>
            <select style={iStyle} value={status} onChange={(e) => setStatus(e.target.value as Status)}>
              {COLUMNS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: t.textSub }}>Job Link</label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: t.textMuted }}>
              <IconLink />
            </span>
            <input style={{ ...iStyle, paddingLeft: 28 }} value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://..." />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: t.textSub }}>Notes</label>
          <textarea
            style={{ ...iStyle, resize: 'vertical', lineHeight: 1.55, minHeight: 4.5 * 16 }}
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Interview notes, salary range, contacts…"
          />
        </div>
      </div>
      <div
        className="app-form-footer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 13,
          paddingBottom: 13,
          borderTop: `1px solid ${t.borderLight}`,
        }}
      >
        <div>
          {isEdit && (
            <button
              onClick={() => setDelConfirm(true)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#ef4444',
                fontSize: 12.5,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                minHeight: 44,
                padding: '0 4px',
              }}
            >
              <IconTrash /> Delete
            </button>
          )}
        </div>
        <div className="app-form-footer-actions">
          <GhostBtn onClick={onClose} dark={dark}>
            Cancel
          </GhostBtn>
          <PrimaryBtn onClick={handleSave} disabled={!company.trim() || !role.trim()}>
            Save Application
          </PrimaryBtn>
        </div>
      </div>
    </>
  )
}
