import { useMemo } from "react"

export default function SmoothGradient({
  direction = "to top",
  startColor = "#000000",
  opacity = 1,
  style = {},
}) {
  const gradientStyle = useMemo(() => {
    const stops = [
      { stop: 0, alpha: 1 },
      { stop: 20, alpha: 0.7 },
      { stop: 40, alpha: 0.5 },
      { stop: 60, alpha: 0.3 },
      { stop: 80, alpha: 0.1 },
      { stop: 100, alpha: 0 },
    ]

    const hex = startColor.replace("#", "")
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)

    const gradientStops = stops
      .map(
        s => `rgba(${r}, ${g}, ${b}, ${s.alpha * opacity}) ${s.stop}%`
      )
      .join(", ")

    return {
      background: `linear-gradient(${direction}, ${gradientStops})`,
    }
  }, [direction, startColor, opacity])

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        ...gradientStyle,
        ...style,
      }}
    />
  )
}
