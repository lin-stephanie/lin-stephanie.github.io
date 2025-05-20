import { Canvas } from '@react-three/fiber'
import { StatsGl } from '@react-three/drei'
import { Leva } from 'leva'

import Scene from '@/Scene'
import Loader from '@/components/widgets/Loader'
import HotToast from '@/components/text/HotToast'
import { useStore } from '@/stores'
import { showToast } from '@/utils'

export default function App() {
  const isMobile = /Android|iPhone/i.test(navigator.userAgent)
  const { debug } = useStore()
  // const { debug } = useStore(state => state.debug)
  // const debug  = useStore.use.debug()

  return (
    <>
      <Loader />
      <HotToast isMobile={isMobile} />
      <Canvas
        style={{ touchAction: 'none' }}
        shadows
        dpr={Math.min(window.devicePixelRatio, 2)}
        orthographic={true}
        camera={{ zoom: 100, near: 0.1, far: 200, position: [0, 0, 10] }}
        onPointerMissed={(e) => {
          if (e.detail === 1) showToast('')
        }}
      >
        <Scene isMobile={isMobile} />
        {debug && <StatsGl />}
      </Canvas>
      {debug && <Leva collapsed={true} flat={false} />}
    </>
  )
}
