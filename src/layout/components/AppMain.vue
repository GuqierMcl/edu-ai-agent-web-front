<template>
  <div class="p-20 b-rd-10 bg-#fff dark:bg-dark">
    <router-view v-slot="{ Component, route }">
      <KeepAlive :include="keepAliveRouteNames">
        <component
          :is="Component"
          v-if="appStore.reloadFlag"
          :key="appStore.aliveKeys[<string>route.name] || route.fullPath"
        />
      </KeepAlive>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useAppStore } from "@/store";
import { useRouter } from "vue-router";
const appStore = useAppStore();
const router = useRouter();

const allRoutes = router.getRoutes();
const keepAliveRouteNames = computed(() => {
  return <string[]>(
    allRoutes
      .filter((route) => route.meta?.keepAlive)
      .map((route) => route.name)
  );
});
</script>
