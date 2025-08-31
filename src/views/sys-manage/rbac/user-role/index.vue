<template>
    <div>
        <div class="w-full">
            <n-spin :show="loading">
                <div class="header w-full">
                    <ContextHeader
                        ref="contextHeaderRef"
                        @search="getList"
                        :add="false"
                        :remove="false"
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
        title="编辑用户角色"
    >
        <Transfer :row="currUser" @close="doCloseTransfer" />
    </n-modal>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import roleApi from "@/api/roleApi";
import userApi from "@/api/userApi";
import { generateColumns, pageSizes } from "./common";
import Transfer from "./Transfer.vue";
import { get } from "http";

const loading = ref(false);
const showTransfer = ref(false);

const tableData = ref(<Page.Resp<RoleList>>{});
const queryParams = ref({
    page: 1,
    pageSize: 10,
    type: "1",
});
const checkedRows = ref<string[]>([]);
const currUser = ref<UserWithRoles>({});

const editRole = (row: UserWithRoles) => {
    currUser.value = row;
    showTransfer.value = true;
};

const { columns } = generateColumns(editRole);

const getList = async () => {
    loading.value = true;
    try {
        const { code, data } = await userApi.getUsersByType(queryParams.value);
        if (code !== 1) return;
        tableData.value = data;
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
};

const doCloseTransfer = () => {
    showTransfer.value = false;
    getList();
};

onMounted(async () => {
    getList();
});
</script>

<style lang="scss" scoped></style>
