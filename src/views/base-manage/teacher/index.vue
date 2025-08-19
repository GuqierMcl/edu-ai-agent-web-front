<template>
  <div>
    <div class="w-full">
      <n-spin :show="loading">
        <div class="header w-full">
          <ContextHeader
            :search="false"
            @add="addTeacher"
            @remove="delTeachers"
          ></ContextHeader>
        </div>
        <div class="w-full mt-20">
          <n-data-table
            :single-line="false"
            :scroll-x="1200"
            :columns="columns"
            :data="tableData"
            :row-key="(row: Teacher) => row.id"
            v-model:checked-row-keys="checkedRows"
          />
        </div>
      </n-spin>
    </div>

    <n-modal
      class="w-520 p-10"
      :title="isEdit ? '修改教师信息' : '添加教师信息'"
      v-model:show="showModal"
      preset="card"
      size="huge"
    >
      <Form
        :formData="formData"
        :isEdit="isEdit"
        @close="showModal = false"
        @reloadList="loadTeacherList"
      ></Form>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import teacherApi from "@/api/teacherApi";
import { generateColumns } from "./common";
import Form from "./Form.vue";
import { isEmpty } from "@/utils";

const showModal = ref<boolean>(false);
const tableData = ref<Teacher[]>();
const formData = ref(<TeacherAdd>{});
const isEdit = ref<boolean>(false);
const checkedRows = ref<string[]>([]);
const loading = ref(false);

const editTeacher = (row: Teacher) => {
  formData.value = <TeacherAdd>row;
  isEdit.value = true;
  showModal.value = true;
};
const delTeacher = (row: Teacher) => {
  if (isEmpty(row)) return;
  window.$dialog.warning({
    title: "警告",
    content: `确定删除 【${row.name}】 的信息吗`,
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      const { code } = await teacherApi.remove(<string>row.id);
      if (code === 1) {
        window.$message.success("删除成功");
        checkedRows.value = checkedRows.value.filter((item) => item != row.id);
        loadTeacherList();
      }
    },
  });
};
const { columns } = generateColumns(editTeacher, delTeacher);

const addTeacher = () => {
  formData.value = <TeacherAdd>{};
  isEdit.value = false;
  showModal.value = true;
};

const delTeachers = () => {
  if (checkedRows.value.length === 0) {
    window.$message.warning("请选择教师信息");
    return;
  }

  window.$dialog.warning({
    title: "警告",
    content: `确定删除所选的 ${checkedRows.value.length}条 教师信息吗`,
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      const { code } = await teacherApi.removeBatch(checkedRows.value);
      if (code === 1) {
        window.$message.success("删除成功");
        checkedRows.value = [];
        loadTeacherList();
      }
    },
  });
};

const loadTeacherList = async () => {
  loading.value = true;
  const { code, data } = await teacherApi.getList();
  if (code === 1) {
    tableData.value = data;
  }
  loading.value = false;
};

onMounted(() => {
  loadTeacherList();
});
</script>

<style lang="scss" scoped></style>
