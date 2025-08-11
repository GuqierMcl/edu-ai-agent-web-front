<template>
  <n-icon size="20" class="cursor-pointer" @click="appStore.switchCollapsed">
    <FormatIndentIncreaseRound v-if="appStore.collapsed" />
    <FormatIndentDecreaseRound v-else />
  </n-icon>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store";
import {
  FormatIndentDecreaseRound,
  FormatIndentIncreaseRound,
} from "@vicons/material";

const appStore = useAppStore();
</script>
