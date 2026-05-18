/*
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2026-03-19 16:40:47
 * @LastEditTime: 2026-03-20 10:59:11
 * @LastEditors: lizhiliang
 * @Usage: 
 */
import HomeView from '../views/HomeView.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/infographic',
    name: 'infographic',
    component: () => import('../views/InfographicView.vue'),
  },
  {
    path: '/pdf',
    name: 'pdf',
    component: () => import('../views/PdfView.vue'),
  },
  {
    path: '/intro',
    name: 'intro',
    component: () => import('../views/IntroView.vue'),
  },
  {
    path: '/relation',
    name: 'relation',
    component: () => import('../views/RelationView.vue'),
  },
  {
    path: '/cityWeather',
    name: 'cityWeather',
    component: () => import('../views/cityWeather/index.vue'),
  },
  {
    path: '/heat',
    name: 'heat',
    component: () => import('../views/Heat/index.vue'),
  },
  {
    path: '/fabric',
    name: 'fabric',
    component: () => import('../views/Fabric/index.vue'),
  },
  {
    path: '/axios',
    name: 'axios',
    component: () => import('../views/axios/index.vue'),
  },
  {
    path: '/instantMessage',
    name: 'instantMessage',
    component: () => import('../views/instantMessaging/index.vue'),
  },
  {
    path: '/msoMap',
    name: 'msoMap',
    component: () => import('../views/msoMap/index.vue'),
  },
  {
    path: '/mailBot',
    name: 'mailBot',
    component: () => import('../views/mailBot/index.vue'),
  },
  {
    path: '/userprofile',
    name: 'UserProfile',
    component: () => import('@/views/UserProfile/index.vue'),
  },
  {
    path: '/jsonExcel',
    name: 'jsonExcel',
    component: () => import('@/views/jsonExcel.vue'),
  },
  {
    path: '/cssStyle',
    name: 'cssStyle',
    component: () => import('@/views/cssStyle/index.vue'),
  }
]
