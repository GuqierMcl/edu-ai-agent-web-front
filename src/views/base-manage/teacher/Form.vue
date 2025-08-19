<template>
  <n-form
    ref="formRef"
    :model="formData"
    :rules="rules"
    label-placement="left"
    label-width="auto"
    require-mark-placement="right-hanging"
  >
    <n-form-item label="姓名" path="name">
      <n-input v-model:value="formData.name" placeholder="请输入姓名" />
    </n-form-item>
    <n-form-item label="账号" path="account">
      <n-input
        disabled="true"
        v-model:value="formData.account"
        placeholder="请输入账号"
      />
    </n-form-item>
    <!-- <n-form-item label="职位" path="position">
      <n-select
        v-model:value="formData.position"
        placeholder="请选择职位"
        :options="generalOptions"
      />
    </n-form-item> -->
    <n-form-item label="手机号" path="phone">
      <n-input v-model:value="formData.phone" placeholder="请输入手机号" />
    </n-form-item>
    <n-form-item label="邮箱" path="email">
      <n-input v-model:value="formData.email" placeholder="请输入邮箱" />
    </n-form-item>
    <n-form-item label="性别" path="gender">
      <n-radio-group v-model:value="formData.gender">
        <n-radio value="1"> 男 </n-radio>
        <n-radio value="0"> 女 </n-radio>
      </n-radio-group>
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
import teacherApi from "@/api/teacherApi";
import { rules } from "./common";

const props = defineProps({
  isEdit: {
    type: Boolean,
    require: true,
  },
  formData: {
    type: Object as () => TeacherAdd,
    require: false,
    default: {},
  },
});
const emits = defineEmits(["close", "reloadList"]);
const formRef = ref<FormInst>();

const save = () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      let resCode: number;

      if (props.isEdit) {
        const { code } = await teacherApi.update(props.formData);
        resCode = code;
      } else {
        const { code } = await teacherApi.add(props.formData);
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
