<template>
  <n-form
    ref="formRef"
    :model="formData"
    :rules="rules"
    label-placement="left"
    label-width="auto"
    require-mark-placement="right-hanging"
  >
    <n-form-item label="账号" path="account">
      <n-input
        v-model:value="formData.account"
        placeholder="请输入账号"
        :disabled="isEdit"
      />
    </n-form-item>
    <n-form-item label="名称" path="name">
      <n-input v-model:value="formData.name" placeholder="请输入名称" />
    </n-form-item>
    <n-form-item label="性别" path="gender">
      <n-radio-group v-model:value="formData.gender">
        <n-radio value="1"> 男 </n-radio>
        <n-radio value="0"> 女 </n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="班级" path="clazzId">
      <n-cascader
        v-model:value="formData.clazzId"
        :options="cascaderOptions"
        check-strategy="child"
        :show-path="false"
        remote
        :on-load="loadCascaderOptions"
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
import type { FormInst, CascaderOption } from "naive-ui";
import { rules } from "./common";
import { getMajorOptions, getClazzOptions, getCascaderRoot } from "./service";
import studentApi from "@/api/studentApi";

const emits = defineEmits(["close", "reloadList"]);
const props = defineProps({
  isEdit: {
    type: Boolean,
    require: true,
  },
  formData: {
    type: Object as () => Student,
    require: false,
    default: {},
  },
});

const formRef = ref<FormInst>();
const cascaderOptions = ref<CascaderOption[]>([]);

const save = () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      let resCode;
      if (props.isEdit) {
        const { code } = await studentApi.update(<StudentUpdate>props.formData);
        resCode = code;
      } else {
        const { code } = await studentApi.add(<StudentAdd>props.formData);
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

const loadCascaderOptions = (option: CascaderOption) => {
  // 根据depth判断获取学院、专业还是班级
  return new Promise<void>(async (resolve) => {
    if (option.depth == 1) {
      // 获取专业
      option.children = await getMajorOptions(<string>option.value);
    } else if (option.depth == 2) {
      // 获取班级
      option.children = await getClazzOptions(<string>option.value);
    }
    resolve();
  });
};

const init = async () => {
  cascaderOptions.value = await getCascaderRoot();
  if (!props.isEdit) return;
  // 若为修改页面，则查询下拉框信息，映射级联框
  const collegeOption = cascaderOptions.value.find((item) => {
    return item.value == props.formData.collegeId;
  });
  await loadCascaderOptions(collegeOption!);
  const majorOption = collegeOption?.children?.find((item) => {
    return item.value == props.formData.majorId;
  });
  await loadCascaderOptions(majorOption!);
};

onMounted(async () => {
  init();
});
</script>

<style lang="scss" scoped></style>
