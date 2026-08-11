type Props = {
  size?: number
}

export function LogoMark({ size = 26 }: Props) {
  return (
    <img
      src="/logo.png"
      alt="HZ Company"
      width={size}
      height={size}
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.22,
        objectFit: 'cover',
        flexShrink: 0,
        display: 'block',
      }}
    />
  )
}
