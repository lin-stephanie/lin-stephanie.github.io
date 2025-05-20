import { DoubleSide } from 'three'
import { useEffect, useState } from 'react'
import { Plane, useTexture, useAspect } from '@react-three/drei'

type PlaneProps = React.ComponentProps<typeof Plane>

type BackgroundWallProps = PlaneProps & {
  mapUrl: string
  color: string
}

const BackgroundWall = ({
  mapUrl,
  color,
  children,
  ...props
}: BackgroundWallProps) => {
  const mapTexture = useTexture(mapUrl)
  const [size, setSize] = useState<{ width: number; height: number }>()
  const scale = useAspect(
    size ? size.width : 1600,
    size ? size.height : 1000,
    1.05
  )

  useEffect(() => {
    if (mapTexture.image) {
      setSize({
        width: mapTexture.image.width,
        height: mapTexture.image.height,
      })
    }
  }, [mapTexture])

  return (
    <Plane args={[1, 1]} scale={scale} {...props}>
      <meshToonMaterial map={mapTexture} color={color} side={DoubleSide} />
      {children}
    </Plane>

    // <mesh
    //   position={[0, 0, 0]}
    //   scale={scale}
    // >
    //   <planeGeometry args={[1, 1]} />
    //   <meshToonMaterial
    //     map={texture}
    //     color="#393939"
    //     color="#44403c"
    //   />
    // </mesh>
  )
}

export default BackgroundWall
