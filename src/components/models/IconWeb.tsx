import { useState } from 'react'
import { Mesh } from 'three'
import { useCursor, useGLTF } from '@react-three/drei'
import styled from 'styled-components'

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
    Circle1: Mesh
    Circle2: Mesh
  }
}

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Content = () => {
  return (
    <>
      <StyledDiv>
        <span>Peek my open-source stuff?</span>
        <Link href="https://github.com/lin-stephanie">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12.001 2c-5.525 0-10 4.475-10 10a9.99 9.99 0 0 0 6.837 9.488c.5.087.688-.213.688-.476c0-.237-.013-1.024-.013-1.862c-2.512.463-3.162-.612-3.362-1.175c-.113-.288-.6-1.175-1.025-1.413c-.35-.187-.85-.65-.013-.662c.788-.013 1.35.725 1.538 1.025c.9 1.512 2.337 1.087 2.912.825c.088-.65.35-1.087.638-1.337c-2.225-.25-4.55-1.113-4.55-4.938c0-1.088.387-1.987 1.025-2.687c-.1-.25-.45-1.275.1-2.65c0 0 .837-.263 2.75 1.024a9.3 9.3 0 0 1 2.5-.337c.85 0 1.7.112 2.5.337c1.913-1.3 2.75-1.024 2.75-1.024c.55 1.375.2 2.4.1 2.65c.637.7 1.025 1.587 1.025 2.687c0 3.838-2.337 4.688-4.562 4.938c.362.312.675.912.675 1.85c0 1.337-.013 2.412-.013 2.75c0 .262.188.574.688.474A10.02 10.02 0 0 0 22 12c0-5.525-4.475-10-10-10"
            />
          </svg>
          {/* <span>GitHub</span> */}
        </Link>
      </StyledDiv>
      <StyledDiv>
        <span>Need a dose of nerdy thoughts?</span>
        <Link href="https://bsky.app/profile/ste7lin.bsky.social">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M4.907 3.44c.709.12 1.533.501 2.576 1.247C9.28 5.97 10.769 7.739 12 9.564c1.231-1.825 2.72-3.593 4.517-4.877c1.043-.746 1.867-1.127 2.576-1.248c.767-.13 1.29.065 1.615.2C21.717 4.06 22 5.225 22 6.215c0 .201-.086 1.302-.185 2.36c-.052.546-.11 1.108-.166 1.577c-.053.428-.115.88-.19 1.133a4.33 4.33 0 0 1-1.951 2.517c.937.707 1.277 1.856.928 2.984c-.597 1.924-2.737 4.397-4.835 4.618c-1.773.186-2.935-1.325-3.601-2.76c-.666 1.435-1.828 2.946-3.6 2.76c-2.099-.22-4.24-2.694-4.836-4.618c-.35-1.128-.01-2.277.928-2.984a4.33 4.33 0 0 1-1.95-2.517c-.076-.253-.138-.705-.19-1.133a61 61 0 0 1-.167-1.577C2.085 7.517 2 6.416 2 6.215c0-.99.283-2.155 1.292-2.576c.326-.135.847-.33 1.615-.2M4.05 6.916c.064.818.18 2.108.288 2.992c.032.268.055.545.122.807c.397 1.34 1.929 2.082 3.686 1.887a1 1 0 0 1 .257 1.983c-.756.112-3.315.357-2.928 1.607c.357 1.151 1.848 3.087 3.134 3.222c.928.097 1.5-1.394 1.766-2.045c.275-.674.488-1.38.668-1.982a1 1 0 0 1 1.916 0c.18.602.393 1.308.668 1.982c.266.651.838 2.142 1.766 2.045c1.286-.135 2.777-2.07 3.134-3.222c.387-1.25-2.172-1.495-2.928-1.607a1 1 0 0 1 .257-1.983c1.757.195 3.289-.547 3.686-1.887c.069-.266.089-.536.122-.807a80 80 0 0 0 .288-2.992c.037-.468.247-1.637-.522-1.506c-.286.049-.823.241-1.749.903c-1.943 1.389-3.705 3.513-4.789 5.64a1 1 0 0 1-1.782 0c-1.084-2.127-2.846-4.251-4.789-5.64c-.926-.662-1.463-.854-1.749-.903c-.784-.134-.559 1.034-.522 1.506"
            />
          </svg>
          {/* <span>Bluesky</span> */}
        </Link>
      </StyledDiv>
      <StyledDiv>
        <span>Wanna see my nonsense?</span>
        <Link href="https://x.com/ste7lin">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m17.687 3.063l-4.996 5.711l-4.32-5.711H2.112l7.477 9.776l-7.086 8.099h3.034l5.469-6.25l4.78 6.25h6.102l-7.794-10.304l6.625-7.571zm-1.064 16.06L5.654 4.782h1.803l10.846 14.34z"
            />
          </svg>
          {/* <span>Twitter</span> */}
        </Link>
      </StyledDiv>
      <StyledDiv>
        <span>Looking for my food & life shots?</span>
        <Link href="https://www.instagram.com/ste7lin/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12.001 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6m0-2a5 5 0 1 1 0 10a5 5 0 0 1 0-10m6.5-.25a1.25 1.25 0 0 1-2.5 0a1.25 1.25 0 0 1 2.5 0M12.001 4c-2.474 0-2.878.007-4.029.058c-.784.037-1.31.142-1.798.332a2.9 2.9 0 0 0-1.08.703a2.9 2.9 0 0 0-.704 1.08c-.19.49-.295 1.015-.331 1.798C4.007 9.075 4 9.461 4 12c0 2.475.007 2.878.058 4.029c.037.783.142 1.31.331 1.797c.17.435.37.748.702 1.08c.337.336.65.537 1.08.703c.494.191 1.02.297 1.8.333C9.075 19.994 9.461 20 12 20c2.475 0 2.878-.007 4.029-.058c.782-.037 1.308-.142 1.797-.331a2.9 2.9 0 0 0 1.08-.703c.337-.336.538-.649.704-1.08c.19-.492.296-1.018.332-1.8c.052-1.103.058-1.49.058-4.028c0-2.474-.007-2.878-.058-4.029c-.037-.782-.143-1.31-.332-1.798a2.9 2.9 0 0 0-.703-1.08a2.9 2.9 0 0 0-1.08-.704c-.49-.19-1.016-.295-1.798-.331C14.926 4.006 14.54 4 12 4m0-2c2.717 0 3.056.01 4.123.06c1.064.05 1.79.217 2.427.465c.66.254 1.216.598 1.772 1.153a4.9 4.9 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428c.047 1.066.06 1.405.06 4.122s-.01 3.056-.06 4.122s-.218 1.79-.465 2.428a4.9 4.9 0 0 1-1.153 1.772a4.9 4.9 0 0 1-1.772 1.153c-.637.247-1.363.415-2.427.465c-1.067.047-1.406.06-4.123.06s-3.056-.01-4.123-.06c-1.064-.05-1.789-.218-2.427-.465a4.9 4.9 0 0 1-1.772-1.153a4.9 4.9 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.012 15.056 2 14.717 2 12s.01-3.056.06-4.122s.217-1.79.465-2.428a4.9 4.9 0 0 1 1.153-1.772A4.9 4.9 0 0 1 5.45 2.525c.637-.248 1.362-.415 2.427-.465C8.945 2.013 9.284 2 12.001 2"
            />
          </svg>
          {/* <span>Instagram</span> */}
        </Link>
      </StyledDiv>
    </>
  )
}

export const IconWeb = ({ modelUrl, ...props }: IconHeartProps) => {
  const { nodes } = useGLTF(modelUrl) as unknown as GLTFResult
  const { isLight, selectedIcon, setSelectedIcon, setTriggerStatus } =
    useStore()

  const [hover, setHover] = useState(false)
  useCursor(hover)

  const id = 'web'
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
      <mesh castShadow geometry={nodes.Circle1.geometry}>
        <meshBasicMaterial color={'#000000'} />
      </mesh>
      <mesh
        castShadow
        geometry={nodes.Circle2.geometry}
        position={[0, 0, 0.58]}
        scale={0.8}
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

export default IconWeb
