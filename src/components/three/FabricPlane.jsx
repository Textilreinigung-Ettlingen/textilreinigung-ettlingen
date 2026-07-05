import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  varying float vElevation;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;

    float wave1 = sin(pos.x * 1.35 + uTime * 0.32) * 0.22;
    float wave2 = sin(pos.y * 2.0 - uTime * 0.22) * 0.14;
    float wave3 = sin((pos.x + pos.y) * 0.75 + uTime * 0.45) * 0.09;
    float mouseInfluence = exp(-distance(pos.xy, uMouse * 3.2) * 1.1) * 0.4;

    float elevation = wave1 + wave2 + wave3 + mouseInfluence;
    pos.z += elevation;
    vElevation = elevation;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uColorDeep;
  uniform vec3 uColorMid;
  uniform vec3 uColorGold;
  varying float vElevation;
  varying vec2 vUv;

  void main() {
    float t = smoothstep(-0.3, 0.45, vElevation);
    vec3 base = mix(uColorDeep, uColorMid, smoothstep(-0.3, 0.05, vElevation));
    vec3 color = mix(base, uColorGold, smoothstep(0.1, 0.5, vElevation) * 0.85);

    float vignette = smoothstep(0.98, 0.15, distance(vUv, vec2(0.5)));
    float alpha = vignette;

    gl_FragColor = vec4(color, alpha);
  }
`

export default function FabricPlane({ pointerRef }) {
  const materialRef = useRef(null)
  const groupRef = useRef(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorDeep: { value: new THREE.Color('#15161A') },
      uColorMid: { value: new THREE.Color('#3C3F46') },
      uColorGold: { value: new THREE.Color('#D6B975') },
    }),
    []
  )

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t
      const target = pointerRef?.current ?? { x: 0, y: 0 }
      materialRef.current.uniforms.uMouse.value.lerp(
        new THREE.Vector2(target.x, target.y),
        0.04
      )
    }
    if (groupRef.current) {
      const target = pointerRef?.current ?? { x: 0, y: 0 }
      groupRef.current.rotation.y += (target.x * 0.22 - groupRef.current.rotation.y) * 0.03
      groupRef.current.rotation.x += (-target.y * 0.12 - groupRef.current.rotation.x) * 0.03
      groupRef.current.rotation.z = Math.sin(t * 0.12) * 0.03
    }
  })

  return (
    <group ref={groupRef} rotation={[0.15, 0, 0]}>
      <mesh>
        <planeGeometry args={[7.5, 5, 140, 90]} />
        <shaderMaterial
          ref={materialRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}
