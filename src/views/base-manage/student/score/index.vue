<template>
  <div class="w-full">
    <n-spin :show="loading">
      <div class="header w-full">
        <ContextHeader
          ref="contextHeaderRef"
          @search="getList"
          :add="false"
          :remove="false"
        ></ContextHeader>
        <div class="flex flex-wrap">
          <div class="my-5 mr-20 f-c-c">
            姓名
            <n-input
              class="ml-10 w-300!"
              v-model:value="queryParams.name"
              placeholder="输入学生姓名"
              @blur="getList"
            />
          </div>
          <div class="my-5 mr-20 f-c-c">
            账号
            <n-input
              class="ml-10 w-300!"
              v-model:value="queryParams.account"
              placeholder="输入学生账号"
              @blur="getList"
            />
          </div>
          <div class="my-5 mr-20 f-c-c">
            学院/专业/班级
            <n-cascader
              class="ml-10 w-300!"
              v-model:value="value"
              :options="cascaderOptions"
              check-strategy="all"
              allow-checking-not-loaded
              remote
              :on-load="loadCascaderOptions"
              @update:value="generateParam"
            />
          </div>
          <div class="my-5 mr-20 f-c-c">
            年级
            <n-select
              class="ml-10 w-300!"
              v-model:value="queryParams.gradeId"
              placeholder="请选择年级"
              :options="gradeOptions"
              @update:value="getList"
            />
          </div>
        </div>
      </div>
      <div class="w-full mt-20">
        <n-data-table
          :single-line="false"
          :scroll-x="1200"
          :columns="columns"
          :data="tableData.records"
          :row-key="(row: Student) => row.id"
          v-model:checked-row-keys="checkedRows"
        />
        <div class="w-full flex justify-end">
          <n-pagination
            class="mt-20"
            v-model:page="queryParams.page"
            v-model:page-size="queryParams.pageSize"
            :item-count="tableData.total"
            :page-sizes="pageSizes"
            show-size-picker
            @update:page="getList"
            @update:page-size="getList"
          />
        </div>
      </div>
    </n-spin>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import type { CascaderOption, SelectOption } from "naive-ui";
import { generateColumns, pageSizes } from "./common";
import studentApi from "@/api/studentApi";
import { getMajorOptions, getClazzOptions, getCascaderRoot } from "./service";
import { useAppStore } from "@/store";
import optionsApi from "@/api/optionsApi";

const value = ref("");
const appStore = useAppStore();

const { columns } = generateColumns();
const tableData = ref(<Page.Resp<Student>>{});
const checkedRows = ref<string[]>([]);
const loading = ref(false);
const cascaderOptions = ref<CascaderOption[]>([]);
const gradeOptions = ref<SelectOption[]>([]);
const queryParams = ref({
  page: 1,
  pageSize: 10,
  collegeId: "",
  majorId: "",
  clazzId: "",
  name: "",
  gradeId: "",
  account: "",
});
const contextHeaderRef = ref();

const generateParam = (value: string, option: CascaderOption) => {
  queryParams.value.collegeId = "";
  queryParams.value.majorId = "";
  queryParams.value.clazzId = "";
  queryParams.value.gradeId = "";

  if (option.depth == 1) {
    queryParams.value.collegeId = value;
  } else if (option.depth == 2) {
    queryParams.value.majorId = value;
  } else if (option.depth == 3) {
    queryParams.value.clazzId = value;
  }
  getList();
};

const getList = async () => {
  loading.value = true;
  try {
    const { code, data } = await studentApi.getScoreList(queryParams.value);
    if (code !== 1) return;
    tableData.value = data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const getGrade = async () => {
  const options = await optionsApi.getGradeOptions();
  gradeOptions.value = [
    {
      label: "全部",
      value: "",
    },
    ...options,
  ];
};

const loadCascaderOptions = (option: CascaderOption) => {
  // 根据depth判断获取学院、专业还是班级
  return new Promise<void>(async (resolve) => {
    if (option.depth == 1) {
      // 获取专业
      option.children = await getMajorOptions(<string>option.value);
    } else if (option.depth == 2) {
      // 获取班级
      option.children = await getClazzOptions(<string>option.value);
    }
    resolve();
  });
};

onMounted(async () => {
  getList();
  getGrade();
  cascaderOptions.value = await getCascaderRoot();
});
</script>

<style lang="scss" scoped></style>
