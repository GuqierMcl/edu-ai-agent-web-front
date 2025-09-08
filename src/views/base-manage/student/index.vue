<template>
    <div>
        <div class="w-full">
            <n-spin :show="loading">
                <div class="header w-full">
                    <ContextHeader
                        ref="contextHeaderRef"
                        @search="getList"
                        @add="addStudent"
                        @remove="delBatch"
                    ></ContextHeader>
                    <div class="flex flex-wrap">
                        <!-- 固定的下拉选择框 -->
                        <div class="my-5 mr-20 f-c-c">
                            性别
                            <n-select
                                class="ml-10 w-100!"
                                v-model:value="queryParams.gender"
                                :options="genderOptions"
                                placeholder="请选择性别"
                                @update:value="getList"
                            />
                        </div>
                        <div class="my-5 mr-20 f-c-c">
                            身份
                            <n-select
                                class="ml-10 w-120!"
                                v-model:value="queryParams.identity"
                                :options="identityOptions"
                                placeholder="请选择身份"
                                @update:value="getList"
                            />
                        </div>
                        <div class="my-5 mr-20 f-c-c">
                            状态
                            <n-select
                                class="ml-10 w-100!"
                                v-model:value="queryParams.status"
                                :options="statusOptions"
                                placeholder="请选择状态"
                                @update:value="getList"
                            />
                        </div>
                        
                        <!-- 动态检索条件 -->
                        <div
                            class="my-5 mr-20 f-c-c"
                            v-for="field in activeFilters"
                            :key="field"
                        >
                            {{ FIELD_LABELS[field] ?? field }}
                            <n-input
                                class="ml-10 w-300!"
                                :value="getFieldValue(field)"
                                @update:value="(v:any)=>onFieldChange(field, v)"
                                :placeholder="'请输入' + (FIELD_LABELS[field] ?? field)"
                                @blur="getList"
                            />
                            <n-button class="ml-10" text type="error" @click="removeFilter(field)">
                                移除
                            </n-button>
                        </div>
                        <n-select
                            class="my-5 w-100!"
                            v-model:value="addFieldKey"
                            :options="remainingFieldOptions"
                            placeholder="添加条件"
                            @update:value="onAddField"
                        />
                    </div>
                </div>
                <div class="w-full mt-20">
                    <n-data-table
                        size="small"
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
                :identity-options="identityOptions"
                :status-options="statusOptions"
                @close="showFormModal = false"
                @reloadList="getList"
            ></Form>
        </n-modal>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from "vue";
import type { SelectOption } from "naive-ui";
import { generateColumns, pageSizes } from "./common";
import studentApi from "@/api/studentApi";
import Form from "./Form.vue";
import optionsApi from "@/api/optionsApi";

const stuEdit = (row: Student) => {
  formData.value = row;
  isEdit.value = true;
  showFormModal.value = true;
};
const stuDel = (row: Student) => {
  window.$dialog.warning({
    title: "警告",
    content: `确定删除 【${row.user.name}】 的信息吗`,
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
const isEdit = ref(false);
const showFormModal = ref(false);
type QueryParamsType = {
  page: number;
  pageSize: number;
  account: string;
  email: string;
  gender: string;
  identity: string;
  name: string;
  phone: string;
  remark: string;
  school_no: string;
  status: string;
  student_no: string;
};

type FilterKey = Exclude<keyof QueryParamsType, "page" | "pageSize">;

const formData = ref(<Student>{});
const queryParams = ref<QueryParamsType>({
  page: 1,
  pageSize: 10,
  account: "",
  email: "",
  gender: "",
  identity: "",
  name: "",
  phone: "",
  remark: "",
  school_no: "",
  status: "",
  student_no: "",
});
const contextHeaderRef = ref();

// 动态检索：字段配置
const FIELD_LABELS: Record<string, string> = {
  account: "账号",
  email: "邮箱",
  name: "姓名",
  phone: "手机号",
  remark: "备注",
  student_no: "学号",
};

const genderOptions = ref<SelectOption[]>([
  { label: "全部", value: "" },
  { label: "男", value: "1" },
  { label: "女", value: "0" },
]);

const identityOptions = ref<SelectOption[]>([
  { label: "学生", value: "1" },
  { label: "教师", value: "0" },
]);

const statusOptions = ref<SelectOption[]>([
  { label: "正常", value: "1" },
  { label: "停用", value: "0" },
]);

const activeFilters = ref<FilterKey[]>([]);
const addFieldKey = ref<FilterKey | null>(null);
const allFilterKeys = computed<FilterKey[]>(() =>
  (Object.keys(queryParams.value).filter((k) => 
    k !== "page" && 
    k !== "pageSize" && 
    k !== "gender" && 
    k !== "identity" && 
    k !== "status"
  ) as FilterKey[])
);
const remainingFieldOptions = computed<SelectOption[]>(() => {
  return allFilterKeys.value
    .filter((k) => !activeFilters.value.includes(k))
    .map((k) => ({ label: FIELD_LABELS[k] ?? k, value: k }));
});

const onAddField = (field: FilterKey | null) => {
  if (!field) return;
  if (!activeFilters.value.includes(field)) {
    activeFilters.value.push(field);
  }
  addFieldKey.value = null;
};

const removeFilter = (field: FilterKey) => {
  queryParams.value[field] = "";
  activeFilters.value = activeFilters.value.filter((f) => f !== field);
  getList();
};

const getFieldValue = (field: FilterKey): string => {
  return queryParams.value[field] ?? "";
};

const onFieldChange = (field: FilterKey, value: string) => {
  queryParams.value[field] = value ?? "";
};

const addStudent = () => {
  isEdit.value = false;
  formData.value = <Student>{};
  showFormModal.value = true;
};

const getIdentityOptions = async () => {
  const { code, data } = await optionsApi.getOptions("student_identity");
  if (code === 1) {
    identityOptions.value = [{ label: "全部", value: "" }, ...data];
  }
}
const getStatusOptions = async () => {
  const { code, data } = await optionsApi.getOptions("student_status");
  if (code === 1) {
    statusOptions.value = [{ label: "全部", value: "" }, ...data];
  }
}

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

onMounted(async () => {
  getIdentityOptions();
  getStatusOptions();
  getList();
});
</script>

<style lang="scss" scoped></style>
