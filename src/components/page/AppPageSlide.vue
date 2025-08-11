<template>
  <RouterView v-slot="{ Component }">
    <transition name="fade-slide" appear>
      <component :is="Component" />
    </transition>
  </RouterView>
</template>

<script lang="ts" setup>
import { RouterView } from "vue-router";
</script>

<style lang="scss" scoped>
.fade-slide-enter-active {
  transition: all 0.3s;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
