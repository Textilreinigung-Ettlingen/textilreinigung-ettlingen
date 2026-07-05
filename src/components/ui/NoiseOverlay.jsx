export default function NoiseOverlay({ opacity = 0.035 }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full mix-blend-overlay"
      style={{ opacity }}
      aria-hidden="true"
    >
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  )
}
