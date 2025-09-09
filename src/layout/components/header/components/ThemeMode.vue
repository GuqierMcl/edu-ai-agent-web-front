<template>
  <n-icon class="mx-20 cursor-pointer" size="18" @click="changeTheme">
    <NightlightRoundFilled v-if="appStore.isDark" />
    <LightModeFilled v-else />
  </n-icon>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store";
import { LightModeFilled, NightlightRoundFilled } from "@vicons/material";
import { useDark, useToggle } from "@vueuse/core";

const appStore = useAppStore();

const isDark = useDark();
const changeTheme = () => {
  appStore.switchTheme();
  useToggle(isDark)();
};
</script>
