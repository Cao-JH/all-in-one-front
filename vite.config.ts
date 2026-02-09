import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    // 自动导入配置
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'], // 自动导入这些库的API
      dts: true, // 生成类型声明文件，适配TS
    }),
    // 自动导入组件配置
    Components({
      dirs: ['src/components'], // 自动导入src/components下的组件
      dts: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
