import { useState } from 'react'
import { Mesh } from 'three'
import { useCursor, useGLTF } from '@react-three/drei'

import { showToast } from '@/utils'
import { useStore } from '@/stores'
import { colors, triggers } from '@/configs'

import type { GLTF } from 'three-stdlib'
import type { ThreeElements } from '@react-three/fiber'

type IconHeartProps = ThreeElements['group'] & {
  modelUrl: string
}

type GLTFResult = GLTF & {
  nodes: {
    User: Mesh
    Plane: Mesh
  }
}

const Content = () => {
  return (
    <p>
      💻 I build with TS, React & Astro.
      <br />
      💡 I&apos;m exploring SSR, Web 3D & cross-platform dev.
      <br />
      ⚡️ I&apos;m also interested in iOS dev and UI design.
    </p>
  )
}

export const IconMe = ({ modelUrl, ...props }: IconHeartProps) => {
  const { nodes } = useGLTF(modelUrl) as unknown as GLTFResult
  const { isLight, selectedIcon, setSelectedIcon, setTriggerStatus } =
    useStore()

  const [hover, setHover] = useState(false)
  useCursor(hover)

  const id = 'me'
  const isSelected = selectedIcon === id

  const handleClick = (event: MouseEvent) => {
    event.stopPropagation()

    // Show bloom effect
    if (!selectedIcon || selectedIcon !== id) setSelectedIcon(id)

    // Show toast text
    showToast(<Content />)

    // Set the 'lit' trigger as enabled
    if (!triggers.filter((t) => t.name === 'lit')[0].triggered)
      setTriggerStatus('lit')
  }

  return (
    <group
      {...props}
      onClick={handleClick}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <mesh
        castShadow
        geometry={nodes.Plane.geometry}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={1.339}
      >
        <meshBasicMaterial color={'#000000'} />
      </mesh>
      <mesh
        castShadow
        geometry={nodes.User.geometry}
        position={[0, 0.9, 0.5]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[2.02, 2.02, 2.276]}
      >
        <meshBasicMaterial
          color={
            isLight
              ? isSelected
                ? [5, 2, 1]
                : [3, 2, 1]
              : isSelected
                ? [3, 2, 1]
                : colors.red[350]
          }
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

export default IconMe
