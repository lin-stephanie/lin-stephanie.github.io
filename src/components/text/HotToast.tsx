import { ReactNode } from 'react'
import { useToaster } from 'react-hot-toast/headless'
import styled, { css, keyframes } from 'styled-components'

import { showToast } from '@/utils'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

const desktopEnterAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

const desktopExitAnimation = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(100%);
  }
`

const mobileEnterAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

const mobileExitAnimation = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-10%);
  }
`

const Overlay = styled.div<{ $visible: boolean }>`
  display: block;
  opacity: 0;
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};

  position: fixed;
  inset: 0;
  z-index: 9998;

  background: rgba(0, 0, 0, 0.8);

  animation: ${({ $visible }) => ($visible ? fadeIn : fadeOut)} 300ms
    ease-in-out forwards;
`

const ToastContainer = styled.div<{ $isMobile: boolean }>`
  z-index: 9999;
  position: fixed;

  ${({ $isMobile }) =>
    $isMobile
      ? css`
          pointer-events: none;
          top: 0;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;

          width: 100vw;
          height: 100vh;
        `
      : css`
          bottom: 3.5%;
          left: 50%;
          transform: translateX(-50%);
        `}
`

const StyledToast = styled.div<{ $visible: boolean; $isMobile: boolean }>`
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  padding: 0.75rem 1rem 1rem;
  border-radius: 1rem;

  color: #fff;

  font-family: Jost, system-ui, sans-serif;
  font-size: 1.1rem;
  line-height: 1.5;

  box-shadow: 0px 3px 20px #000000;

  ${({ $isMobile, $visible }) =>
    $isMobile
      ? css`
          pointer-events: auto;

          width: 80%;
          background: #7f1d1d;
          animation: ${$visible ? mobileEnterAnimation : mobileExitAnimation}
            300ms ease-in-out forwards;
        `
      : css`
          width: 20rem;
          background: #7f1d1d80;
          animation: ${$visible ? desktopEnterAnimation : desktopExitAnimation}
            300ms ease-in-out forwards;
        `}
`

const HotToast = ({ isMobile }: { isMobile: boolean }) => {
  const { toasts, handlers } = useToaster()
  const { startPause, endPause } = handlers

  const latestToast = toasts[toasts.length - 1]

  return (
    <>
      {isMobile && latestToast && (
        <Overlay
          $visible={latestToast.visible}
          onClick={() => {
            // === import toast from 'react-hot-toast/headless' + toast.dismiss('only')
            if (isMobile) showToast('')
          }}
        />
      )}
      <ToastContainer
        $isMobile={isMobile}
        onPointerEnter={startPause}
        onPointerLeave={endPause}
      >
        {latestToast && (
          <StyledToast
            key={latestToast.id}
            $isMobile={isMobile}
            $visible={latestToast.visible}
            {...latestToast.ariaProps}
            onClick={(e) => e.stopPropagation()}
          >
            {latestToast.message as ReactNode}
          </StyledToast>
        )}
      </ToastContainer>
    </>
  )
}

export default HotToast
