import { useEffect, useState } from 'react'
import { useProgress } from '@react-three/drei'
import styled, { css } from 'styled-components'

import { useStore } from '@/stores'
import loadingGif from '@/assets/images/circle.gif'

const LoaderContainer = styled.div<{ $fadeOut: boolean }>`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;

  width: 100vw;
  height: 100vh;

  background: #000;

  color: white;
  font-size: 1.5rem;
  font-family: 'Rubik Wet Paint', Tahoma, system-ui, sans-serif;

  transition: opacity 0.5s ease-in-out;

  ${({ $fadeOut }) =>
    $fadeOut &&
    css`
      opacity: 0;
    `}
`

const StyledDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Loader = () => {
  const { active, progress } = useProgress()

  const { isLoaded, setIsLoaded } = useStore()
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    if (!active && progress >= 100) {
      const holdTimer = setTimeout(() => {
        // Loading completes, hold for 500ms to trigger fade-out smoothly.
        // Ensures transition isn't abrupt, showing "100%" briefly.
        setFadeOut(true)
        const removeTimer = setTimeout(() => {
          // Wait 500ms to ensure fade-out animation completes.
          setIsLoaded(true)
        }, 500)
        return () => clearTimeout(removeTimer)
      }, 500)

      return () => clearTimeout(holdTimer)
    }
  }, [active, progress, setIsLoaded])

  if (isLoaded) return null

  return (
    <LoaderContainer $fadeOut={fadeOut}>
      <StyledDiv>{Math.round(progress)} %</StyledDiv>
      <img src={loadingGif} alt="Loading" width={180} />
    </LoaderContainer>
  )
}

export default Loader
