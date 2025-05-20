import { useState, useRef } from 'react'
import { Vector3 } from 'three'
import { useFrame } from '@react-three/fiber'
import { SpotLight, useDepthBuffer } from '@react-three/drei'

import { useStore } from '@/stores'

import type { ThreeElements } from '@react-three/fiber'
import type { SpotLightProps } from '@react-three/drei'

type MovingSpotlightProps = Partial<SpotLightProps> & {
  applyDepthBuffer?: boolean
}

type MovingSpotlightsProps = ThreeElements['group'] & {
  spotlights: MovingSpotlightProps[]
}

const MovingSpotlight = ({
  applyDepthBuffer = false,
  ...props
}: MovingSpotlightProps) => {
  const [temp] = useState(() => new Vector3())

  // fix: property 'target' does not exist on type 'never'.ts(2339)
  const light = useRef<React.ElementRef<typeof SpotLight>>(null)

  const depthBuffer = useDepthBuffer({ frames: 1 })
  // const viewport = useThree((state) => state.viewport)

  useFrame((state) => {
    if (light.current) {
      light.current.target.position.lerp(
        temp.set(
          (state.pointer.x * state.viewport.width) / 2,
          (state.pointer.y * state.viewport.height) / 2,
          0
        ),
        0.1
      )

      light.current.target.updateMatrixWorld()
    }
  })

  return (
    <SpotLight
      ref={light}
      angle={0.35}
      penumbra={0.1}
      distance={10}
      intensity={0.1}
      attenuation={7}
      anglePower={2}
      opacity={0.06}
      depthBuffer={applyDepthBuffer ? depthBuffer : undefined}
      {...props}
    />
  )
}

const MovingSpotlights = ({ spotlights, ...props }: MovingSpotlightsProps) => {
  const { isLight } = useStore()

  if (!isLight) return null

  return (
    <group {...props}>
      {spotlights.map((spotlight, index) => (
        <MovingSpotlight key={index} {...spotlight} />
      ))}
    </group>
  )
}

export default MovingSpotlights
