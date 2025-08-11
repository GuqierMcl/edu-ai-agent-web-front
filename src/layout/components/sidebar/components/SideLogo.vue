<template>
  <div class="mb-10">
    <router-link to="/">
      <div class="h-60 f-c-c">
        <n-image :preview-disabled="true" width="40" :src="LogoWebp" />
        <n-image
          :preview-disabled="true"
          height="40"
          v-show="!appStore.collapsed"
          :src="FontLogo"
        />
      </div>
      <!-- <h3
        v-show="!appStore.collapsed"
        class="text-hidden-1 text-center color-#767c82"
      >
        中医典籍实训平台
      </h3> -->
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store";
import LogoWebp from "@/assets/logo.png";
import FontLogo from "@/assets/font-logo.png";

const appStore = useAppStore();
</script>
