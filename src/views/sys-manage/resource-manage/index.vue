<template>
    <div>
        <div class="w-full">
            <n-spin :show="loading">
                <div class="header w-full">
                    <ContextHeader
                        @search="loadResourceList"
                        @add="addResource"
                        @remove="delResources"
                    ></ContextHeader>
                </div>
                <div class="flex flex-wrap">
                    <div class="my-5 f-c-c">
                        资源名称<n-input
                            v-model:value="resourceQueryInfo.name"
                            @blur="loadResourceList"
                            class="ml-20 w-300! mr-20"
                        />
                    </div>
                    <div class="my-5 f-c-c">
                        资源类型<n-select
                            v-model:value="resourceQueryInfo.type"
                            @update:value="loadResourceList"
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
                        :row-key="(row: Resource) => row.id"
                        v-model:checked-row-keys="checkedRows"
                    />
                    <!-- @update:checked-row-keys="(rowkeys: string[]) => checkedRows = rowkeys" -->
                    <div class="w-full flex justify-end">
                        <n-pagination
                            class="mt-20"
                            v-model:page="resourceQueryInfo.page"
                            v-model:page-size="resourceQueryInfo.pageSize"
                            :item-count="total"
                            show-size-picker
                            show-quick-jumper
                            :page-sizes="pageSizes"
                            @update:page="loadResourceList"
                            @update:page-size="loadResourceList"
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
                    :formData="<ResourceAdd>formData"
                    :isEdit="isEdit"
                    @close="showModal = false"
                    @reloadList="loadResourceList"
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
                        <n-select
                            v-model:value="formData.type"
                            :options="options"
                        />
                    </n-form-item>
                    <n-form-item label="资源">
                        <n-upload
                            ref="uploadRef"
                            v-model:file-list="formData.file"
                            multiple
                            :default-upload="false"
                            list-type="Resource"
                            accept="Resource/*"
                        >
                            <n-button>上传文件</n-button>
                        </n-upload>
                    </n-form-item>
                </n-form>
                <div class="w-full flex justify-end">
                    <n-button @click="showImportModal = false">取消</n-button>
                    <n-button ml-20 type="primary" @click="batchImport"
                        >保存</n-button
                    >
                </div>
            </n-spin>
        </n-modal>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import resourceApi from "@/api/resourceApi";
import Form from "./Form.vue";
import type { FormInst, SelectOption } from "naive-ui";
import { generateColumns, batchRules, pageSizes } from "./common";
import { isEmpty } from "@/utils";

const showModal = ref<boolean>(false);
const showImportModal = ref<boolean>(false);
const modalTitle = ref("批量上传资源");
const tableData = ref<Resource[]>();
const formData = ref(<Resource>{});
const isEdit = ref<boolean>(false);
const checkedRows = ref<string[]>([]);
const total = ref<number>();
const formRef = ref<FormInst>();
const loading = ref(false);
const importLoading = ref(false);
const uploadRef = ref();
const resourceQueryInfo = ref(<ResourceQueryInfo>{
    page: 1,
    pageSize: 10,
    type: "",
    name: "",
});

const options = ref<SelectOption[]>([]);

const getResourceType = async () => {
    console.log(options.value);

    options.value = await resourceApi.getResourceType();
    console.log(options.value);
};

const editResource = (row: Resource) => {
    modalTitle.value = "修改资源信息";
    formData.value = <Resource>row;
    isEdit.value = true;
    showModal.value = true;
};

const delResource = (row: Resource) => {
    if (isEmpty(row)) return;
    window.$dialog.warning({
        title: "警告",
        content: `确定删除 【${row.name}】 的信息吗`,
        positiveText: "确定",
        negativeText: "取消",
        onPositiveClick: async () => {
            const { code } = await resourceApi.removeBatch([<string>row.id]);
            if (code === 1) {
                window.$message.success("删除成功");
                checkedRows.value = checkedRows.value.filter(
                    (item) => item != row.id
                );
                loadResourceList();
            }
        },
    });
};

const { columns } = generateColumns(editResource, delResource, options.value);

const addResource = () => {
    modalTitle.value = "添加资源(单个)";
    formData.value = <ResourceAdd>{};
    isEdit.value = false;
    showModal.value = true;
};

const delResources = () => {
    if (checkedRows.value.length === 0) return;

    window.$dialog.warning({
        title: "警告",
        content: `确定删除所选的 ${checkedRows.value.length}张 资源吗`,
        positiveText: "确定",
        negativeText: "取消",
        onPositiveClick: async () => {
            const { code } = await resourceApi.removeBatch(checkedRows.value);
            if (code === 1) {
                window.$message.success("删除成功");
                checkedRows.value = [];
                loadResourceList();
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
                formDataReq.append(
                    "name",
                    // @ts-ignore
                    formData.value.file[i].name.split(".")[0]
                );
                formDataReq.append("type", <string>formData.value.type);
                formDataReq.append("sequence", "1");
                // @ts-ignore
                formDataReq.append("file", formData.value.file[i].file);
            }
            const { code } = await resourceApi.add(formDataReq);
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
    loadResourceList();
};

const loadResourceList = async () => {
    checkedRows.value = [];
    loading.value = true;
    const { code, data } = await resourceApi.getList(resourceQueryInfo.value);
    if (code === 1) {
        tableData.value = data.records;
        total.value = data.total;
    }
    loading.value = false;
};

onMounted(() => {
    getResourceType();
    loadResourceList();
});
</script>

<style lang="scss" scoped></style>
./common
