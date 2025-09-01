import userApi from "@/api/userApi";
import authApi from "@/api/authApi";
import { isEmpty, removeToken } from "@/utils";
import { defineStore } from "pinia";
import { resetRouter, router } from "@/router";
import { useTagsStore, usePermissionStore } from "@/store";

export const useUserStore = defineStore("user", {
    state: () => ({
        userInfo: <UserInfo>{},
    }),
    getters: {
        // 使用this时，ts无法推导类型，需要手动指定返回类型
        userId: (state) => state.userInfo.id || "",
        name: (state) => state.userInfo.name || "",
        nickname: (state) => state.userInfo.nickname || "",
        avatar: (state) => state.userInfo.avatar || "",
        avatarUrl: (state) => state.userInfo.avatar || "",
        roles: (state) => state.userInfo.roles || [],
        permissions: (state) => state.userInfo.permissions || [],
    },
    actions: {
        setUserInfo(userInfo = {}) {
            this.userInfo = { ...this.userInfo, ...userInfo };
        },
        async getUserInfo() {
            if (!isEmpty(this.userInfo)) {
                return this.userInfo;
            } else {
                const { code, data } = await userApi.getUser();
                if (code === 1) {
                    this.userInfo = data;
                    return this.userInfo;
                }
            }
            return null;
        },
        async logout() {
            await authApi.logout();
            this.logoutOnlyRedirect();
        },
        logoutOnlyRedirect() {
            const tagStore = useTagsStore();
            const permissionStore = usePermissionStore();
            tagStore.resetTags();
            permissionStore.resetPermission();
            removeToken();
            this.$reset();
            resetRouter();
            router.replace({ name: "Login" });
        },
    },
});
