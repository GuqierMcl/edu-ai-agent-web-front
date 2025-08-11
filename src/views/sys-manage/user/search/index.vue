<template>
  <div class="w-full">
    <n-spin :show="loading">
      <div class="header w-full">
        <ContextHeader
          @search="getList"
          :remove="false"
          :add="false"
        ></ContextHeader>
        <div class="flex flex-wrap">
          <div class="my-5 f-c-c">
            类型<n-select
              v-model:value="queryParams.type"
              @update:value="getList"
              :options="options"
              class="mx-20 w-300!"
            />
          </div>
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
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import ContextHeader from "@/components/common/ContextHeader.vue";
import { generateColumns, pageSizes, options } from "./common";
import userApi from "@/api/userApi";

const resetPassword = async (row: Admin) => {
  window.$dialog.warning({
    title: "警告",
    content: `确定重置的【${row.name}】的密码吗?`,
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      const { code, data } = await userApi.resetPassword(row.id);
      if (code == 1) {
        window.$message.success(`【${row.name}】重置密码为【${data}】`);
      }
    },
  });
};

const { columns } = generateColumns(resetPassword);

const tableData = ref(<Page.Resp<Admin>>{});
const checkedRows = ref<string[]>([]);
const loading = ref(false);
const queryParams = ref({
  page: 1,
  pageSize: 10,
  account: "",
  name: "",
  type: "",
});

const getList = async () => {
  loading.value = true;
  try {
    const { code, data } = await userApi.getUers(queryParams.value);
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

<style lang="scss" scoped></style>
