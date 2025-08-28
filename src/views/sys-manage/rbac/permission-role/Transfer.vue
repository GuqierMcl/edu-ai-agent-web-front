<template>
    <n-spin :show="loading">
        <n-transfer
            virtual-scroll
            block-line
            checkable
            cascade
            source-title="所有权限"
            target-title="已选权限"
            v-model:value="valueRef"
            :options="options"
            :render-source-list="renderSourceList"
        />
        <n-alert title="警告" type="warning" mt-5 closable>
            修改角色权限后须用户重新登录才能生效。
        </n-alert>
        <div class="w-full flex justify-end mt-20">
            <n-button @click="emits('close')">取消</n-button>
            <n-button ml-20 type="primary" @click="save" :loading="loading"
                >保存</n-button
            >
        </div>
    </n-spin>
</template>

<script setup lang="ts">
import { h, onMounted, ref } from "vue";
import { NTree } from "naive-ui";
import type {
    TransferRenderSourceList,
    TransferRenderTargetLabel,
    TreeOption,
} from "naive-ui";
import { NTag } from "naive-ui";
import permissionApi from "@/api/permissionApi";
import { TreeRenderProps } from "naive-ui/lib/tree/src/interface";

const emits = defineEmits(["close"]);
const props = defineProps({
    role: {
        type: Object as () => RoleList,
        require: false,
        default: {},
    },
});

const loading = ref(false);

const treeData = ref<TreeOption[]>([]);
const valueRef = ref<Array<string>>([]);
const options = ref<TreeOption[]>([]);

const renderSourceList: TransferRenderSourceList = function ({ onCheck }) {
    return h(NTree, {
        style: "margin: 0 4px;",
        checkable: true,
        selectable: false,
        blockLine: true,
        cascade: true,
        checkOnClick: true,
        defaultExpandAll: true,
        data: treeData.value,
        checkedKeys: valueRef.value,
        checkStrategy: "all",
        onUpdateCheckedKeys: (checkedKeys: Array<string>) => {
            onCheck(checkedKeys);
            console.log(checkedKeys);
        },
    });
};

const renderTargetLabel: TransferRenderTargetLabel = function ({ option }) {
    return h(
        "div",
        {
            style: {
                display: "flex",
                margin: "6px 0",
            },
        },
        {
            default: () => [
                h(
                    NTag,
                    {
                        bordered: false,
                        style: { marginRight: "8px" },
                    },
                    {
                        default: () => option.label,
                    }
                ),
            ],
        }
    );
};

const toTreeOption = (list: PermissionTree[]): TreeOption[] => {
    return list.map((item) => ({
        key: item.id,
        label: item.name,
        children: item.children ? toTreeOption(item.children) : undefined,
        prefix: () =>
            h(
                NTag,
                {
                    bordered: false,
                    type:
                        item.type === "0"
                            ? "success"
                            : item.type === "1"
                            ? "info"
                            : "default",
                    round: true,
                },
                {
                    default: () => {
                        if (item.type === "0") {
                            return "页面";
                        } else if (item.type === "1") {
                            return "接口";
                        } else {
                            return "其他";
                        }
                    },
                }
            ),
    }));
};

const getTreeData = async () => {
    const { code, data } = await permissionApi.getPermissionTree();
    if (code !== 1) return;
    treeData.value = toTreeOption(data);
};

const getRoleData = async () => {
    if (!props.role?.id) return;
    const { code, data } = await permissionApi.getPermissionByRole(
        props.role.id
    );
    if (code !== 1) return;
    valueRef.value = data.map((item) => item.id) as Array<string>;
};

const getPermissionList = async () => {
    const { code, data } = await permissionApi.getPermissionList();
    if (code !== 1) return;
    options.value = data.map((item) => ({
        label: item.name,
        value: item.id,
    }));
};

const save = async () => {
    loading.value = true;
    const { code } = await permissionApi.updateRolePermissions({
        roleId: props.role?.id,
        permissionIds: valueRef.value,
    });
    if (code === 1) {
        window.$message.success("保存成功");
        emits("close");
    }
    loading.value = false;
};

const initData = async () => {
    loading.value = true;
    await getTreeData();
    await getRoleData();
    await getPermissionList();
    loading.value = false;
};

onMounted(() => {
    initData();
});
</script>

<style scoped></style>
