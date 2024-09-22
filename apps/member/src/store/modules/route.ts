import { defineStore } from 'pinia';
import { ref } from 'vue';
import router from '@/router';
import { useUserStore } from './user';
import { asyncRouter } from '@/router/modules';
import { filterRoutesByRole, filterRoutesToMenus } from '@/router/helpers';

export const useRouteStore = defineStore('route', () => {
  // 状态
  const routeMode = ref(import.meta.env.VITE_ROUTE_MODE);
  const isInitRoute = ref(false);
  const menus = ref<App.Menu[]>([]);
  const cacheList = ref<string[]>([]);

  // Actions
  const initRoute = () => {
    if (routeMode.value === 'static') {
      initStaticRoute();
    } else {
      initDynamicRoute();
    }
  };

  const initStaticRoute = () => {
    const userStore = useUserStore();
    const routes = filterRoutesByRole(asyncRouter, userStore.userInfo.role);
    routes.forEach((route) => {
      route.children?.length ? router.addRoute(route) : router.addRoute('root', route);
    });
    const menuData = filterRoutesToMenus(routes);
    setMenus(menuData);
    isInitRoute.value = true;
  };

  const initDynamicRoute = () => {
    // 动态权限路由的实现
  };

  const setMenus = (menuData: App.Menu[]) => {
    menus.value = menuData;
  };

  return {
    routeMode,
    isInitRoute,
    menus,
    cacheList,
    initRoute,
    initStaticRoute,
    initDynamicRoute,
    setMenus
  };
});
