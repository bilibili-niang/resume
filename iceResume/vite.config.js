import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: '../docs',
    emptyOutDir: true
  },
  base: '/resume/'  // 这里设置为你的仓库名称
})
