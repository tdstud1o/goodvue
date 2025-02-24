import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`, // 打包后的入口文件名
        chunkFileNames: `assets/[name].js`, // 打包后的代码块文件名
        assetFileNames: `assets/[name].[ext]`, // 打包后的静态资源文件名
      },
    },
  },
  plugins: [
    vue(),
    vueDevTools(),
  ],
  server: {
    https:{
      key:fs.readFileSync('certs/server.key'),
      cert:fs.readFileSync('certs/server.crt'),
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
