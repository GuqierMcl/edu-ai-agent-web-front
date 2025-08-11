<template>
  <div>
    <div class="w-full">
      <n-spin :show="loading">
        <div class="header w-full">
          <ContextHeader
            :remove="false"
            :search="false"
            @add="
              () => {
                formData = <CourseUpdate>{};
                showModal = true;
                isEdit = false;
              }
            "
          ></ContextHeader>
        </div>
        <div class="w-full mt-20">
          <n-data-table
            :single-line="false"
            :columns="columns"
            :data="tableData"
          />
        </div>
      </n-spin>
    </div>

    <n-modal
      class="w-520 p-10"
      :title="isEdit ? '修改课程信息' : '添加课程信息'"
      v-model:show="showModal"
      preset="card"
      size="huge"
    >
      <Form
        :is-edit="isEdit"
        :formData="formData"
        @close="showModal = false"
        @reloadList="getList"
      ></Form>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import Form from "./Form.vue";
import { generateColumns } from "./common";
import courseApi from "@/api/courseApi";

const singleEdit = (row: Course) => {
  isEdit.value = true;
  formData.value = <CourseUpdate>row;
  showModal.value = true;
};

const singleDel = (row: Course) => {
  window.$dialog.error({
    title: "警告",
    content: `确定删除 【${row.name}】 的信息吗？相关书籍、题目也会一同删除`,
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      const { code } = await courseApi.delCourse(<string>row.id);
      if (code === 1) {
        window.$message.success("删除成功");
        getList();
      }
    },
  });
};

const { columns } = generateColumns(singleEdit, singleDel);

const tableData = ref<Course[]>([]);
const formData = ref(<CourseUpdate>{});
const showModal = ref(false);
const loading = ref(false);
const isEdit = ref(false);

const getList = async () => {
  loading.value = true;
  try {
    const { code, data } = await courseApi.getCourseList();
    if (code !== 1) return;
    tableData.value = data;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getList();
});
</script>

<style lang="scss" scoped></style>
