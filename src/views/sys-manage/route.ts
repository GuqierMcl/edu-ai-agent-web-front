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
    AttachFileFilled,
    AnimationRound,
} from "@vicons/material";

export default {
    name: "SysManage",
    path: "/sys",
    component: () => import("@/layout/index.vue"),
    meta: {
        requireAuth: false,
        title: "系统管理",
        icon: markRaw(SettingsRound),
        role: ["admin"],
        order: 100,
    },
    children: [
        {
            name: "ResourceManage",
            path: "/sys/resource",
            component: () => import("./resource-manage/index.vue"),
            meta: {
                requireAuth: false,
                title: "资源管理",
                icon: markRaw(AttachFileFilled),
                role: ["admin"],
                order: 1,
            },
        },
        {
            name: "CodeManage",
            path: "/base/code",
            component: () => import("../sys-manage/code/index.vue"),
            meta: {
                requireAuth: false,
                title: "码表管理",
                icon: markRaw(AnimationRound),
                role: ["admin"],
                order: 1,
            },
        },
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
            path: "/sys/perm",
            component: AppPageSlide,
            meta: {
                requireAuth: false,
                title: "权限管理",
                icon: markRaw(AddCardRound),
                role: ["admin"],
                order: 2,
            },
            children: [
                {
                    name: "RoleManage",
                    path: "/sys/perm/user",
                    component: () => import("./rbac/user-role/index.vue"),
                    meta: {
                        requireAuth: false,
                        title: "用户角色管理",
                        icon: markRaw(AttributionRound),
                        role: ["admin"],
                        order: 1,
                    },
                },
                {
                    name: "PermManage",
                    path: "/sys/perm/role",
                    component: () => import("./rbac/permission-role/index.vue"),
                    meta: {
                        requireAuth: false,
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
