import type { Router } from "vue-router";
import { getToken, refreshAccessToken, isNullOrWhitespace } from "@/utils";
import { WHITE_LIST } from "../routes";

export const createPermissionGuard = (router: Router) => {
  router.beforeEach(async (to) => {
    const token = getToken();

    /** 没有token的情况 */
    if (isNullOrWhitespace(token)) {
      if (WHITE_LIST.includes(to.path)) return true;
      return { path: "login", query: { ...to.query, redirect: to.path } };
    }

    /** 有token的情况 */
    if (to.path === "/login") return { path: "/" };

    // 刷新token
    refreshAccessToken();
    return true;
  });
};
