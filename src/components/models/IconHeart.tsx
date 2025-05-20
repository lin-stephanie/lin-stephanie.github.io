import { useState } from 'react'
import { Mesh } from 'three'
import { useCursor, useGLTF } from '@react-three/drei'

import Link from '@/components/text/Link'
import { showToast } from '@/utils'
import { useStore } from '@/stores'
import { colors, triggers } from '@/configs'

import type { ThreeElements } from '@react-three/fiber'
import type { GLTF } from 'three-stdlib'

type IconHeartProps = ThreeElements['group'] & {
  modelUrl: string
}

type GLTFResult = GLTF & {
  nodes: {
    Heart1: Mesh
    Heart2: Mesh
  }
}

const Content = () => {
  return (
    <p>
      This page is built with React Three Fiber. You can view the source code{' '}
      <Link href="https://github.com/lin-stephanie/lin-stephanie.github.io">
        here
      </Link>
      , and if you’d like, leave a star to let me know you stopped by! ⭐️
    </p>
  )
}

export const IconHeart = ({ modelUrl, ...props }: IconHeartProps) => {
  const { nodes } = useGLTF(modelUrl) as unknown as GLTFResult
  const { isLight, selectedIcon, setSelectedIcon, setTriggerStatus } =
    useStore()

  const [hover, setHover] = useState(false)
  useCursor(hover)

  const id = 'heart'
  const isSelected = selectedIcon === id

  const handleClick = (event: MouseEvent) => {
    event.stopPropagation()
    if (!selectedIcon || selectedIcon !== id) setSelectedIcon(id)
    showToast(<Content />)
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
        geometry={nodes.Heart2.geometry}
        rotation={[-Math.PI, 0, 0]}
      >
        <meshBasicMaterial color={'#000000'} />
      </mesh>
      <mesh
        castShadow
        geometry={nodes.Heart1.geometry}
        position={[0, 0.4, 0.5]}
        rotation={[-Math.PI, 0, -Math.PI]}
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

export default IconHeart
