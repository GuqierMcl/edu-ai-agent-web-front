<template>
  <div>
    <div class="w-full">
      <n-spin :show="loading">
        <div class="header w-full">
          <ContextHeader
            :search="false"
            @add="()=>{
              RoleAddQueryInfo = <RoleAdd>{};
              showFormModal = true;
            }"
            :remove="false"
          ></ContextHeader>
        </div>
        <div class="w-full mt-20">
          <n-data-table
            :single-line="false"
            :scroll-x="1200"
            :columns="columns"
            :data="tableData"
            :row-key="(row: PermissionRoleList) => row.id"
            @update:checked-row-keys="(rowkeys: string[]) => checkedRows = rowkeys"
          />
        </div>
        <div class="w-full flex justify-end">
          <n-pagination
            class="mt-20"
            v-model:page="RoleQueryInfo.page"
            v-model:page-size="RoleQueryInfo.pageSize"
            :item-count="total"
            show-size-picker
            show-quick-jumper
            :page-sizes="pageSizes"
            @update:page="loadRoleList"
            @update:page-size="loadRoleList"
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
        ref="transferRef"
        :formData="formData"
        :isEdit="isEdit"
        :options="options"
        @close="showModal = false"
        @reloadList="loadRoleList"
      ></Transfer>
    </n-modal>

    <n-modal
      class="w-520 p-10"
      title="添加角色"
      v-model:show="showFormModal"
      preset="card"
      size="huge"
    >
      <n-form
        ref="formRef"
        :rules="rules"
        :model="RoleAddQueryInfo"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
      >
        <n-form-item label="名称" path="roleName">
          <n-input
            v-model:value="RoleAddQueryInfo.roleName"
            placeholder="请输入角色名称"
          />
        </n-form-item>
        <n-form-item label="角色码" path="roleKey">
          <n-input
            v-model:value="RoleAddQueryInfo.roleKey"
            placeholder="请输入角色码"
          />
        </n-form-item>
        <n-form-item label="描述" path="des">
          <n-input
            v-model:value="RoleAddQueryInfo.des"
            placeholder="请输入描述"
          />
        </n-form-item>
      </n-form>
      <div class="w-full flex justify-end">
        <n-button @click="showFormModal = false">取消</n-button>
        <n-button ml-20 type="primary" @click="addRole">保存</n-button>
      </div>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from "vue";
import permissionApi from "@/api/permissionApi";
import { generateColumns, pageSizes, rules } from "./common.js";
import Transfer from "./Transfer.vue";
import { FormInst } from "naive-ui";

const showModal = ref<boolean>(false);
const showFormModal = ref<boolean>(false);
const modalTitle = ref("编辑教师角色");
const tableData = ref<PermissionList[]>();
const formData = ref(<PermissionList>{});
const isEdit = ref<boolean>(false);
const checkedRows = ref<string[]>([]);
const loading = ref(false);
const total = ref<number>();
const options = ref<Permission[]>();
const transferRef = ref<any>();
const formRef = ref<FormInst>();

const RoleQueryInfo = ref(<RoleQueryInfo>{
  page: 1,
  pageSize: 10,
});

const RoleAddQueryInfo = ref(<RoleAdd>{
  roleKey: "",
  roleName: "",
  des: "",
});

const editRole = async (row: RoleList) => {
  modalTitle.value = "编辑教师角色信息";
  formData.value = <RoleList>row;
  isEdit.value = true;
  showModal.value = true;
  await nextTick();
  transferRef.value.getRolePermissionList();
};

const addRole = () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const { code } = await permissionApi.add(RoleAddQueryInfo.value);
      const resCode = code;
      if (resCode === 1) {
        window.$message.success("添加成功");
        loadRoleList();
        showFormModal.value = false;
      }
    } else {
      console.log(errors);
      window.$message.error("请完善信息");
    }
  });
};

const delRole = (row: PermissionRoleList) => {
  window.$dialog.warning({
    title: "警告",
    content: `确定删除 【${row.roleName}】 的信息吗`,
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      const { code } = await permissionApi.remove(<string>row.id);
      if (code === 1) {
        window.$message.success("删除成功");
        loadRoleList();
      }
    },
  });
};
const { columns } = generateColumns(editRole, delRole);

const loadRoleList = async () => {
  loading.value = true;
  const { code, data } = await permissionApi.getList(RoleQueryInfo.value);
  if (code === 1) {
    tableData.value = data.records;
    total.value = data.total;
  }
  loading.value = false;
};

const getAllPermissions = async () => {
  let { code, data } = await permissionApi.getPermissionList();
  if (code === 1) {
    options.value = data.map((item) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
  }
};

onMounted(() => {
  loadRoleList();
  getAllPermissions();
});
</script>

<style lang="scss" scoped></style>
./common
