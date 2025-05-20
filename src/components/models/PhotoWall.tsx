import { createInstances, useGLTF, useTexture } from '@react-three/drei'
import { Photo } from '@/components/models/PhotoMain'

import type { ComponentProps } from 'react'
import type { Mesh, MeshStandardMaterial } from 'three'
import type { GLTF } from 'three-stdlib'
import type { ThreeElements, Vector3 } from '@react-three/fiber'

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

type PhotoProps = ComponentProps<typeof FrameInstance> & {
  photoUrl: string
  photoPosition: Vector3
  photoRotation: [number, number, number]
  photoScale: [number, number]
  frameScale: Vector3
}

type PhotoWallProps = ThreeElements['group'] & {
  modelUrl: string
  matcapUrl: string
  photos: {
    position: Vector3
    rotation: [number, number, number]
    frameScale: Vector3
    photoUrl: string
    photoPosition: Vector3
    photoRotation: [number, number, number]
    photoScale: [number, number]
  }[]
}

const [FrameInstances, FrameInstance] = createInstances()
const [PlaneInstances, PlaneInstance] = createInstances()

const PhotoFrame = ({
  photoUrl,
  photoPosition,
  photoRotation,
  photoScale,
  frameScale,
  ...props
}: PhotoProps) => {
  // const [hover, setHover] = useState(false)
  // useCursor(hover)

  return (
    <group {...props}>
      <FrameInstance
        scale={frameScale}
        // onPointerOver={() => setHover(true)}
        // onPointerOut={() => setHover(false)}
      >
        <PlaneInstance />
      </FrameInstance>
      <Photo
        url={photoUrl}
        position={photoPosition}
        rotation={photoRotation}
        scale={photoScale}
        // hover={hover}
      />
    </group>
  )
}

const PhotoWall = ({
  modelUrl,
  matcapUrl,
  photos,
  ...props
}: PhotoWallProps) => {
  const { nodes } = useGLTF(modelUrl) as unknown as GLTFResult
  const matcapTexture = useTexture(matcapUrl)

  return (
    <group {...props}>
      <FrameInstances
        castShadow
        range={photos.length}
        limit={photos.length}
        geometry={nodes.mesh_1.geometry}
      >
        <meshMatcapMaterial matcap={matcapTexture} color={'#999'} />
        <PlaneInstances castShadow geometry={nodes.mesh.geometry}>
          <meshBasicMaterial color={'white'} />
          {photos.map((photo, index) => (
            <PhotoFrame
              key={index}
              photoUrl={photo.photoUrl}
              photoPosition={photo.photoPosition}
              photoRotation={photo.photoRotation}
              photoScale={photo.photoScale}
              frameScale={photo.frameScale}
              position={photo.position}
              rotation={photo.rotation}
            />
          ))}
        </PlaneInstances>
      </FrameInstances>
    </group>
  )
}

export default PhotoWall
