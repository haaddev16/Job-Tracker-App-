export function CompanyBadge({ company, color }: { company: string; color: string }) {
  return (
    <div
      style={{
        width: 30,
        height: 30,
        borderRadius: 8,
        backgroundColor: color + '1a',
        border: `1.5px solid ${color}30`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: 12, fontWeight: 800, color }}>{company[0].toUpperCase()}</span>
    </div>
  )
}
