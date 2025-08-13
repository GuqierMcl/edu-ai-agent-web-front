<template>
    <n-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
    >
        <n-form-item label="名称" path="name">
            <n-input v-model:value="formData.name" placeholder="请输入名称" />
        </n-form-item>
        <n-form-item label="类型" path="type">
            <n-select v-model:value="formData.type" :options="options" />
        </n-form-item>
        <n-form-item label="排序" path="sequence">
            <n-input
                v-model:value="formData.sequence"
                placeholder="默认排序为1"
            />
        </n-form-item>
        <n-form-item v-if="isEdit" label="图片">
            <n-image width="300" :src="formData.remote_file_url" />
        </n-form-item>
        <n-form-item v-else label="图片">
            <n-upload
                v-model:file-list="formData.file"
                :default-upload="false"
                list-type="Resource"
                accept="Resource/*"
                :max="1"
            >
                <n-button>上传文件</n-button>
            </n-upload>
        </n-form-item>
    </n-form>
    <div class="w-full flex justify-end">
        <n-button @click="emits('close')">取消</n-button>
        <n-button ml-20 type="primary" @click="save">保存</n-button>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import type { FormInst, SelectOption } from "naive-ui";
import { rules } from "./common";
import resourceApi from "@/api/resourceApi";

const props = defineProps({
    isEdit: {
        type: Boolean,
        require: true,
    },
    formData: {
        type: Object as () => ResourceAdd,
        require: false,
        default: {},
    },
});
const emits = defineEmits(["close", "reloadList"]);
const formRef = ref<FormInst>();
const options = ref<SelectOption[]>([]);

const getResourceType = async () => {
    options.value = await resourceApi.getResourceType();
};

const save = () => {
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            let resCode: number;
            if (props.isEdit) {
                const { code } = await resourceApi.update(<Resource>props.formData);
                resCode = code;
            } else {
                const formDataReq = new FormData();
                formDataReq.append("name", <string>props.formData.name);
                formDataReq.append("type", props.formData.type);
                formDataReq.append(
                    "sequence",
                    props.formData.sequence ? props.formData.sequence + "" : "1"
                );
                // @ts-ignore
                console.log(props.formData.file[0].file);

                // @ts-ignore
                formDataReq.append("file", props.formData.file[0].file);
                const { code } = await resourceApi.add(formDataReq);

                resCode = code;
            }
            if (resCode === 1) {
                window.$message.success("保存成功");
                emits("reloadList");
                emits("close");
            }
        } else {
            console.log(errors);
            window.$message.error("请完善信息");
        }
    });
};
onMounted(() => {
    getResourceType();
});
</script>

<style lang="scss" scoped></style>
