<template>
  <div>
    <div class="w-full">
      <n-spin :show="loading">
        <div class="header w-full">
          <ContextHeader
            @add="addAdmin"
            @remove="delBatch"
            @search="getList"
          ></ContextHeader>
          <div class="flex flex-wrap">
            <div class="my-5">
              姓名<n-input
                v-model:value="queryParams.name"
                @blur="getList"
                type="text"
                class="mx-20 w-300!"
              />
            </div>
            <div class="my-5">
              账号<n-input
                v-model:value="queryParams.account"
                @blur="getList"
                type="text"
                class="ml-20 w-300!"
              />
            </div>
          </div>
        </div>
        <div class="w-full mt-20">
          <n-data-table
            :single-line="false"
            :scroll-x="1200"
            :columns="columns"
            :data="tableData?.records"
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
      :title="isEdit ? '修改管理员信息' : '添加管理员信息'"
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
import { ref, onMounted } from "vue";
import ContextHeader from "@/components/common/ContextHeader.vue";
import { generateColumns, pageSizes } from "./common";
import userApi from "@/api/userApi";
import Form from "./Form.vue";

const adminEdit = (row: Admin) => {
  formData.value = row;
  isEdit.value = true;
  showModal.value = true;
};
const adminDel = (row: Admin) => {
  window.$dialog.warning({
    title: "警告",
    content: `确定删除 【${row.name}】 的信息吗`,
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      const { code } = await userApi.remove([<string>row.id]);
      if (code === 1) {
        window.$message.success("删除成功");
        checkedRows.value = checkedRows.value.filter((item) => item != row.id);
        getList();
      }
    },
  });
};
const { columns } = generateColumns(adminEdit, adminDel);

const tableData = ref(<Page.Resp<Admin>>{});
const checkedRows = ref<string[]>([]);
const showModal = ref(false);
const formData = ref(<Admin>{});
const isEdit = ref(false);
const loading = ref(false);
const queryParams = ref({
  page: 1,
  pageSize: 10,
  account: "",
  name: "",
});

const addAdmin = () => {
  formData.value = <Admin>{};
  isEdit.value = false;
  showModal.value = true;
};
const delBatch = () => {
  if (checkedRows.value.length === 0) {
    window.$message.warning("请选择管理员信息");
    return;
  }
  window.$dialog.warning({
    title: "警告",
    content: `确定删除所选的 ${checkedRows.value.length}条 管理员信息吗`,
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      const { code } = await userApi.remove(checkedRows.value);
      if (code === 1) {
        window.$message.success("删除成功");
        checkedRows.value = [];
        getList();
      }
    },
  });
};

const getList = async () => {
  loading.value = true;
  try {
    const { code, data } = await userApi.getAdminPage(queryParams.value);
    if (code !== 1) return;
    tableData.value = data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getList();
});
</script>

<style lang="scss"></style>
