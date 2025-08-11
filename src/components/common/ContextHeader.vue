<template>
  <div class="f-b-c">
    <span class="text-20">{{ appStore.curTitle }}</span>
    <div class="f-b-c buttons">
      <n-button @click="router.back" v-if="back" strong secondary>
        <template #icon>
          <n-icon :component="ArrowBackIosRound"></n-icon>
        </template>
        返回
      </n-button>
      <n-button @click="refreshPage" v-if="refresh" strong secondary>
        <template #icon>
          <n-icon :component="RefreshRound"></n-icon>
        </template>
        刷新
      </n-button>
      <n-button
        @click="emits('search')"
        v-if="search"
        strong
        secondary
        type="info"
      >
        <template #icon>
          <n-icon :component="SearchRound"></n-icon>
        </template>
        查询
      </n-button>
      <n-button
        @click="emits('add')"
        v-if="add"
        strong
        secondary
        type="success"
      >
        <template #icon>
          <n-icon :component="PlusRound"></n-icon>
        </template>
        添加
      </n-button>
      <n-button
        @click="emits('remove')"
        v-if="remove"
        strong
        secondary
        type="error"
      >
        <template #icon>
          <n-icon :component="CloseRound"></n-icon>
        </template>
        删除
      </n-button>
      <n-upload
        v-if="impor"
        ref="uploadBtn"
        :custom-request="importFunction"
        accept=".xlsx,.xls"
        :show-file-list="false"
        :max="1"
      >
        <n-button strong secondary type="warning">
          <template #icon>
            <n-icon :component="FileDownloadRound"></n-icon>
          </template>
          导入
        </n-button>
      </n-upload>
      <n-button
        @click="emits('export')"
        v-if="expor"
        strong
        secondary
        type="warning"
      >
        <template #icon>
          <n-icon :component="FileUploadRound"></n-icon>
        </template>
        导出
      </n-button>
      <n-button
        @click="emits('batchImport')"
        v-if="batchImport"
        strong
        secondary
        type="warning"
      >
        <template #icon>
          <n-icon :component="FileUploadRound"></n-icon>
        </template>
        批量上传
      </n-button>
    </div>
  </div>
  <n-divider class="mt-10!"></n-divider>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useAppStore } from "@/store";
import { useRoute, useRouter } from "vue-router";
import { UploadCustomRequestOptions } from "naive-ui";
import {
  RefreshRound,
  SearchRound,
  CloseRound,
  PlusRound,
  FileUploadRound,
  FileDownloadRound,
  ArrowBackIosRound,
} from "@vicons/material";

const appStore = useAppStore();
const route = useRoute();
const router = useRouter();
const uploadBtn = ref();

defineProps({
  back: {
    type: Boolean,
    default: false,
    require: false,
  },
  refresh: {
    type: Boolean,
    default: true,
    require: false,
  },
  search: {
    type: Boolean,
    default: true,
    require: false,
  },
  remove: {
    type: Boolean,
    default: true,
    require: false,
  },
  add: {
    type: Boolean,
    default: true,
    require: false,
  },
  impor: {
    type: Boolean,
    default: false,
    require: false,
  },
  expor: {
    type: Boolean,
    default: false,
    require: false,
  },
  batchImport: {
    type: Boolean,
    default: false,
    require: false,
  },
});

const emits = defineEmits([
  "search",
  "remove",
  "add",
  "import",
  "export",
  "batchImport",
]);

const refreshPage = () => {
  if (route.meta?.keepAlive) {
    // 重置keepAlive
    appStore.setAliveKeys(route.name as string, +new Date());
  }
  appStore.reloadPage();
};

const importFunction = ({ file }: UploadCustomRequestOptions) => {
  emits("import", file.file);
};

// 清空upload组件的文件列表
const clearFileList = () => {
  uploadBtn.value.clear();
};
defineExpose({
  clearFileList,
});
</script>

<style lang="scss" scoped>
.f-b-c.buttons > * {
  margin-right: 5rem;
}
</style>
