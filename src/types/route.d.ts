import type { Component } from "vue";
import type { RouteComponent } from "vue-router";

declare namespace Route {
  interface Meta {
    title?: string;
    icon?: Component;
    order?: number; // 在菜单中的排序
    perm?: string[]; // 角色权限，用户没有相应的角色则不会生成对应的路由
    keepAlive?: boolean; // 是否保存页面信息，不用重复加载
    requireAuth?: boolean; // 是否需要权限，默认需要（true），仅在不需要拦截的页面上配置false即可
  }

  interface Row {
    path: string;
    name: string;
    component?: RouteComponent;
    redirect?: string;
    children?: Route.Row[];
    hidden?: boolean; // 是否在菜单显示
    meta?: Meta;
  }
}

export = Route;
export as namespace Route;
