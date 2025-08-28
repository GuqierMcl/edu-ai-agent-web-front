<template>
    <div>
        <n-form
            ref="formRef"
            :model="formData"
            :rules="rules"
            label-placement="left"
            label-width="auto"
            require-mark-placement="right-hanging"
        >
            <n-form-item label="角色码" path="role_key">
                <n-input
                    v-model:value="formData.role_key"
                    placeholder="请输入角色码"
                />
            </n-form-item>
            <n-form-item label="角色名称" path="role_name">
                <n-input
                    v-model:value="formData.role_name"
                    placeholder="请输入角色名称"
                />
            </n-form-item>
            <n-form-item label="描述" path="des">
                <n-input
                    type="textarea"
                    v-model:value="formData.des"
                    placeholder="请输入描述"
                />
            </n-form-item>
        </n-form>
        <div class="w-full flex justify-end mt-8">
            <n-button @click="emits('close')">取消</n-button>
            <n-button ml-20 type="primary" @click="save" :loading="loading"
                >保存</n-button
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { FormInst } from "naive-ui";
import { rules } from "./common";
import roleApi from "@/api/roleApi";

const emits = defineEmits(["close", "reloadList"]);
const loading = ref(false);
const formRef = ref<FormInst>();
const props = defineProps({
    formData: {
        type: Object as () => RoleList,
        require: false,
        default: {},
    },
    isEdit: {
        type: Boolean,
        require: true,
    },
});
const formData = ref<RoleAdd>({
    role_key: "",
    role_name: "",
    des: "",
});

const save = async () => {
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            loading.value = true;
            let resCode;
            if (props.isEdit) {
                const { code } = await roleApi.updateRole(<RoleUpdate>{
                    ...formData.value,
                    id: props.formData.id,
                });
                resCode = code;
            } else {
                const { code } = await roleApi.addRole(<RoleAdd>formData.value);
                resCode = code;
            }

            if (resCode === 1) {
                window.$message.success("保存成功");
                emits("reloadList");
                emits("close");
            }
            loading.value = false;
        } else {
            console.log(errors);
            window.$message.error("请完善信息");
        }
    });
};
const init = async () => {
    formData.value = {
        ...props.formData,
    };
};
onMounted(async () => {
    loading.value = true;
    await init();
    loading.value = false;
});
</script>

<style scoped></style>
