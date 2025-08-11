import { markRaw } from "vue";
import AppPageSlide from "@/components/page/AppPageSlide.vue";
import { MenuBookRound } from "@vicons/material";

export default {
  name: "CoursesManage",
  path: "/course/layout",
  component: () => import("@/layout/index.vue"),
  meta: {
    title: "课程管理",
    icon: markRaw(MenuBookRound),
    role: ["admin"],
    order: 5,
  },
  children: [
    {
      name: "CourseManage",
      path: "/course",
      component: AppPageSlide,
      meta: {
        title: "课程管理",
        icon: markRaw(MenuBookRound),
        role: ["admin"],
        order: 5,
      },
      children: [
        {
          name: "CourseList",
          path: "/course/list",
          component: () => import("./course/index.vue"),
          meta: {
            title: "课程管理",
            icon: markRaw(MenuBookRound),
            role: ["admin"],
            order: 5,
          },
        },
        {
          name: "BookTree",
          path: "/book/tree/:id/:name/:itemNum",
          component: () => import("./book/index.vue"),
          hidden: true,
          meta: {
            title: "书籍管理",
            icon: markRaw(MenuBookRound),
            role: ["admin"],
            order: 5,
          },
        },
      ],
    },
  ],
};
