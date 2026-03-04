
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
        {
      path: '/infographic',
      name: 'infographic',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/InfographicView.vue'),
    },
    {
      path: '/pdf',
      name: 'pdf',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
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
    }
  ],
})

export default router
