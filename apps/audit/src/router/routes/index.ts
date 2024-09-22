import { RouteRecordRaw } from 'vue-router';
const Layout = () => import('@/layout/index.vue');

/** 根路由 */
export const RootRoute: RouteRecordRaw = {
  name: 'root',
  path: '/',
  component: Layout,
  redirect: import.meta.env.VITE_ROUTE_HOME_PATH
};

/** 任意路由 */
export const PathMatchRoute: RouteRecordRaw = {
  name: 'not-found',
  path: '/:pathMatch(.*)*',
  component: Layout,
  redirect: '/error',
  meta: {
    title: '未找到'
  }
};

export const NotFoundRoute: RouteRecordRaw = {
  name: '404',
  path: '/error',
  component: () => import('@/views/error/404.vue'),
  meta: {
    title: '404',
    icon: 'local-icon-404'
  }
};
