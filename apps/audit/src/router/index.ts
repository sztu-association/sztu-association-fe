import { App } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { NotFoundRoute, RootRoute, PathMatchRoute } from './routes';
import { createRouterGuard } from './guard';
/** 静态路由 */
export const constantRoutes: RouteRecordRaw[] = [RootRoute, PathMatchRoute, NotFoundRoute];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 })
});

export async function setupRouter(app: App) {
  app.use(router);
  createRouterGuard(router);
  await router.isReady();
}

export default router;
