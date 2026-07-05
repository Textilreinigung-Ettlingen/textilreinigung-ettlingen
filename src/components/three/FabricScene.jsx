import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import FabricPlane from './FabricPlane'

export default function FabricScene() {
  const pointerRef = useRef({ x: 0, y: 0 })
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(!prefersReduced)
  }, [])

  function handlePointerMove(e) {
    const { innerWidth, innerHeight } = window
    pointerRef.current = {
      x: (e.clientX / innerWidth) * 2 - 1,
      y: (e.clientY / innerHeight) * 2 - 1,
    }
  }

  if (!enabled) {
    return (
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,#3C3F46_0%,#15161A_70%)]"
        aria-hidden="true"
      />
    )
  }

  return (
    <div className="absolute inset-0" onPointerMove={handlePointerMove} aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 5.2], fov: 38 }}
      >
        <FabricPlane pointerRef={pointerRef} />
      </Canvas>
    </div>
  )
}
