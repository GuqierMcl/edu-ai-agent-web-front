<template>
  <n-form
    ref="formRef"
    :model="formData"
    :rules="rules"
    label-placement="left"
    label-width="auto"
    require-mark-placement="right-hanging"
  >
    <n-form-item label="类型" path="type">
      <n-select
        v-model:value="formData.type"
        :options="options"
        @update:value="updateCodeInputType"
      />
    </n-form-item>
    <n-form-item label="名称" path="name">
      <n-input
        @blur="getPinyin"
        v-model:value="formData.name"
        placeholder="请输入名称"
      />
    </n-form-item>
    <n-form-item label="代码" path="code">
      <n-input
        :disabled="isProjectType"
        v-model:value="formData.code"
        :placeholder="isProjectType ? '输入名称后自动生成' : '请输入代码'"
      />
    </n-form-item>
    <n-form-item label="排序" path="sequence">
      <n-input v-model:value="formData.sequence" placeholder="默认排序为1" />
    </n-form-item>
  </n-form>
  <div class="w-full flex justify-end">
    <n-button @click="emits('close')">取消</n-button>
    <n-button ml-20 type="primary" @click="save">保存</n-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { FormInst } from "naive-ui";
import codeApi from "@/api/codeApi";

const props = defineProps({
  isEdit: {
    type: Boolean,
    require: true,
  },
  formData: {
    type: Object as () => CodeAdd,
    require: false,
    default: {},
  },
  options: {
    type: Object as () => CodeType[],
    require: false,
    default: {},
  },
});
const emits = defineEmits(["close", "reloadList"]);
const formRef = ref<FormInst>();
const isProjectType = ref<Boolean>(false);

const updateCodeInputType = (value: any) => {
  if (value == "projectType") {
    isProjectType.value = true;
  } else {
    isProjectType.value = false;
  }
};

const rules = ref({
  type: {
    required: true,
    message: "请选择类型",
    trigger: ["change", "blur"],
  },
  name: {
    required: true,
    message: "请输入名称",
    trigger: ["input", "blur"],
  },
  code: {
    required: true,
    message: "请输入代码",
    trigger: ["input", "blur"],
  },
  sequence: {
    required: false,
    message: "默认排序为1",
    trigger: ["input", "blur"],
  },
});

const getPinyin = async () => {
  if (!isProjectType.value) return;
  const { code, data } = await codeApi.getPinyin(<string>props.formData.name);
  if (code == 1) {
    props.formData.code = data;
  }
};
const save = () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      let resCode: number;
      if (props.isEdit) {
        console.log(props.isEdit);

        const { code } = await codeApi.update(props.formData);
        resCode = code;
      } else {
        console.log(props.isEdit);

        const { code } = await codeApi.add(props.formData);
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
</script>

<style lang="scss" scoped></style>
