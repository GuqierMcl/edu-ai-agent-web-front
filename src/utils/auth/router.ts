import { useUserStore } from "@/store";

export const router = {
  toLogin: () => {
    useUserStore().logout();
  },
};
