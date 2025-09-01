import { HomeRound } from "@vicons/material";
import { markRaw } from "vue";

const route: Route.Row = {
    name: "Dashboard",
    path: "/",
    component: () => import("@/layout/index.vue"),
    redirect: "/workbench",
    meta: {
        perm: ["page:common:workbench"],
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
                perm: ["page:common:workbench"],
                order: 0,
            },
        },
    ],
};

export default route;
