import { markRaw } from "vue";
import AppPageSlide from "@/components/page/AppPageSlide.vue";
import {
  SettingsRound,
  FormatListBulletedRound,
  AddCardRound,
  ManRound,
  AdminPanelSettingsRound,
  PersonSearchRound,
  AttributionRound,
  SettingsPowerRound,
} from "@vicons/material";

export default {
  name: "SysManage",
  path: "/sys",
  component: () => import("@/layout/index.vue"),
  meta: {
    title: "系统管理",
    icon: markRaw(SettingsRound),
    role: ["admin"],
    order: 100,
  },
  children: [
    {
      name: "UserManage",
      path: "/sys/user",
      component: AppPageSlide,
      meta: {
        title: "用户管理",
        icon: markRaw(ManRound),
        role: ["admin"],
        order: 1,
      },
      children: [
        {
          name: "AdminManage",
          path: "/sys/admin",
          component: () => import("./user/admin/index.vue"),
          meta: {
            title: "管理员信息",
            icon: markRaw(AdminPanelSettingsRound),
            role: ["admin"],
            order: 1,
          },
        },
        {
          name: "UserSearch",
          path: "/sys/user/search",
          component: () => import("./user/search/index.vue"),
          meta: {
            title: "用户综合查询",
            icon: markRaw(PersonSearchRound),
            role: ["admin"],
            order: 2,
          },
        },
      ],
    },
    {
      name: "Auth",
      path: "/sys/auth",
      component: AppPageSlide,
      meta: {
        title: "权限管理",
        icon: markRaw(AddCardRound),
        role: ["admin"],
        order: 2,
      },
      children: [
        {
          name: "RoleManage",
          path: "/sys/auth/role",
          component: () => import("./auth/auth/index.vue"),
          meta: {
            title: "教师角色管理",
            icon: markRaw(AttributionRound),
            role: ["admin"],
            order: 1,
          },
        },
        {
          name: "AuthManage",
          path: "/sys/role/auth",
          component: () => import("./auth/role/index.vue"),
          meta: {
            title: "角色权限管理",
            icon: markRaw(SettingsPowerRound),
            role: ["admin"],
            order: 2,
          },
        },
      ],
    },
  ],
};
