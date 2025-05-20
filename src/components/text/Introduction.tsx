import { Html } from '@react-three/drei'
import styled, { ThemeProvider, keyframes } from 'styled-components'

import { useStore } from '@/stores'

import Name from '@/components/text/Name'
import Self from '@/components/text/Self'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const StyledHtml = styled(Html)`
  /* make elements ignore mouse events */
  pointer-events: none;
`

const StyledDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;

  width: 100%;
  height: 100%;

  font-family:
    Rubik Wet Paint,
    Tahoma,
    system-ui,
    sans-serif;

  animation: 600ms ${fadeIn} linear forwards;

  @media (min-width: 1536px) {
    gap: 3.6rem;
  }
`

const Introduction = () => {
  const { isLight } = useStore()

  return (
    <StyledHtml center zIndexRange={[100, 0]}>
      <ThemeProvider theme={{ isLight }}>
        <StyledDiv>
          <Name />
          <Self />
        </StyledDiv>
      </ThemeProvider>
    </StyledHtml>
  )
}

export default Introduction
