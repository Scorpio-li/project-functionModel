/*
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2026-02-26 16:52:47
 * @LastEditTime: 2026-04-17 14:43:32
 * @LastEditors: lizhiliang
 * @Usage: 
 */
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
