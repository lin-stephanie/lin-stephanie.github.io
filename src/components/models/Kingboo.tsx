import { useRef, useState } from 'react'
import { Mesh } from 'three'
import { useFrame } from '@react-three/fiber'
import { useCursor, useGLTF, useTexture } from '@react-three/drei'
import { easing } from 'maath'

import { useStore } from '@/stores'
import { showToast } from '@/utils'
import { useResponsive } from '@/hooks'

import type { ThreeElements } from '@react-three/fiber'
import type { GLTF } from 'three-stdlib'
// import { useBrowserLocation } from 'wouter/use-browser-location'

type KingbooProps = ThreeElements['mesh'] & {
  modelUrl: string
  matcapUrl: string
}

type GLTFResult = GLTF & {
  nodes: {
    king_boo: Mesh
  }
}

const FollowEffect = ({ children, ...props }: ThreeElements['group']) => {
  const group = useRef<Mesh>(null!)

  useFrame((state, delta) => {
    easing.dampE(
      group.current.rotation,
      [-state.pointer.y / 16, state.pointer.x / 16, 0],
      0.2,
      delta
    )
  })

  return (
    <group ref={group} {...props}>
      {children}
    </group>
  )
}

export const Kingboo = ({ modelUrl, matcapUrl, ...props }: KingbooProps) => {
  const { nodes } = useGLTF(modelUrl) as unknown as GLTFResult
  const matcapTexture = useTexture(matcapUrl)

  const { isLight, getUnsolvedTriggers, getRandomHint } = useStore()
  const { isLg } = useResponsive()

  const [hover, setHover] = useState(false)
  useCursor(hover)

  const handleClick = () => {
    const unsolvedTriggerCount = getUnsolvedTriggers().length

    if (unsolvedTriggerCount === 0) {
      showToast(
        'Boom! You’ve triggered every single mechanism. Who knows?\nMaybe some fresh surprises will show up next time! ✨'
      )
    } else {
      const hint = getRandomHint()
      showToast(
        `Hey hey! You've got ${unsolvedTriggerCount} sneaky mechanisms still hiding out. Wanna clue? Here it is: ${hint} 🔍 `
      )
    }
  }

  // const [, setLocation] = useBrowserLocation()

  return isLight ? (
    <FollowEffect>
      <mesh
        castShadow={isLg ? true : undefined}
        geometry={nodes.king_boo.geometry}
        // material={nodes.king_boo.material}
        rotation={[Math.PI / 2, 0, 0]}
        onClick={handleClick}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        {...props}
      >
        <meshMatcapMaterial matcap={matcapTexture} color={'#d38888'} />
      </mesh>
    </FollowEffect>
  ) : (
    <mesh
      castShadow={isLg ? true : undefined}
      geometry={nodes.king_boo.geometry}
      // material={nodes.king_boo.material}
      rotation={[Math.PI / 2, 0, 0]}
      onClick={handleClick}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      // onDoubleClick={() => setLocation('/debug')}
      {...props}
    >
      <meshMatcapMaterial matcap={matcapTexture} color={'#d38888'} />
    </mesh>
  )
}

export default Kingboo
