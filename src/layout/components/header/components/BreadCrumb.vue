<template>
  <n-breadcrumb>
    <n-breadcrumb-item
      :clickable="false"
      v-for="item in route.matched.filter((item) => !!item.meta?.title)"
      :key="item.path"
    >
      <n-icon size="20" :component="item.meta.icon"></n-icon>
      {{ item.meta.title }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>
