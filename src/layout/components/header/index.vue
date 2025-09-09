<template>
  <div class="flex items-center">
    <MenuCollapse />
    <BreadCrumb class="ml-15" />
  </div>
  <div class="ml-auto flex items-center">
    <Notification />
    <ThemeMode />
    <UserAvatar />
  </div>
</template>

<script lang="ts" setup>
import BreadCrumb from "./components/BreadCrumb.vue";
import MenuCollapse from "./components/MenuCollapse.vue";
import UserAvatar from "./components/UserAvatar.vue";
import ThemeMode from "./components/ThemeMode.vue";
import Notification from "./components/Notification.vue";
</script>
