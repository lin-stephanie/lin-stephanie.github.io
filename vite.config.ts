import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// When not using plugins, only esbuild is used for production builds, resulting in faster builds
export default defineConfig({
  base: '/',
  plugins: [
    react({
      babel: {
        plugins: [
          [
            // https://styled-components.com/docs/tooling#babel-plugin
            'babel-plugin-styled-components',
            {
              ssr: false,
              displayName: true,
              fileName: true,
              // If either fileName or displayName are set to false, this option has no effect
              meaninglessFileNames: ['index'],
              minify: true,
              transpileTemplateLiterals: true,
              pure: true,
            },
          ],
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.glb'],
})
