import { ref } from "vue";
import { defineStore } from "pinia";
import { asyncRoutes, basicRoutes } from "@/router/routes";
import Route from "@/types/route";
import { isDef } from "@/utils";

function hasPermission(route: Route.Row, permissions: string[]) {
  // 登录用户没有的路由权限
  // if (!permissions.length) return false;

  // 没有设置requireAuth：默认为true，需要拦截
  // 有设置requireAuth：若为false，直接通过，否则拦截  
  if (isDef(route.meta?.requireAuth) && !route.meta?.requireAuth)  {
    return true;
  }

  const routePerm = route.meta?.perm ? route.meta.perm : [];

  if (!permissions.length || !routePerm.length) return false;

  // 登录用户拥有指定的路由权限
  return permissions.some((item) => routePerm.includes(item));
}

function filterAsyncRoutes(routes: Route.Row[] = [], permissions: string[]) {
  let ret = ref(<Route.Row[]>[]);
  routes.forEach((route) => {
    if (hasPermission(route, permissions)) {
      const curRoute: Route.Row = {
        ...route,
        children: [],
      };
      if (route.children && route.children.length) {
        curRoute.children = filterAsyncRoutes(route.children, permissions);
      } else {
        Reflect.deleteProperty(curRoute, "children");
      }
      ret.value.push(curRoute);
    }
  });
  return ret.value;
}

export const usePermissionStore = defineStore("permission", {
  state() {
    return {
      accessRoutes: <Route.Row[]>[],
    };
  },
  getters: {
    // 用户已有权限的路由
    routes(): Route.Row[] {
      return basicRoutes.concat(this.accessRoutes);
    },
    // 可显示在菜单的路由
    menus(): Route.Row[] {
      return this.routes.filter(
        (route: Route.Row) => route.name && !route.hidden
      );
    },
  },
  actions: {
    // 根据角色生成路由
    // generateRoutes(role: string[] = []) {
    //   const accessRoutes = filterAsyncRoutes(asyncRoutes, role);
    //   this.accessRoutes = accessRoutes;
    //   return accessRoutes;
    // },
    generateRoutes(permissions: string[] = []) {
      const accessRoutes = filterAsyncRoutes(asyncRoutes, permissions);
      this.accessRoutes = accessRoutes;
      return accessRoutes;
    },
    resetPermission() {
      this.$reset();
    },
  },
});
