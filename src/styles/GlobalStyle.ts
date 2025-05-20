import { createGlobalStyle } from 'styled-components'

import 'normalize.css'
import '@/assets/fonts/RubikWetPaint/RubikWetPaint.css'
import '@/assets/fonts/Jost/Jost.css'

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;

    padding: 0;
    margin: 0;
  }

  html,
  body,
  #root {
    overflow: hidden;

    width: 100%;
    height: 100%;

    user-select: none;
  }

  body {
    line-height: 1.3;
    font-weight: 400;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    /* --leva-sizes-rootWidth: 350px; */
  }
`
