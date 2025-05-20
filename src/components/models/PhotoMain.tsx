import { useEffect, useRef, useState } from 'react'
import { Mesh, MeshStandardMaterial } from 'three'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useCursor, Image, useTexture } from '@react-three/drei'
import { easing } from 'maath'
// import { a, useSpring } from '@react-spring/three'

import { useStore } from '@/stores'
import { showToast } from '@/utils'

import type { ThreeElements, Vector3 } from '@react-three/fiber'
import type { ImageProps } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh: Mesh
    mesh_1: Mesh
  }
  materials: {
    T_Picture: MeshStandardMaterial
    T_Frame: MeshStandardMaterial
  }
}

type FrameProps = ThreeElements['mesh'] & {
  modelUrl: string
  matcapUrl: string
  setHover: (value: boolean) => void
}

type PhotoProps = ImageProps & {
  hover?: boolean
}

type PhotoFrameProps = Omit<
  FrameProps & PhotoProps & ThreeElements['group'],
  'hover' | 'setHover'
> & {
  framePosition: Vector3
  frameScale: Vector3
  photoPosition: Vector3
  photoUrl: string
  photoScale: [number, number]
}

const Frame = ({
  modelUrl,
  matcapUrl,
  setHover,
  children,
  ...props
}: FrameProps) => {
  const { nodes /* , materials */ } = useGLTF(modelUrl) as unknown as GLTFResult
  const matcapTexture = useTexture(matcapUrl)

  return (
    <mesh
      castShadow
      geometry={nodes.mesh_1.geometry}
      // material={materials.T_Frame}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      {...props}
    >
      <meshMatcapMaterial matcap={matcapTexture} color={'#888'} />
      <mesh
        castShadow
        geometry={nodes.mesh.geometry}
        // material={materials.T_Picture}
      >
        <meshBasicMaterial color={'white'} />
      </mesh>
      {children}
    </mesh>
  )
}

export const Photo = ({ hover, scale, ...props }: PhotoProps) => {
  // the exclamation mark is a non-null assertion that will let TS know that
  // ref.current is defined when we access it in effects (!not in a frame loop)
  const imageRef = useRef<Mesh>(null!)

  const { isLight } = useStore()

  // const [zoom, setZoom] = useState(1)
  // const [rnd] = useState(() => Math.random())

  const localScale = Array.isArray(scale) ? [...scale] : scale
  const [scaleX, scaleY] = localScale as [number, number]

  useEffect(() => {
    if (
      imageRef.current &&
      imageRef.current.material &&
      !Array.isArray(imageRef.current.material)
    ) {
      imageRef.current.material = imageRef.current.material.clone()
    }
  }, [])

  useFrame((_state, delta) => {
    if (imageRef.current) {
      // if `threeD.imageZoom` is true, creates a subtle "breathing" effect
      /* if (threeD.imageZoom) {
        const newZoom =
          1.05 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 1.5) / 20
        setZoom(newZoom)
      } */

      // If the photo is hovered or in light theme, scale it up
      easing.damp3(
        imageRef.current.scale,
        [
          scaleX * (hover || isLight ? 1.1 : 1),
          scaleY * (hover || isLight ? 1.1 : 1),
          1,
        ],
        0.1,
        delta
      )
    }
  })

  return (
    <Image
      // @ts-expect-error (type)
      ref={imageRef}
      // zoom={zoom}
      scale={scale}
      // disable ray detection for some components that don't require user interaction
      raycast={() => null}
      {...props}
    />
  )
}

const PhotoMain = ({
  modelUrl,
  matcapUrl,
  framePosition,
  frameScale,
  photoUrl,
  photoPosition,
  photoScale,
  // position,
  ...props
}: PhotoFrameProps) => {
  const { getRandomSecret, setTriggerStatus, triggers } = useStore()
  const [hover, setHover] = useState(false)
  useCursor(hover)

  /* const spring = useSpring({
    to: { position: position },
    from: { position: [position[0] - 6, position[1], position[2]] },
    config: { duration: 800 },
  }) */

  const handleClick = () => {
    showToast(getRandomSecret())
    if (!triggers.filter((t) => t.name === 'secret')[0].triggered)
      setTriggerStatus('secret')
  }

  return (
    // <a.group position={spring.position} {...props}>
    <group {...props} onClick={handleClick}>
      <Frame
        modelUrl={modelUrl}
        matcapUrl={matcapUrl}
        position={framePosition}
        scale={frameScale}
        setHover={setHover}
      />
      <Photo
        url={photoUrl}
        position={photoPosition}
        scale={photoScale}
        hover={hover}
      />
    </group>
    // </a.group>
  )
}

export default PhotoMain
