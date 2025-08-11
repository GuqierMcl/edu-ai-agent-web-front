<template>
  <n-form
    ref="formRef"
    :model="formData"
    :rules="rules"
    label-placement="left"
    label-width="auto"
    require-mark-placement="right-hanging"
  >
    <n-form-item label="课程名" path="name">
      <n-input v-model:value="formData.name" placeholder="请输入名称" />
    </n-form-item>
    <n-form-item label="排序" path="sequence">
      <n-input v-model:value="formData.sequence" placeholder="默认排序为1" />
    </n-form-item>
    <n-form-item label="封面" path="file">
      <n-upload
        ref="coverRef"
        v-model:file-list="formData.file"
        :default-upload="false"
        accept="image/*"
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
import { ref } from "vue";
import { rules } from "./common";
import type { FormInst } from "naive-ui";
import courseApi from "@/api/courseApi";
import { isDef, isUndef } from "@/utils";

const emits = defineEmits(["close", "reloadList"]);

const props = defineProps({
  isEdit: {
    type: Boolean,
    requeire: true,
  },
  formData: {
    type: Object as () => CourseUpdate,
    require: false,
    default: <CourseUpdate>{},
  },
});

const formRef = ref<FormInst>();

const add = async () => {
  if (isUndef(props.formData.file) || props.formData?.file?.length == 0) {
    window.$message.error("请上传课程封面");
    return;
  }
  const form = new FormData();
  form.append("name", props.formData.name);
  form.append("sequence", props.formData.sequence);
  // @ts-ignore
  form.append("file", props.formData.file[0].file);

  const { code } = await courseApi.addCourse(form);
  return code;
};

const update = async () => {
  const form = new FormData();
  form.append("id", props.formData.id);
  form.append("name", props.formData.name);
  form.append("sequence", props.formData.sequence);
  if (isDef(props.formData.file) && props.formData?.file?.length !== 0)
    // @ts-ignore
    form.append("file", props.formData.file[0].file);

  const { code } = await courseApi.updateCourse(form);
  return code;
};

const save = () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      console.log("文件数量", props.formData.file);
      let code;
      if (props.isEdit) {
        code = await update();
      } else {
        code = await add();
      }

      if (isUndef(code)) return;

      if (code === 1) {
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
