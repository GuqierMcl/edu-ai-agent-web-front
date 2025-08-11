<template>
  <div>
    <div class="w-full">
      <n-spin :show="loading">
        <div class="header w-full">
          <ContextHeader
            @search="getList"
            @add="addClazz"
            @remove="delBatch"
          ></ContextHeader>
          <div class="flex flex-wrap">
            <div class="my-5 mr-20 f-c-c">
              学院
              <n-select
                class="ml-10 w-300!"
                v-model:value="queryParams.collegeId"
                placeholder="请选择学院"
                :options="collegeOptions"
                @update:value="(value: string) => {
                getMajor(value);
                getList();
              }"
              />
            </div>
            <div class="my-5 mr-20 f-c-c">
              专业
              <n-select
                class="ml-10 w-300!"
                v-model:value="queryParams.majorId"
                :placeholder="
                  queryParams.collegeId?.length ? '请选择专业' : '请先选择学院'
                "
                :options="majorOptions"
                @update:value="getList"
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
            :row-key="(row: Clazz) => row.id"
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

    <n-modal
      class="w-520 p-10"
      :title="isEdit ? '修改班级信息' : '添加班级信息'"
      v-model:show="showModal"
      preset="card"
      size="huge"
    >
      <Form
        :formData="formData"
        :isEdit="isEdit"
        @close="showModal = false"
        @reloadList="getList"
      ></Form>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import type { SelectOption } from "naive-ui";
import { generateColumns, pageSizes } from "./common";
import Form from "./Form.vue";
import clazzApi from "@/api/clazzApi";
import optionsApi from "@/api/optionsApi";
import Page from "@/types/page";

const editClazz = (row: Clazz) => {
  formData.value = <ClazzAdd>row;
  isEdit.value = true;
  showModal.value = true;
};
const delClazz = (row: Clazz) => {
  window.$dialog.warning({
    title: "警告",
    content: `确定删除 【${row.name}】 的信息吗`,
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      const { code } = await clazzApi.removeBatch([<string>row.id]);
      if (code === 1) {
        window.$message.success("删除成功");
        checkedRows.value = checkedRows.value.filter((item) => item != row.id);
        getList();
      }
    },
  });
};

const delBatch = () => {
  if (checkedRows.value.length === 0) {
    window.$message.warning("请选择班级信息");
    return;
  }
  window.$dialog.warning({
    title: "警告",
    content: `确定删除所选的 ${checkedRows.value.length}条 班级信息吗`,
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      const { code } = await clazzApi.removeBatch(checkedRows.value);
      if (code === 1) {
        window.$message.success("删除成功");
        checkedRows.value = [];
        getList();
      }
    },
  });
};

const { columns } = generateColumns(editClazz, delClazz);

const tableData = ref(<Page.Resp<Clazz>>{});
const checkedRows = ref<string[]>([]);
const showModal = ref(false);
const formData = ref(<ClazzAdd>{});
const isEdit = ref(false);
const loading = ref(false);
const collegeOptions = ref<SelectOption[]>([]);
const majorOptions = ref<SelectOption[]>([]);
const gradeOptions = ref<SelectOption[]>([]);
const queryParams = ref<Page.Req>({
  page: 1,
  pageSize: 3,
});

const addClazz = () => {
  formData.value = <ClazzAdd>{};
  isEdit.value = false;
  showModal.value = true;
};

const getList = async () => {
  loading.value = true;
  try {
    const { code, data } = await clazzApi.getList(queryParams.value);
    if (code !== 1) return;
    tableData.value = data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const defaultOption = {
  label: "全部",
  value: "",
};

const getCollege = async () => {
  const options = await optionsApi.getCollegeOptions();
  collegeOptions.value = [defaultOption, ...options];
};
const getMajor = async (collegeId: string) => {
  queryParams.value.majorId = "";
  majorOptions.value = [];
  if (collegeId == "") return;

  const options = await optionsApi.getMajorOptions(collegeId);
  majorOptions.value = [defaultOption, ...options];
};
const getGrade = async () => {
  const options = await optionsApi.getGradeOptions();
  gradeOptions.value = [defaultOption, ...options];
};

onMounted(() => {
  getList();
  getCollege();
  getGrade();
});
</script>

<style lang="scss" scoped></style>
