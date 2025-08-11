<template>
  <n-layout has-sider class="full">
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="220"
      :native-scrollbar="false"
      :collapsed="appStore.collapsed"
    >
      <SideBar />
    </n-layout-sider>

    <article class="flex-col flex-1 overflow-hidden">
      <section
        class="flex items-center px-15 h-60 border-b bc-eee dark:bg-dark dark:border-0"
      >
        <AppHeader />
      </section>
      <section class="border-b bc-eee dark:border-0">
        <AppTags class="h-50" />
      </section>
      <section
        class="flex-1 p-30 overflow-y-auto p-10 bg-hex-f5f6fb dark:bg-hex-101014"
      >
        <n-spin :show="appStore.mainAppLoading">
          <AppMain />
        </n-spin>
      </section>
    </article>
  </n-layout>
</template>

<script lang="ts" setup>
import AppMain from "./components/AppMain.vue";
import AppHeader from "./components/header/index.vue";
import AppTags from "./components/tags/index.vue";
import SideBar from "./components/sidebar/index.vue";
import { useAppStore } from "@/store";

const appStore = useAppStore();
</script>
