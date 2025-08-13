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
    title: "基础信息管理",
    icon: markRaw(ManageAccountsRound),
    role: ["admin"],
    order: 6,
  },
  children: [
    {
      name: "StudentManage",
      path: "/base/student",
      component: AppPageSlide,
      meta: {
        title: "学生信息管理",
        icon: markRaw(PeopleAltRound),
        role: ["admin"],
        order: 1,
      },
      children: [
        {
          name: "StudentList",
          path: "/base/student/list",
          component: () => import("./student/index.vue"),
          meta: {
            title: "学生信息管理",
            icon: markRaw(PeopleAltRound),
            role: ["admin"],
            order: 1,
          },
        },
        {
          name: "StudentScoreList",
          path: "/base/studentScore/list",
          component: () => import("./student/score/index.vue"),
          meta: {
            title: "学生积分管理",
            icon: markRaw(MovingRound),
            role: ["admin"],
            order: 1,
          },
        },
      ],
    },
    {
      name: "TeacherManage",
      path: "/base/teacher",
      component: AppPageSlide,
      meta: {
        title: "教师信息管理",
        icon: markRaw(PersonRound),
        role: ["admin"],
        order: 2,
      },
      children: [
        {
          name: "TeacherList",
          path: "/base/teacher/list",
          component: () => import("./teacher/teacher-list/index.vue"),
          meta: {
            title: "教师信息管理",
            icon: markRaw(PersonRound),
            role: ["admin"],
            order: 1,
          },
        },
      ],
    },
  ],
};
