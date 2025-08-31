<template>
    <n-spin :show="loading">
        <n-transfer
            virtual-scroll
            block-line
            checkable
            cascade
            source-title="所有角色"
            target-title="已选角色"
            v-model:value="valueRef"
            :options="options"
            class="mt-10"
        />
        <n-alert title="警告" type="warning" mt-5 closable>
            修改用户角色后须用户重新登录才能生效。
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
import type { TreeOption, TransferRenderSourceLabel } from "naive-ui";
import { NTag } from "naive-ui";
import roleApi from "@/api/roleApi";
import { TreeRenderProps } from "naive-ui/lib/tree/src/interface";

const emits = defineEmits(["close"]);
const props = defineProps({
    row: {
        type: Object as () => UserWithRoles,
        require: false,
        default: {},
    },
});

const loading = ref(false);
const valueRef = ref<Array<string>>([]);
const options = ref<TreeOption[]>([]);
const queryParams = ref<RoleQueryInfo>({
    page: 1,
    pageSize: 10,
    type: "",
    role_name: "",
    role_key: "",
});
const typeOptions = [
    { label: "全部", value: "" },
    { label: "可选", value: "0" },
    { label: "系统", value: "1" },
    { label: "自定义", value: "2" },
];
const showQuery = ref(true);

const getRoleData = async () => {
    if (!props.row?.id) return;
    const { code, data } = await roleApi.getUserRoleList(props.row.id);
    if (code !== 1) return;
    valueRef.value = data.map((item) => item.id) as Array<string>;
};

const getRoleList = async () => {
    const { code, data } = await roleApi.getAllRoleList();
    if (code !== 1) return;
    options.value = data.map((item) => ({
        label: item.role_name,
        value: item.id,
        prefix: () =>
            h(
                NTag,
                {
                    bordered: false,
                    type:
                        item.type === "2"
                            ? "primary"
                            : item.type === "1"
                            ? "warning"
                            : "default",
                    round: true,
                },
                {
                    default: () => {
                        if (item.type === "2") {
                            return "自定义";
                        } else if (item.type === "1") {
                            return "系统";
                        } else {
                            return "可选";
                        }
                    },
                }
            ),
    }));
};

const save = async () => {
    loading.value = true;
    const { code } = await roleApi.updateUserRole({
        userId: props.row?.id,
        roleIds: valueRef.value,
    });
    if (code === 1) {
        window.$message.success("保存成功");
        emits("close");
    }
    loading.value = false;
};

const initData = async () => {
    loading.value = true;
    await getRoleData();
    await getRoleList();
    loading.value = false;
};

onMounted(() => {
    initData();
});
</script>
