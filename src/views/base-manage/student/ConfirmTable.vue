<template>
  <n-tabs
    animated
    default-value="success"
    size="large"
    justify-content="center"
    :value="tabName"
    :on-update:value="(value: string) => {tabName=value}"
  >
    <n-tab-pane name="success">
      <template #tab>
        <n-badge type="success" :value="successList?.length">
          <p>校验成功</p>
        </n-badge>
      </template>
      <n-data-table
        :single-line="false"
        :scroll-x="1200"
        :columns="confirmTableColumns"
        :data="successList"
        :max-height="500"
      />
      <div class="mt-20 w-full flex justify-end">
        <n-button
          v-show="!isConfirm"
          type="primary"
          @click="importSuccess"
          :loading="loading"
        >
          确认保存
        </n-button>
      </div>
    </n-tab-pane>
    <n-tab-pane name="fail">
      <template #tab>
        <n-badge type="error" :value="failList?.length">
          <p>校验失败</p>
        </n-badge>
      </template>
      <n-data-table
        :single-line="false"
        :scroll-x="1200"
        :columns="confirmTableColumns"
        :data="failList"
        :max-height="500"
      />
      <div class="mt-20 w-full flex justify-end">
        <n-button type="warning" @click="exportFail" :loading="loading">
          导出Excel
        </n-button>
      </div>
    </n-tab-pane>
  </n-tabs>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { confirmTableColumns } from "./common";
import studentApi from "@/api/studentApi";

const emits = defineEmits(["close", "reloadList"]);
const props = defineProps({
  uuid: {
    type: String,
    require: true,
  },
  successList: {
    type: Array as () => StuExcel[],
    require: true,
  },
  failList: {
    type: Array as () => StuExcel[],
    require: true,
  },
});

const isConfirm = ref(false);
const tabName = ref("success");
const loading = ref(false);

const exportFail = async () => {
  if (props.failList?.length === 0) {
    window.$message.error("当前没有导入失败的信息");
    return;
  }
  loading.value = true;
  try {
    await studentApi.exportFail(props.uuid!);
  } finally {
    loading.value = false;
  }
};

const importSuccess = async () => {
  if (props.successList?.length == 0) {
    window.$message.warning("没有校验成功的学生数据");
    return;
  }
  loading.value = true;
  try {
    const { code, data } = await studentApi.importSuccess(props.uuid!);
    if (code !== 1) return;
    window.$message.success("保存成功");
    isConfirm.value = true;
    if (props.failList?.length == 0) {
      emits("close");
    } else {
      tabName.value = "fail";
    }
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  if (props.successList?.length == 0) {
    tabName.value = "fail";
  }
});
</script>

<style lang="scss" scoped></style>
