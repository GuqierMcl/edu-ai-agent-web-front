<template>
    <div>
        <div class="w-full">
            <n-spin :show="loading">
                <div class="header w-full">
                    <ContextHeader
                        ref="contextHeaderRef"
                        @search="getList"
                        @add="showFormModal(false, {})"
                        @remove="delBatch"
                        :search="false"
                    ></ContextHeader>
                </div>
                <div class="w-full mt-20">
                    <n-data-table
                        size="small"
                        :single-line="false"
                        virtual-scroll-x
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
    </div>
    <n-modal
        v-model:show="showTransfer"
        preset="card"
        class="w-800 p-10"
        title="编辑角色权限"
    >
        <Transfer :role="currRole" @close="showTransfer = false" />
    </n-modal>
    <n-modal
        v-model:show="showForm"
        preset="card"
        class="w-520 p-10"
        :title="formTitle"
    >
        <Form
            :formData="currRole"
            :isEdit="isEditRef"
            @close="showForm = false"
            @reloadList="getList"
        />
    </n-modal>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import roleApi from "@/api/roleApi";
import { generateColumns, pageSizes } from "./common";
import Transfer from "./Transfer.vue";
import Form from "./Form.vue";

const loading = ref(false);
const showTransfer = ref(false);
const showForm = ref(false);
const isEditRef = ref(false);

const tableData = ref(<Page.Resp<RoleList>>{});
const queryParams = ref<RoleQueryInfo>({
    page: 1,
    pageSize: 10,
});
const checkedRows = ref<string[]>([]);
const currRole = ref<RoleList>({});

const editPermission = (row: RoleList) => {
    currRole.value = row;
    showTransfer.value = true;
};

const formTitle = ref("添加角色");
const showFormModal = (isEdit: boolean, row: RoleList) => {
    if (isEdit) {
        isEditRef.value = true;
        formTitle.value = "编辑角色";
        currRole.value = row;
    } else {
        isEditRef.value = false;
        formTitle.value = "添加角色";
    }
    showForm.value = true;
};

const delRole = (row: RoleList) => {
    window.$dialog.warning({
        title: "警告",
        content: `确定删除 【${row.role_name}】 的信息吗`,
        positiveText: "确定",
        negativeText: "取消",
        onPositiveClick: async () => {
            const { code } = await roleApi.deleteRole([<string>row.id]);
            if (code === 1) {
                window.$message.success("删除成功");
                checkedRows.value = checkedRows.value.filter(
                    (item) => item != row.id
                );
                getList();
            }
        },
    });
};
const delBatch = () => {
    if (checkedRows.value.length === 0) {
        window.$message.warning("请选择角色");
        return;
    }
    window.$dialog.warning({
        title: "警告",
        content: `确定删除所选的 ${checkedRows.value.length}条 角色吗`,
        positiveText: "确定",
        negativeText: "取消",
        onPositiveClick: async () => {
            const { code } = await roleApi.deleteRole(checkedRows.value);
            if (code === 1) {
                window.$message.success("删除成功");
                checkedRows.value = [];
                getList();
            }
        },
    });
};

const { columns } = generateColumns(editPermission, showFormModal, delRole);

const getList = async () => {
    loading.value = true;
    try {
        const { code, data } = await roleApi.getRoleList(queryParams.value);
        if (code !== 1) return;
        tableData.value = data;
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
};

onMounted(async () => {
    getList();
});
</script>

<style lang="scss" scoped></style>
