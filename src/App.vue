<template>
  <n-config-provider
    class="full"
    :theme="appStore.isDark ? darkTheme : undefined"
    :locale="zhCN"
    :date-locale="dateZhCN"
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

const appStore = useAppStore();
</script>

<style lang="scss" scoped></style>
