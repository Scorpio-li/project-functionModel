/*
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2026-02-26 16:52:47
 * @LastEditTime: 2026-05-18 14:46:19
 * @LastEditors: lizhiliang
 * @Usage: 
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
// import vitePluginRequire from 'vite-plugin-require';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    vanillaExtractPlugin()
    // vitePluginRequire()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
