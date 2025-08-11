<template>
  <n-form
    size="large"
    ref="formRef"
    :model="formData"
    :rules="formAddRules"
    label-placement="left"
    label-width="auto"
    require-mark-placement="right-hanging"
  >
    <n-form-item label="名称" path="name">
      <n-input v-model:value="formData.name" placeholder="请输入名称" />
    </n-form-item>
    <n-form-item label="排序" path="sequence">
      <n-input v-model:value="formData.sequence" placeholder="请输入排序序号" />
    </n-form-item>
    <n-form-item label="父项" path="parentId">
      <n-input
        v-model:value="parent!.name"
        :disabled="true"
        placeholder="Select"
      />
    </n-form-item>
    <n-form-item label="类型" path="type">
      <n-radio-group v-model:value="formData.type">
        <n-space>
          <n-radio value="0">学院</n-radio>
          <n-radio value="1">专业</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
  </n-form>
  <div class="w-full flex justify-end">
    <n-button @click="emits('close')">取消</n-button>
    <n-button ml-20 type="primary" @click="save">保存</n-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import type { FormInst } from "naive-ui";
import organizationApi from "@/api/organizationApi";
import { formAddRules } from "./common";

const emits = defineEmits(["close", "refreshNode"]);
const props = defineProps({
  parent: {
    type: Object as () => Organization,
    require: true,
  },
});
const formRef = ref<FormInst>();
const formData = ref(<OrganizationAdd>{});

watch(
  () => props.parent,
  (newV) => {
    formData.value.parentId = newV!.id as string;
  },
  { immediate: true }
);

const save = () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const { code } = await organizationApi.add(formData.value);
      if (code === 1) {
        window.$message.success("添加成功");
        emits("close");
        emits("refreshNode");
      }
    } else {
      window.$message.error("请完善信息");
    }
  });
};
</script>

<style lang="scss" scoped></style>