<template>
  <h3 class="text-center mb-20 text-25">详情</h3>
  <n-form
    size="large"
    ref="formRef"
    :rules="formRules"
    :model="useData"
    label-placement="left"
    label-width="auto"
    require-mark-placement="right-hanging"
  >
    <n-form-item label="名称" path="name">
      <n-input
        v-model:value="useData.name"
        placeholder="请输入组织名称"
        @input="onChange"
      />
    </n-form-item>
    <n-form-item label="排序" path="sequence">
      <n-input
        v-model:value="useData.sequence"
        placeholder="请输入排序序号"
        @input="onChange"
      />
    </n-form-item>
    <n-form-item label="ID" path="id">
      <n-input v-model:value="useData.id" :disabled="true" placeholder="none" />
    </n-form-item>
    <n-form-item label="父级ID" path="parentId">
      <n-input
        v-model:value="useData.parentId"
        :disabled="true"
        placeholder="none"
      />
    </n-form-item>
    <n-form-item label="层级" path="grade">
      <n-input
        v-model:value="useData.grade"
        :disabled="true"
        placeholder="none"
      />
    </n-form-item>
    <n-form-item label="类型" path="type" v-show="useData.grade !== '0'">
      <n-radio-group
        v-model:value="useData.type"
        name="type"
        @update:value="onChange"
      >
        <n-space>
          <n-radio value="0">学院</n-radio>
          <n-radio value="1">专业</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
  </n-form>
  <div class="h-100 flex justify-end">
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div v-if="showOptions" class="flex justify-end">
        <n-button @click="cancel">取消</n-button>
        <n-button ml-20 type="primary" @click="save">更新</n-button>
      </div>
    </transition>

    <n-button ml-20 type="error" @click="remove">删除</n-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { formRules } from "./common";
import type { FormInst } from "naive-ui";
import organizationApi from "@/api/organizationApi";

const emits = defineEmits(["refreshNode", "removeNowNode"]);
const props = defineProps({
  formData: {
    type: Object as () => Organization,
    require: false,
    default: {
      id: "",
      parentId: "",
      name: "",
      grade: "",
      type: "",
      sequence: "",
    },
  },
});
const showOptions = ref(false);
const formRef = ref<FormInst>();
const useData = ref(<OrganizationUpdate>{});

watch(
  () => props.formData,
  (newV) => {
    // 深拷贝
    useData.value = JSON.parse(JSON.stringify(newV));
  },
  { immediate: true }
);

const onChange = () => {
  showOptions.value = true;
};

const cancel = () => {
  useData.value = JSON.parse(JSON.stringify(props.formData));
  showOptions.value = false;
};

const save = () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const { code } = await organizationApi.update(useData.value);
      if (code === 1) {
        window.$message.success("更新成功");
        emits("refreshNode", <Organization>useData.value);
        showOptions.value = false;
      }
    } else {
      window.$message.error("请完善信息");
    }
  });
};

const remove = () => {
  window.$dialog.warning({
    title: "警告",
    content: `确定删除 【${useData.value.name}】 的信息吗`,
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      const { code } = await organizationApi.remove(useData.value.id);
      if (code === 1) {
        window.$message.success("删除成功");
        emits("removeNowNode", useData.value);
      }
    },
  });
};
</script>

<style lang="scss" scoped></style>