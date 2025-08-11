<template>
  <div>
    <div class="w-full">
      <n-spin :show="loading">
        <div class="header w-full">
          <ContextHeader
            ref="contextHeaderRef"
            impor
            expor
            @search="getList"
            @add="addStudent"
            @remove="delBatch"
            @import="importFile"
            @export="exportByQuery"
          ></ContextHeader>
          <div class="flex flex-wrap">
            <div class="my-5 mr-20 f-c-c">
              班级
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

    <n-modal
      class="w-520 p-10"
      :title="isEdit ? '修改学生信息' : '添加学生信息'"
      v-model:show="showFormModal"
      preset="card"
      size="huge"
    >
      <Form
        :formData="formData"
        :isEdit="isEdit"
        @close="showFormModal = false"
        @reloadList="getList"
      ></Form>
    </n-modal>

    <n-modal
      class="w-1200 p-10"
      title="上传信息一览"
      v-model:show="showUpTableModal"
      preset="card"
      size="huge"
      :close-on-esc="false"
      :mask-closable="false"
      :on-update:show="confirmClose"
    >
      <ConfirmTable
        :uuid="uploadConfirmData?.uuid"
        :successList="uploadConfirmData?.successList"
        :failList="uploadConfirmData?.failList"
        @close="
          () => {
            notNoticeClose = true;
            showUpTableModal = false;
            getList();
          }
        "
      ></ConfirmTable>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import type { CascaderOption, SelectOption } from "naive-ui";
import { generateColumns, pageSizes } from "./common";
import studentApi from "@/api/studentApi";
import Form from "./Form.vue";
import ConfirmTable from "./ConfirmTable.vue";
import { getMajorOptions, getClazzOptions, getCascaderRoot } from "./service";
import { useAppStore } from "@/store";
import optionsApi from "@/api/optionsApi";

const value = ref("");
const appStore = useAppStore();

const stuEdit = (row: Student) => {
  formData.value = row;
  isEdit.value = true;
  showFormModal.value = true;
};
const stuDel = (row: Student) => {
  window.$dialog.warning({
    title: "警告",
    content: `确定删除 【${row.name}】 的信息吗`,
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      const { code } = await studentApi.remove([<string>row.id]);
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
    window.$message.warning("请选择用户信息");
    return;
  }
  window.$dialog.warning({
    title: "警告",
    content: `确定删除所选的 ${checkedRows.value.length}条 学生信息吗`,
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      const { code } = await studentApi.remove(checkedRows.value);
      if (code === 1) {
        window.$message.success("删除成功");
        checkedRows.value = [];
        getList();
      }
    },
  });
};
const { columns } = generateColumns(stuEdit, stuDel);
const tableData = ref(<Page.Resp<Student>>{});
const checkedRows = ref<string[]>([]);
const loading = ref(false);
const cascaderOptions = ref<CascaderOption[]>([]);
const isEdit = ref(false);
const showFormModal = ref(false);
const showUpTableModal = ref(false);
const gradeOptions = ref<SelectOption[]>([]);
const formData = ref(<Student>{});
const notNoticeClose = ref(false);
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
const uploadConfirmData = ref<{
  uuid: string;
  successList: StuExcel[];
  failList: StuExcel[];
}>();

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

const addStudent = () => {
  isEdit.value = false;
  formData.value = <StudentUpdate>{};
  showFormModal.value = true;
};

const getList = async () => {
  loading.value = true;
  try {
    const { code, data } = await studentApi.getList(queryParams.value);
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

const importFile = async (file: File) => {
  appStore.mainAppLoading = true;
  const formData = new FormData();
  formData.append("file", file);

  try {
    const { code, data } = await studentApi.upload(formData);
    if (code !== 1) return;
    data.successList.forEach((item: any) => {
      item.isSuccess = true;
    });
    data.failList.forEach((item: any) => {
      item.isSuccess = false;
    });
    uploadConfirmData.value = data;
    showUpTableModal.value = true;
  } catch (error) {
    console.error(error);
  } finally {
    // 清空upload组件的文件列表
    contextHeaderRef.value.clearFileList();
    appStore.mainAppLoading = false;
  }
};

const exportByQuery = () => {
  if (!tableData.value.records.length) {
    window.$message.warning("所选条件下没有数据，无法导出");
    return;
  }
  window.$dialog.info({
    title: "提示",
    content: "确认导出所选条件下的学生信息吗？",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: () => {
      studentApi.exportByQuery(queryParams.value);
    },
  });
};

const confirmClose = (value: boolean) => {
  if (!value && !notNoticeClose.value) {
    notNoticeClose.value = false;
    window.$dialog.warning({
      title: "警告",
      content: `确定删除退出吗？退出后不可再操作此页面`,
      positiveText: "确定",
      negativeText: "取消",
      onPositiveClick: async () => {
        showUpTableModal.value = false;
        getList();
      },
    });
  }
};

onMounted(async () => {
  getList();
  getGrade();
  cascaderOptions.value = await getCascaderRoot();
});
</script>

<style lang="scss" scoped></style>
