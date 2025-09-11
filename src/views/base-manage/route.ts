import { markRaw } from "vue";
import AppPageSlide from "@/components/page/AppPageSlide.vue";
import {
    ManageAccountsRound,
    PeopleAltRound,
    PersonRound,
    AccountTreeRound,
    AnimationRound,
    ClassRound,
    ImageRound,
    MovingRound,
} from "@vicons/material";

export default {
    name: "BaseManage",
    path: "/base",
    component: () => import("@/layout/index.vue"),
    meta: {
        perm: ["page:common:base:index"],
        title: "基础信息管理",
        icon: markRaw(ManageAccountsRound),
        role: ["admin"],
        order: 6,
    },
    children: [
        {
            name: "StudentList",
            path: "/base/student",
            component: () => import("./student/index.vue"),
            meta: {
                perm: ["page:common:base:student"],
                title: "学生信息管理",
                icon: markRaw(PeopleAltRound),
                role: ["admin"],
                order: 1,
            },
        },
        {
            name: "TeacherList",
            path: "/base/teacher",
            component: () => import("./teacher/index.vue"),
            meta: {
                perm: ["page:common:base:student"],
                title: "教师信息管理",
                icon: markRaw(PersonRound),
                role: ["admin"],
                order: 1,
            },
        },
    ],
};
