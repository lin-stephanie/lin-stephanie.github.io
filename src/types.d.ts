/* Vite Environment */
// https://vite.dev/guide/features.html#client-types
/// <reference types="vite/client" />

/* Extended 'styled-components' Types */
// https://styled-components.com/docs/api#typescript
import 'styled-components'

// Extend the DefaultTheme interface to include a 'light' property
declare module 'styled-components' {
  export interface DefaultTheme {
    isLight: boolean
  }
}

/* Extended '@react-three/fiber' Types */
// https://r3f.docs.pmnd.rs/api/typescript#extending-threeelements
import { UnrealBloomPass } from 'three-stdlib'
import type { ThreeElements } from '@react-three/fiber'

declare module '@react-three/fiber' {
  interface ThreeElements {
    unrealBloomPass: ThreeElement<typeof UnrealBloomPass>
  }
}
