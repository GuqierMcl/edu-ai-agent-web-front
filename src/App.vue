<template>
  <n-config-provider
    class="full"
    :theme="appStore.isDark ? darkTheme : undefined"
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme-overrides="themeOverrides"
  >
    <NLoadingBarProvider>
      <NMessageProvider>
        <NDialogProvider>
          <NNotificationProvider>
            <GlobalContainer />
          </NNotificationProvider>
        </NDialogProvider>
      </NMessageProvider>
    </NLoadingBarProvider>
    <n-global-style />
  </n-config-provider>
</template>

<script setup lang="ts">
import GlobalContainer from "./components/GlobalContainer.vue";
import { darkTheme, zhCN, dateZhCN } from "naive-ui";
import { useAppStore } from "./store";

const themeOverrides = {
    Menu: {
        borderRadius: "20px",
  },
    common: {
      primaryColor: "#18A058", // 主要颜色，位于./public/loading.js
    },
};

const appStore = useAppStore();
</script>

<style lang="scss" scoped></style>
