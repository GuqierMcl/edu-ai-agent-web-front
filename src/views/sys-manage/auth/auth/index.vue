<template>
  <div>
    <div class="w-full">
      <n-spin :show="loading">
        <div class="header w-full">
          <ContextHeader
            @search="loadTeacherList"
            :add="false"
            :remove="false"
          ></ContextHeader>
        </div>
        <div class="flex flex-wrap">
          <div class="my-5 f-c-c">
            账号<n-input
              v-model:value="authQueryInfo.account"
              @blur="loadTeacherList"
              class="ml-20 w-300! mr-20"
            />
          </div>
          <div class="my-5 f-c-c">
            姓名<n-input
              v-model:value="authQueryInfo.name"
              @blur="loadTeacherList"
              class="ml-20 w-300! mr-20"
            />
          </div>
        </div>

        <div class="w-full mt-20">
          <n-data-table
            :single-line="false"
            :scroll-x="1200"
            :columns="columns"
            :data="tableData"
            :row-key="(row: Teacher) => row.id"
            @update:checked-row-keys="(rowkeys: string[]) => checkedRows = rowkeys"
          />
        </div>
        <div class="w-full flex justify-end">
          <n-pagination
            class="mt-20"
            v-model:page="authQueryInfo.page"
            v-model:page-size="authQueryInfo.pageSize"
            :item-count="total"
            show-size-picker
            show-quick-jumper
            :page-sizes="pageSizes"
            @update:page="loadTeacherList"
            @update:page-size="loadTeacherList"
          >
          </n-pagination>
        </div>
      </n-spin>
    </div>

    <n-modal
      class="w-520 p-10"
      :title="modalTitle"
      v-model:show="showModal"
      preset="card"
      size="huge"
    >
      <Transfer
        :formData="formData"
        :isEdit="isEdit"
        :options="options"
        @close="showModal = false"
        @reloadList="loadTeacherList"
      ></Transfer>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import authApi from "@/api/authApi";
import { generateColumns, pageSizes } from "./common.js";
import Transfer from "./Transfer.vue";

const showModal = ref<boolean>(false);
const modalTitle = ref("编辑教师角色");
const tableData = ref<RoleTeacher[]>();
const formData = ref(<RoleTeacher>{});
const isEdit = ref<boolean>(false);
const checkedRows = ref<string[]>([]);
const loading = ref(false);
const total = ref<number>();
const options = ref<Role[]>();

const authQueryInfo = ref(<AuthQueryInfo>{
  page: 1,
  pageSize: 10,
  name: "",
  account: "",
});

const editTeacher = (row: RoleTeacher) => {
  modalTitle.value = "编辑教师角色信息";
  formData.value = <RoleTeacher>row;
  isEdit.value = true;
  showModal.value = true;
};

const { columns } = generateColumns(editTeacher);

const loadTeacherList = async () => {
  loading.value = true;
  const { code, data } = await authApi.getList(authQueryInfo.value);
  if (code === 1) {
    tableData.value = data.records;
    total.value = data.total;
  }
  loading.value = false;
};

const getAllRoles = async () => {
  let { code, data } = await authApi.getAllRoles();
  if (code === 1) {
    options.value = data.map((item) => {
      return {
        value: item.id,
        label: item.roleName,
      };
    });
  }
};

onMounted(() => {
  loadTeacherList();
  getAllRoles();
});
</script>

<style lang="scss" scoped></style>
./common
