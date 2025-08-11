<template>
  <n-form
    size="large"
    ref="formRef"
    :rules="formAddRules"
    :model="formData"
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
  </n-form>
  <div class="w-full flex justify-end">
    <n-button @click="emits('close')">取消</n-button>
    <n-button ml-20 type="primary" @click="save">保存</n-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import type { FormInst } from "naive-ui";
import bookApi from "@/api/bookApi";
import { formAddRules } from "./common";

const emits = defineEmits(["close", "refreshNode"]);
const props = defineProps({
  parent: {
    type: Object as () => Book,
    require: true,
  },
});
const formRef = ref<FormInst>();
const formData = ref(<BookAdd>{});

const save = () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      formData.value.parentId = props.parent!.id;
      const { code } = await bookApi.addNode(formData.value);
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

onMounted(() => {
  console.log(props.parent);
});
</script>

<style lang="scss" scoped></style>