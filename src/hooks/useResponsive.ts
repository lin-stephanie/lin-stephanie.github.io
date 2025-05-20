import { useState, useEffect } from 'react'
// import { OrthographicCamera } from 'three'
import { useThree } from '@react-three/fiber'

interface calculateState {
  sceneWidthFactor: number
  sceneHeightFactor: number
  is2Xl: boolean
  isXl: boolean
  isLg: boolean
  isMd: boolean
  isSm: boolean
  isXs: boolean
}

interface respState extends calculateState {
  viewportWidth: number
  viewportHeight: number
}

const calculateFactor = (): calculateState => {
  // console.log('w', window.innerWidth, window.innerHeight)

  const sceneWidthFactor = Math.min(Math.max(window.innerWidth / 1440, 0.3), 2)
  const sceneHeightFactor = Math.min(
    Math.max(window.innerHeight / 817, 0.8),
    1.8
  )

  const is2Xl = window.innerWidth >= 1536
  const isXl = window.innerWidth >= 1280
  const isLg = window.innerWidth >= 1024
  const isMd = window.innerWidth >= 768
  const isSm = window.innerWidth >= 576
  const isXs = window.innerWidth >= 460

  return {
    sceneWidthFactor,
    sceneHeightFactor,
    is2Xl,
    isXl,
    isLg,
    isMd,
    isSm,
    isXs,
  }
}

export const useResponsive = (): respState => {
  const { width: viewportWidth, height: viewportHeight } = useThree(
    (state) => state.viewport
  )

  // console.log('v', viewportWidth, viewportHeight)
  // const { camera } = useThree()
  // if (camera instanceof OrthographicCamera) {
  //   const { left, right, top, bottom } = camera
  //   console.log('Orthographic Camera Bounds:', { left, right, top, bottom })
  // }

  const [resp, setResp] = useState<respState>(() => {
    return {
      viewportWidth,
      viewportHeight,
      ...calculateFactor(),
    }
  })

  useEffect(() => {
    setResp({
      viewportWidth,
      viewportHeight,
      ...calculateFactor(),
    })
  }, [viewportWidth, viewportHeight])

  return resp
}
