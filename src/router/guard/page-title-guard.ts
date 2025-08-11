import { Router } from "vue-router";
import { useAppStore } from "@/store";

const baseTitle = import.meta.env.VITE_TITLE;

export function createPageTitleGuard(router: Router) {
  router.afterEach((to) => {
    const pageTitle = to.meta?.title as string;
    const appStore = useAppStore();
    if (pageTitle) {
      document.title = `${pageTitle} | ${baseTitle}`;
      appStore.setCurTitle(pageTitle);
    } else {
      document.title = baseTitle;
      appStore.setCurTitle(baseTitle);
    }
  });
}
