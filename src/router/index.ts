import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

export type RouteRecordRawExt = RouteRecordRaw & { hidden?: boolean; children?: RouteRecordRawExt[] }

export const constantRoutes: Array<RouteRecordRawExt> = [
  {
    path: '/',
    redirect: '/home',
    hidden: true
  },
  {
    path: '/home',
    component: () => import('@/views/Home.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})
export const asyncRoutes: Array<RouteRecordRawExt> = []

export default router
