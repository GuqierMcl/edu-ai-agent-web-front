export const basicRoutes: Route.Row[] = [
    {
        name: "404",
        path: "/404",
        component: () => import("@/views/error-page/404.vue"),
        hidden: true,
        meta: {
            requireAuth: false,
        },
    },
    {
        name: "Hello",
        path: "/test",
        component: () => import("@/components/Test.vue"),
        hidden: true,
        meta: {
            requireAuth: false,
        },
    },
    {
        name: "Login",
        path: "/login",
        component: () => import("@/views/login/index.vue"),
        hidden: true,
        meta: {
            title: "登录页",
            requireAuth: false,
        },
    },
    {
        name: "Register",
        path: "/register",
        component: () => import("@/views/register/index.vue"),
        hidden: true,
        meta: {
            title: "用户注册",
            requireAuth: false,
        },
    },
];

export const WHITE_LIST = ["/login", "/404", "/register"]

export const NOT_FOUND_ROUTE: Route.Row = {
  name: "NotFound",
  path: "/:pathMatch(.*)*",
  redirect: "/404",
  hidden: true,
  meta: {
    title: "NotFound",
  },
};

export const EMPTY_ROUTE = {
  name: "Empty",
  path: "/:pathMatch(.*)*",
  meta: {
    title: "Empty",
  },
};

// 扫描views目录的route文件，待身份验证成功后添加至路由
const modules: Record<string, any> = import.meta.glob("@/views/**/route.ts", {
  eager: true,
});
const asyncRoutes: any = [];
Object.keys(modules).forEach((key) => {
  asyncRoutes.push(modules[key].default);
});

export { asyncRoutes };
