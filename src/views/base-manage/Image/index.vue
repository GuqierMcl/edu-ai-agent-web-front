<template>
  <div>
    <div class="w-full">
      <n-spin :show="loading">
        <div class="header w-full">
          <ContextHeader
            @search="loadImageList"
            @add="addImage"
            @remove="delImages"
            batchImport
            @batchImport="showImportModal = true"
          ></ContextHeader>
        </div>
        <div class="flex flex-wrap">
          <div class="my-5 f-c-c">
            图片名称<n-input
              v-model:value="imageQueryInfo.name"
              @blur="loadImageList"
              class="ml-20 w-300! mr-20"
            />
          </div>
          <div class="my-5 f-c-c">
            图片类型<n-select
              v-model:value="imageQueryInfo.type"
              @update:value="loadImageList"
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
            :row-key="(row: Image) => row.id"
            v-model:checked-row-keys="checkedRows"
          />
          <!-- @update:checked-row-keys="(rowkeys: string[]) => checkedRows = rowkeys" -->
          <div class="w-full flex justify-end">
            <n-pagination
              class="mt-20"
              v-model:page="imageQueryInfo.page"
              v-model:page-size="imageQueryInfo.pageSize"
              :item-count="total"
              show-size-picker
              show-quick-jumper
              :page-sizes="pageSizes"
              @update:page="loadImageList"
              @update:page-size="loadImageList"
            >
            </n-pagination>
          </div>
        </div>
      </n-spin>

      <n-modal
        class="w-520 p-10"
        :title="modalTitle"
        v-model:show="showModal"
        preset="card"
        size="huge"
      >
        <Form
          :formData="<ImageAdd>formData"
          :isEdit="isEdit"
          @close="showModal = false"
          @reloadList="loadImageList"
        ></Form>
      </n-modal>
    </div>

    <n-modal
      class="w-800 p-10"
      :title="modalTitle"
      v-model:show="showImportModal"
      preset="card"
      size="huge"
    >
      <n-spin :show="importLoading">
        <n-form
          ref="formRef"
          :model="formData"
          :rules="batchRules"
          label-placement="left"
          label-width="auto"
          require-mark-placement="right-hanging"
        >
          <n-form-item label="类型" path="type">
            <n-select v-model:value="formData.type" :options="options" />
          </n-form-item>
          <n-form-item label="图片">
            <n-upload
              ref="uploadRef"
              v-model:file-list="formData.file"
              multiple
              :default-upload="false"
              list-type="image"
              accept="image/*"
            >
              <n-button>上传文件</n-button>
            </n-upload>
          </n-form-item>
        </n-form>
        <div class="w-full flex justify-end">
          <n-button @click="showImportModal = false">取消</n-button>
          <n-button ml-20 type="primary" @click="batchImport">保存</n-button>
        </div>
      </n-spin>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import imageApi from "@/api/imageApi";
import optionsApi from "@/api/optionsApi";
import Form from "./Form.vue";
import type { FormInst, SelectOption } from "naive-ui";
import { generateColumns, batchRules, pageSizes } from "./common";
import { isEmpty } from "@/utils";

const showModal = ref<boolean>(false);
const showImportModal = ref<boolean>(false);
const modalTitle = ref("批量上传图片");
const tableData = ref<Image[]>();
const formData = ref(<Image>{});
const isEdit = ref<boolean>(false);
const checkedRows = ref<string[]>([]);
const total = ref<number>();
const formRef = ref<FormInst>();
const loading = ref(false);
const importLoading = ref(false);
const uploadRef = ref();
const imageQueryInfo = ref(<ImageQueryInfo>{
  page: 1,
  pageSize: 10,
  type: "",
  name: "",
});

const options = ref<SelectOption[]>([]);

const getImageType = async () => {
  console.log(options.value);

  options.value = await optionsApi.getImageTypeOptions();
  console.log(options.value);
};

const editImage = (row: Image) => {
  modalTitle.value = "修改图片信息";
  formData.value = <Image>row;
  isEdit.value = true;
  showModal.value = true;
};

const delImage = (row: Image) => {
  if (isEmpty(row)) return;
  window.$dialog.warning({
    title: "警告",
    content: `确定删除 【${row.name}】 的信息吗`,
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      const { code } = await imageApi.removeBatch([<string>row.id]);
      if (code === 1) {
        window.$message.success("删除成功");
        checkedRows.value = checkedRows.value.filter((item) => item != row.id);
        loadImageList();
      }
    },
  });
};

const { columns } = generateColumns(editImage, delImage);

const addImage = () => {
  modalTitle.value = "添加图片(单张)";
  formData.value = <ImageAdd>{};
  isEdit.value = false;
  showModal.value = true;
};

const delImages = () => {
  if (checkedRows.value.length === 0) return;

  window.$dialog.warning({
    title: "警告",
    content: `确定删除所选的 ${checkedRows.value.length}张 图片吗`,
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      const { code } = await imageApi.removeBatch(checkedRows.value);
      if (code === 1) {
        window.$message.success("删除成功");
        checkedRows.value = [];
        loadImageList();
      }
    },
  });
};

const batchImport = () => {
  formRef.value?.validate(async (errors) => {
    importLoading.value = true;
    if (!errors) {
      let resCode: number;
      const formDataReq = new FormData();
      // @ts-ignore
      for (let i = 0; i < formData.value.file?.length; i++) {
        // @ts-ignore
        formDataReq.append("name", formData.value.file[i].name.split(".")[0]);
        formDataReq.append("type", <string>formData.value.type);
        formDataReq.append("sequence", "1");
        // @ts-ignore
        formDataReq.append("file", formData.value.file[i].file);
      }
      const { code } = await imageApi.add(formDataReq);
      resCode = code;
      if (resCode === 1) {
        window.$message.success("上传成功");
        showImportModal.value = false;
        uploadRef.value.clear();
      }
    } else {
      console.log(errors);
      window.$message.error("请完善信息");
    }
    importLoading.value = false;
  });
  loadImageList();
};

const loadImageList = async () => {
  checkedRows.value = [];
  loading.value = true;
  const { code, data } = await imageApi.getList(imageQueryInfo.value);
  if (code === 1) {
    tableData.value = data.records;
    total.value = data.total;
  }
  loading.value = false;
};

onMounted(() => {
  getImageType();
  loadImageList();
});
</script>

<style lang="scss" scoped></style>
./common
