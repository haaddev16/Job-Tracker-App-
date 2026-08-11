import { CompanyBadge } from '@/components/ui/CompanyBadge'
import { COL, COLUMNS } from '@/constants/columns'
import { IconBriefcase, IconPercent } from '@/icons'
import { daysAgo, greetingForHour } from '@/utils/helpers'
import { th, ACCENT } from '@/theme/theme'
import type { Application, Screen, Status, User } from '@/types'

type Props = {
  user: User
  apps: Application[]
  dark: boolean
  nav: (s: Screen) => void
  onOpenApp?: (a: Application) => void
}

export function DashboardScreen({ user, apps, dark, nav, onOpenApp }: Props) {
  const t = th(dark)
  const first = user.name.split(' ')[0] || user.name
  const greeting = greetingForHour()

  const counts = COLUMNS.reduce(
    (acc, c) => {
      acc[c.id] = apps.filter((a) => a.status === c.id).length
      return acc
    },
    {} as Record<Status, number>,
  )

  const total = apps.length
  const interviews = counts.interview
  const responseRate = total === 0 ? 0 : Math.round((interviews / total) * 100)

  const recent = [...apps]
    .sort((a, b) => b.appliedDate.localeCompare(a.appliedDate) || b.id.localeCompare(a.id))
    .slice(0, 5)

  const stats: { key: Status | 'total'; label: string; value: number; color: string; bg: string }[] = [
    {
      key: 'total',
      label: 'Total Applied',
      value: total,
      color: ACCENT,
      bg: dark ? 'rgba(99,102,241,0.15)' : 'rgba(79,70,229,0.1)',
    },
    {
      key: 'interview',
      label: 'Interviews',
      value: counts.interview,
      color: COL.interview.dot,
      bg: dark ? 'rgba(245,158,11,0.15)' : '#fef3c7',
    },
    {
      key: 'offer',
      label: 'Offers',
      value: counts.offer,
      color: COL.offer.dot,
      bg: dark ? 'rgba(16,185,129,0.15)' : '#d1fae5',
    },
    {
      key: 'rejected',
      label: 'Rejected',
      value: counts.rejected,
      color: COL.rejected.dot,
      bg: dark ? 'rgba(239,68,68,0.15)' : '#fee2e2',
    },
  ]

  return (
    <div className="page-pad">
      <div style={{ marginBottom: '1.5rem' }}>
        <h1
          style={{
            margin: '0 0 6px',
            fontSize: 'clamp(1.35rem, 3vw, 1.65rem)',
            fontWeight: 800,
            color: t.text,
            letterSpacing: '-0.4px',
          }}
        >
          {greeting}, {first}
        </h1>
        <p style={{ margin: 0, fontSize: 14, color: t.textSub }}>
          Here&apos;s an overview of your job search.
        </p>
      </div>

      <div className="dash-stat-grid">
        {stats.map((s) => (
          <div
            key={s.key}
            className="dash-stat-card"
            style={{
              backgroundColor: t.surface,
              border: `1px solid ${t.border}`,
              boxShadow: dark ? '0 1px 4px rgba(0,0,0,0.25)' : '0 1px 3px rgba(0,0,0,0.05)',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                backgroundColor: s.bg,
                color: s.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <IconBriefcase />
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: t.textMuted }}>{s.label}</p>
              <p style={{ margin: '4px 0 0', fontSize: 24, fontWeight: 800, color: t.text, letterSpacing: '-0.5px' }}>
                {s.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div
        className="dash-rate-card"
        style={{
          backgroundColor: t.surface,
          border: `1px solid ${t.border}`,
          boxShadow: dark ? '0 1px 4px rgba(0,0,0,0.25)' : '0 1px 3px rgba(0,0,0,0.05)',
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            backgroundColor: dark ? 'rgba(99,102,241,0.15)' : 'rgba(79,70,229,0.1)',
            color: ACCENT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <IconPercent />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: t.textMuted }}>Response rate</p>
          <p style={{ margin: '4px 0 0', fontSize: 22, fontWeight: 800, color: t.text }}>
            {responseRate}%
            <span style={{ fontSize: 13, fontWeight: 500, color: t.textSub, marginLeft: 8 }}>
              {interviews} interview{interviews === 1 ? '' : 's'} / {total} applied
            </span>
          </p>
          <div
            style={{
              marginTop: 10,
              height: 6,
              borderRadius: 99,
              backgroundColor: t.borderLight,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${Math.min(100, responseRate)}%`,
                height: '100%',
                borderRadius: 99,
                backgroundColor: ACCENT,
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundColor: t.surface,
          border: `1px solid ${t.border}`,
          borderRadius: 14,
          boxShadow: dark ? '0 1px 4px rgba(0,0,0,0.25)' : '0 1px 3px rgba(0,0,0,0.05)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            padding: '14px 18px',
            borderBottom: `1px solid ${t.borderLight}`,
          }}
        >
          <h2 style={{ margin: 0, fontSize: 14.5, fontWeight: 700, color: t.text }}>Recent Applications</h2>
          <button
            type="button"
            onClick={() => nav('applications')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: ACCENT,
              fontSize: 12.5,
              fontWeight: 600,
              minHeight: 44,
              padding: '0 4px',
            }}
          >
            View all
          </button>
        </div>

        {recent.length === 0 ? (
          <div style={{ padding: '28px 18px', textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: 13.5, color: t.textMuted }}>No applications yet.</p>
            <button
              type="button"
              onClick={() => nav('board')}
              style={{
                marginTop: 12,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: ACCENT,
                fontWeight: 600,
                fontSize: 13,
              }}
            >
              Go to Board
            </button>
          </div>
        ) : (
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {recent.map((a, i) => {
              const cs = COL[a.status]
              const label = COLUMNS.find((c) => c.id === a.status)?.label ?? a.status
              return (
                <li
                  key={a.id}
                  style={{
                    borderTop: i === 0 ? 'none' : `1px solid ${t.borderLight}`,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => (onOpenApp ? onOpenApp(a) : nav('applications'))}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '12px 18px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      minHeight: 56,
                    }}
                  >
                    <CompanyBadge company={a.company} color={a.color} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 13.5,
                          fontWeight: 700,
                          color: t.text,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {a.company}
                      </p>
                      <p
                        style={{
                          margin: '2px 0 0',
                          fontSize: 12,
                          color: t.textSub,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {a.role}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <span
                        style={{
                          display: 'inline-block',
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
                      <p style={{ margin: '5px 0 0', fontSize: 11, color: t.textMuted }}>{daysAgo(a.appliedDate)}</p>
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
