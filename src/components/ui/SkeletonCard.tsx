import { th } from '@/theme/theme'

export function SkeletonCard({ dark }: { dark: boolean }) {
  const t = th(dark)
  return (
    <div
      style={{
        backgroundColor: t.surface,
        borderRadius: 10,
        padding: 14,
        border: `1px solid ${t.border}`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <div
          className={t.skelClass}
          style={{ width: 30, height: 30, borderRadius: 8, backgroundColor: t.skelBase }}
        />
        <div style={{ flex: 1 }}>
          <div
            className={t.skelClass}
            style={{
              height: 12,
              width: '55%',
              borderRadius: 4,
              backgroundColor: t.skelBase,
              marginBottom: 7,
            }}
          />
          <div
            className={t.skelClass}
            style={{ height: 10, width: '75%', borderRadius: 4, backgroundColor: t.skelBase }}
          />
        </div>
      </div>
      <div
        className={t.skelClass}
        style={{ height: 10, width: '38%', borderRadius: 4, backgroundColor: t.skelBase }}
      />
    </div>
  )
}
