import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import { basicRoutes, EMPTY_ROUTE, NOT_FOUND_ROUTE } from "./routes";
import { setupRouterGuard } from "./guard";
import type { App } from "vue";
import { getToken, isNullOrWhitespace, messageError } from "@/utils";
import { useUserStore, usePermissionStore } from "@/store";

export const router = createRouter({
  history: createWebHistory("/"),
  routes: <RouteRecordRaw[]>basicRoutes,
  scrollBehavior(to, from, savedPosition) {
    return { left: 0, top: 0 };
  },
});

export async function setupRouter(app: App<Element>) {
  await addDynamicRoutes();
  setupRouterGuard(router);
  app.use(router);
}

export async function addDynamicRoutes() {
  const token = getToken();

  // 没有token情况
  if (isNullOrWhitespace(token)) {
    const empty = EMPTY_ROUTE as unknown as RouteRecordRaw;
    router.addRoute(empty);
    return;
  }

  // 有token的情况
  try {
    const userStore = useUserStore();
    const permissionStore = usePermissionStore();

    if (!userStore.userId) {
      let userInfo = await userStore.getUserInfo();

      if (!userInfo) {
        messageError("Token已过期，请重新登录");
        userStore.logoutOnlyRedirect();
      }
    }

    // const accessRoutes = permissionStore.generateRoutes(userStore.role);
    const accessRoutes = permissionStore.generateRoutes(
      userStore.permissionKeys
    );

    accessRoutes.forEach((route: Route.Row) => {
      !router.hasRoute(route.name) && router.addRoute(<RouteRecordRaw>route);
    });

    router.hasRoute(EMPTY_ROUTE.name) && router.removeRoute(EMPTY_ROUTE.name);
    router.addRoute(<RouteRecordRaw>NOT_FOUND_ROUTE);
  } catch (error) {
    console.error(error);
  }
}

// 删除动态路由
export async function resetRouter() {
  const basicRouteNames = basicRoutes
    .map((route) => getRouteName(route))
    .flat(1);
  router.getRoutes().forEach((route) => {
    const name = route.name as string;
    if (!basicRouteNames.includes(name)) {
      router.removeRoute(name);
    }
  });
}

function getRouteName(route: Route.Row) {
  const names = [route.name];
  if (route.children && route.children.length) {
    names.push(...route.children.map((item) => getRouteName(item)).flat(1));
  }
  return names;
}
