<template>
  <div>
    <div class="w-full">
      <n-spin :show="loading">
        <div class="header w-full">
          <ContextHeader
            :search="false"
            @add="addCode"
            @remove="delCodes"
          ></ContextHeader>
        </div>
        <div class="flex flex-wrap">
          <div class="my-5 f-c-c">
            码表类型<n-select
              v-model:value="codeQueryInfo.type"
              @update:value="loadCodeList"
              :options="options"
              class="ml-20 w-300!"
            />
          </div>
        </div>
        <div class="table w-full mt-20">
          <n-data-table
            :single-line="false"
            :columns="columns"
            :data="tableData"
            :row-key="(row: Code) => row.id"
            v-model:checked-row-keys="checkedRows"
          />
          <!-- @update:checked-row-keys="(rowkeys: string[]) => checkedRows = rowkeys" -->
          <div class="w-full flex justify-end">
            <n-pagination
              class="mt-20"
              v-model:page="codeQueryInfo.page"
              v-model:page-size="codeQueryInfo.pageSize"
              :item-count="total"
              show-size-picker
              show-quick-jumper
              :page-sizes="pageSizes"
              @update:page="loadCodeList"
              @update:page-size="loadCodeList"
            >
            </n-pagination>
          </div>
        </div>
      </n-spin>
    </div>

    <n-modal
      class="w-520 p-10"
      :title="isEdit ? '修改码表信息' : '添加码表信息'"
      v-model:show="showModal"
      preset="card"
      size="huge"
    >
      <Form
        :formData="formData"
        :isEdit="isEdit"
        :options="options"
        @close="showModal = false"
        @reloadList="loadCodeList"
      ></Form>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import codeApi from "@/api/codeApi";
import { generateColumns, pageSizes } from "./common";
import Form from "./Form.vue";
import { isEmpty } from "@/utils";

const showModal = ref<boolean>(false);
const tableData = ref<Code[]>();
const formData = ref(<CodeAdd>{});
const isEdit = ref<boolean>(false);
const checkedRows = ref<string[]>([]);
const total = ref<number>();
const loading = ref(false);

const codeQueryInfo = ref(<CodeQueryInfo>{
  page: 1,
  pageSize: 10,
  type: "",
});

const options = ref<CodeType[]>();

const getCodeType = async () => {
  let { code, data } = await codeApi.getCodeType();
  if (code === 1) {
    data = [{ name: "全部", type: "" }, ...data];
    options.value = data.map((item) => {
      return {
        label: item.name,
        value: item.type,
      };
    });
  }
};

const editCode = (row: Code) => {
  formData.value = <CodeAdd>row;
  isEdit.value = true;
  showModal.value = true;
};

const delCode = (row: Code) => {
  if (isEmpty(row)) return;
  window.$dialog.warning({
    title: "警告",
    content: `确定删除 【${row.name}】 的信息吗`,
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      const { code } = await codeApi.removeBatch([<string>row.id]);
      if (code === 1) {
        window.$message.success("删除成功");
        checkedRows.value = checkedRows.value.filter((item) => item != row.id);
        loadCodeList();
      }
    },
  });
};

const { columns } = generateColumns(editCode, delCode);

const addCode = () => {
  formData.value = <CodeAdd>{};
  isEdit.value = false;
  showModal.value = true;
};

const delCodes = () => {
  if (checkedRows.value.length === 0) return;

  window.$dialog.warning({
    title: "警告",
    content: `确定删除所选的 ${checkedRows.value.length}条 码表信息吗`,
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      const { code } = await codeApi.removeBatch(checkedRows.value);
      if (code === 1) {
        window.$message.success("删除成功");
        checkedRows.value = [];
        loadCodeList();
      }
    },
  });
};

const loadCodeList = async () => {
  loading.value = true;
  const { code, data } = await codeApi.getList(codeQueryInfo.value);
  if (code === 1) {
    tableData.value = data.records;
    total.value = data.total;
  }
  loading.value = false;
};

onMounted(() => {
  getCodeType();
  loadCodeList();
});
</script>

<style lang="scss" scoped></style>
./common
