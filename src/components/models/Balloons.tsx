import { useState } from 'react'
import { Mesh, MeshPhysicalMaterial, MeshStandardMaterial } from 'three'
import {
  useGLTF,
  useTexture,
  Instances,
  Instance,
  Float,
  useCursor,
} from '@react-three/drei'

import { triggers } from '@/configs'
import { useStore } from '@/stores'
import { showToast, debugLog } from '@/utils'

import type { ThreeElements, ThreeEvent } from '@react-three/fiber'
import type { InstanceProps, FloatProps } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import type { Mode } from '@/stores/slices/mode'

type BalloonProps = Partial<InstanceProps> & {
  mode: Mode
}

type FloatingBalloonProps = BalloonProps & {
  floatConfig?: Partial<FloatProps>
}

type BalloonsProps = ThreeElements['group'] & {
  modelUrl: string
  matcapUrl: string
  balloons: BalloonProps[]
  floatConfig?: Partial<FloatProps>
  position: [number, number, number]
}

type GLTFResult = GLTF & {
  nodes: {
    Balloon: Mesh
    Rope: Mesh
  }
  materials: {
    Balloon: MeshPhysicalMaterial
    Rope: MeshStandardMaterial
  }
}

const Balloon = ({ mode, ...props }: BalloonProps) => {
  const { setMode, setTriggerStatus } = useStore()

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    debugLog('mode', mode)

    // avoid events being handled incorrectly by later objects
    e.stopPropagation()
    setMode(mode)

    const text =
      mode === 'system'
        ? 'Mirror, mirror on the wall… matching your system after all! 🌗'
        : mode === 'light'
          ? 'Bright and shiny — welcome to light mode! 🌕'
          : 'Things just got a little moodier – hello, dark mode! 🌑'
    showToast(text, 3000)

    if (!triggers.filter((t) => t.name === 'mode')[0].triggered)
      setTriggerStatus('mode')
  }

  return <Instance {...props} onClick={handleClick} />
}

const FloatingBalloon = ({ floatConfig, ...props }: FloatingBalloonProps) => {
  const { isLight } = useStore()

  return isLight ? (
    <Float
      speed={1}
      rotationIntensity={0.1}
      floatIntensity={3}
      floatingRange={[-0.1, 0.1]}
      {...floatConfig}
    >
      <Balloon {...props} />
    </Float>
  ) : (
    <Balloon {...props} />
  )
}

const Balloons = ({
  modelUrl,
  matcapUrl,
  balloons,
  floatConfig,
  // position,
  ...props
}: BalloonsProps) => {
  const { nodes /* ,materials */ } = useGLTF(modelUrl) as unknown as GLTFResult
  const matcapTexture = useTexture(matcapUrl)

  const [hover, setHover] = useState(false)
  useCursor(hover)

  return (
    <group
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      {...props}
    >
      <Instances
        castShadow
        range={balloons.length}
        limit={balloons.length}
        geometry={nodes.Balloon.geometry}
        // material={materials.Balloon}
        scale={nodes.Balloon.scale}
        // position={[-0.01, 1.965, -0.008]}
        // scale={[1.283, 1.646, 1.278]}
        // rotation={[0, 1.571, 0]}
      >
        <meshMatcapMaterial matcap={matcapTexture} color={'#bbbbbb'} />
        {balloons.map((balloon, index) => (
          <FloatingBalloon key={index} floatConfig={floatConfig} {...balloon} />
        ))}
      </Instances>
    </group>
  )
}

export default Balloons
