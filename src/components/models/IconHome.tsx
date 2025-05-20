import { useState } from 'react'
import { Mesh } from 'three'
import { useCursor, useGLTF } from '@react-three/drei'

import Link from '@/components/text/Link'
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
    Plane1: Mesh
    Plane2: Mesh
  }
}

const Content = () => {
  return (
    <p>
      Oops! My personal site’s not live yet — but I did make an Astro theme for
      it. Feel free to{' '}
      <Link href="https://astro-antfustyle-theme.vercel.app/">take a peek</Link>{' '}
      if you’re curious! 🍀
    </p>
  )
}

export const IconHome = ({ modelUrl, ...props }: IconHeartProps) => {
  const { nodes } = useGLTF(modelUrl) as unknown as GLTFResult
  const { isLight, selectedIcon, setSelectedIcon, setTriggerStatus } =
    useStore()

  const [hover, setHover] = useState(false)
  useCursor(hover)

  const id = 'home'
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
        geometry={nodes.Plane1.geometry}
        rotation={[-Math.PI, 0, 0]}
      >
        <meshBasicMaterial color={'#000000'} />
      </mesh>
      <mesh
        castShadow
        geometry={nodes.Plane2.geometry}
        position={[0, -0.6, 0.58]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={0.9}
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

export default IconHome
