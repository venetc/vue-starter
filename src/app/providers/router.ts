import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router';
import { routes } from '@/pages'

export const router: Router = createRouter({
  history: createWebHistory('/'),
  routes: routes as RouteRecordRaw[]
});
