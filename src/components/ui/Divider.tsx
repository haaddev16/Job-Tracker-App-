import { th } from '@/theme/theme'

export function Divider({ text, dark }: { text: string; dark: boolean }) {
  const t = th(dark)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ flex: 1, height: 1, backgroundColor: t.border }} />
      <span style={{ fontSize: 12, color: t.textMuted, fontWeight: 500 }}>{text}</span>
      <div style={{ flex: 1, height: 1, backgroundColor: t.border }} />
    </div>
  )
}
