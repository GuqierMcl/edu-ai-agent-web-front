<template>
  <n-form
    ref="formRef"
    :model="formData"
    :rules="rules"
    label-placement="left"
    label-width="auto"
    require-mark-placement="right-hanging"
  >
    <n-form-item label="学院" path="collegeId">
      <n-select
        v-model:value="formData.collegeId"
        placeholder="请选择学院"
        :options="collegeOptions"
        @update:value="(collegeId: string) => {
          props.formData.majorId ='';
          getMajor(collegeId);
        }"
      />
    </n-form-item>
    <n-form-item label="专业" path="majorId">
      <n-select
        v-model:value="formData.majorId"
        :placeholder="
          formData.collegeId?.length ? '请选择专业' : '请先选择学院'
        "
        :options="majorOptions"
      />
    </n-form-item>
    <n-form-item label="年级" path="gradeId">
      <n-select
        v-model:value="formData.gradeId"
        placeholder="请选择年级"
        :options="gradeOptions"
      />
    </n-form-item>
    <n-form-item label="班级" path="clazzNo">
      <n-select
        v-model:value="formData.clazzNo"
        placeholder="请选择班级"
        :options="clazzNoOptions"
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
import type { FormInst, SelectOption } from "naive-ui";
import { rules, clazzNoOptions } from "./common";
import clazzApi from "@/api/clazzApi";
import optionsApi from "@/api/optionsApi";

const emits = defineEmits(["close", "reloadList"]);
const props = defineProps({
  isEdit: {
    type: Boolean,
    require: true,
  },
  formData: {
    type: Object as () => ClazzAdd,
    require: false,
    default: {},
  },
});

const formRef = ref<FormInst>();
const collegeOptions = ref<SelectOption[]>([]);
const majorOptions = ref<SelectOption[]>([]);
const gradeOptions = ref<SelectOption[]>([]);

const generateName = () => {
  let majorName = majorOptions.value.find(
    (item) => item.value == props.formData.majorId
  )?.label;
  let gradeName = gradeOptions.value.find(
    (item) => item.value == props.formData.gradeId
  )?.grade as string;

  return majorName + gradeName + props.formData.clazzNo;
};

const update = async () => {
  const reqParam = {
    id: props.formData.id,
    name: generateName(),
    collegeId: props.formData.collegeId,
    majorId: props.formData.majorId,
    gradeId: props.formData.gradeId,
  };
  const { code } = await clazzApi.update(reqParam);
  return code;
};

const add = async () => {
  const reqParam = {
    name: generateName(),
    collegeId: props.formData.collegeId,
    majorId: props.formData.majorId,
    gradeId: props.formData.gradeId,
  };

  const { code } = await clazzApi.add(reqParam);
  return code;
};

const save = () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      let resCode = props.isEdit ? await update() : await add();

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

const getCollege = async () => {
  collegeOptions.value = await optionsApi.getCollegeOptions();
};
const getMajor = async (collegeId: string) => {
  majorOptions.value = await optionsApi.getMajorOptions(collegeId);
};
const getGrade = async () => {
  gradeOptions.value = await optionsApi.getGradeOptions();
};

onMounted(() => {
  getCollege();
  getGrade();
  if (props.isEdit) {
    // 若是修改信息，则查询专业列表和解析所属班级，以供显示
    getMajor(props.formData.collegeId);
    const clazzName = props.formData.name;
    const clazzNo = clazzName.charAt(clazzName.length - 1);
    props.formData.clazzNo = clazzNo;
  }
});
</script>

<style lang="scss" scoped></style>
