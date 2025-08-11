<template>
  <div class="overscroll-y-auto full">
    <RouterView />
    <n-back-top :bottom="20" />
  </div>
</template>

<script lang="ts" setup>
import {
  useMessage,
  useDialog,
  useNotification,
  useLoadingBar,
} from "naive-ui";

window.$message = useMessage();
window.$dialog = useDialog();
window.$notify = useNotification();
window.$loadingBar = useLoadingBar();
</script>

<style lang="scss">
.full.n-scrollbar {
  & > .n-scrollbar-container {
    height: 100%;
    & > .n-scrollbar-content {
      height: 100%;
    }
  }
}
</style>
