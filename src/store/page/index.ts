import { nextTick } from "vue";
import { defineStore } from "pinia";

export const usePageStore = defineStore("page", {
  state: () => ({
    essayData: <Essay>{},
  }),
  actions: {
    setEssayData(data: Essay) {
      this.essayData = data;
    }
  },
});
