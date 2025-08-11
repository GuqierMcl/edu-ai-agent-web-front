import { HomeRound } from "@vicons/material";
import { markRaw } from "vue";

const route: Route.Row = {
  name: "Dashboard",
  path: "/",
  component: () => import("@/layout/index.vue"),
  redirect: "/workbench",
  meta: {
    requireAuth: false,
    order: 0,
  },
  children: [
    {
      name: "Workbench",
      path: "/workbench",
      component: () => import("./index.vue"),
      meta: {
        title: "工作台",
        icon: markRaw(HomeRound),
        order: 0,
        requireAuth: false,
      },
    },
  ],
};

export default route;
