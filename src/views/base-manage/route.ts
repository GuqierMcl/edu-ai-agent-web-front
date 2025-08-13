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
    {
      name: "ClazzManage",
      path: "/base/class",
      component: AppPageSlide,
      meta: {
        title: "班级信息管理",
        icon: markRaw(ClassRound),
        role: ["admin"],
        order: 3,
      },
      children: [
        {
          name: "ClazzList",
          path: "/base/clazz/list",
          component: () => import("./clazz/index.vue"),
          meta: {
            title: "班级信息管理",
            icon: markRaw(ClassRound),
            role: ["admin"],
            order: 1,
          },
        },
      ],
    },
    {
      name: "CodeManage",
      path: "/base/code",
      component: AppPageSlide,
      meta: {
        title: "码表管理",
        icon: markRaw(AnimationRound),
        role: ["admin"],
        order: 4,
      },
      children: [
        {
          name: "CodeList",
          path: "/base/code/list",
          component: () => import("../sys-manage/code/index.vue"),
          meta: {
            title: "码表管理",
            icon: markRaw(AnimationRound),
            role: ["admin"],
            order: 1,
          },
        },
      ],
    },
    {
      name: "OrganizationManage",
      path: "/base/organization",
      component: AppPageSlide,
      meta: {
        title: "组织机构管理",
        icon: markRaw(AccountTreeRound),
        role: ["admin"],
        order: 3,
      },
      children: [
        {
          name: "OrganizationTree",
          path: "/base/organization/tree",
          component: () => import("./organization/organization-tree/index.vue"),
          meta: {
            title: "组织机构管理",
            icon: markRaw(AccountTreeRound),
            role: ["admin"],
            order: 1,
          },
        },
      ],
    },
    {
      name: "ImageManage",
      path: "/base/image",
      component: AppPageSlide,
      meta: {
        title: "图片管理",
        icon: markRaw(ImageRound),
        role: ["admin"],
        order: 5,
      },
      children: [
        {
          name: "ImageList",
          path: "/base/image/list",
          component: () => import("./Image/index.vue"),
          meta: {
            title: "图片管理",
            icon: markRaw(ImageRound),
            role: ["admin"],
            order: 1,
          },
        },
      ],
    },
  ],
};
