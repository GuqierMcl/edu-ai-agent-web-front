import { nextTick } from "vue";
import { defineStore } from "pinia";
import { useDark } from "@vueuse/core";

const isDark = useDark();
export const useAppStore = defineStore("app", {
  state: () => ({
    reloadFlag: true,
    collapsed: false,
    isDark,
    /** keepAlive路由的key，重新赋值可重置keepAlive */
    aliveKeys: <any>{},
    curTitle: "",
    mainAppLoading: false,
  }),
  actions: {
    // 重新加载页面
    async reloadPage() {
      window.$loadingBar.start();
      this.reloadFlag = false;
      await nextTick();
      this.reloadFlag = true;

      setTimeout(() => {
        document.documentElement.scrollTo({ left: 0, top: 0 });
        window.$loadingBar.finish();
      }, 100);
    },
    // 收起/打开侧边菜单
    switchCollapsed() {
      this.collapsed = !this.collapsed;
    },
    // 更改主题
    switchTheme() {
      this.isDark = !this.isDark;
    },
    setAliveKeys(key: string, val: number) {
      this.aliveKeys[key] = val;
      console.log(this.aliveKeys);
    },
    setCurTitle(title: string) {
      this.curTitle = title;
    },
  },
});
