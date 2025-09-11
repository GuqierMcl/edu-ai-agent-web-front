<template>
  <div class="form-container">
    <n-spin :show="loading">
      <!-- 头像展示区域 -->
      <div class="avatar-container flex items-center mb-8" v-if="isEdit">
        <n-avatar round :src="props.formData.user?.avatar_url || DefaultAvatar" :size="100"
          :name="props.formData.user?.name || '未知用户'" />
        <div class="ml-6">
          <p class="font-bold text-5rem">
            {{ props.formData.user?.name || "未设置名称" }}
          </p>
          <p class="text-gray-500">
            @{{ props.formData.user?.account || "未设置账号" }}
          </p>
        </div>
      </div>

      <!-- 表单 -->
      <n-form ref="formRef" :model="teacherData" :rules="rules" label-placement="left" label-width="auto"
        require-mark-placement="right-hanging">
        <!-- 账号 / 密码（新增时显示） -->
        <n-form-item label="账号" path="account" v-if="!isEdit">
          <n-input v-model:value="teacherData.account" placeholder="请输入账号" />
        </n-form-item>
        <n-form-item label="密码" path="password" v-if="!isEdit">
          <n-input v-model:value="teacherData.password" placeholder="留空表示初始密码" />
        </n-form-item>
        <!-- 学校选择器 -->
        <n-form-item label="学校" path="university">
          <university-selector v-model="teacherData.university" :university="props.formData.university" w-full />
        </n-form-item>
        <n-form-item label="部门" path="department">
          <n-input v-model:value="teacherData.department" placeholder="请输入部门" />
        </n-form-item>

        <!-- 姓名、昵称 -->
        <n-form-item label="姓名" path="name">
          <n-input v-model:value="teacherData.name" placeholder="请输入姓名" />
        </n-form-item>
        <n-form-item label="昵称" path="nickname">
          <n-input v-model:value="teacherData.nickname" placeholder="请输入昵称" />
        </n-form-item>

        <!-- 性别 -->
        <n-form-item label="性别" path="gender">
          <n-radio-group v-model:value="teacherData.gender">
            <n-radio :value="'1'">男</n-radio>
            <n-radio :value="'0'">女</n-radio>
          </n-radio-group>
        </n-form-item>

        <!-- 手机号 / 邮箱 / 职业 / 学科 -->
        <n-form-item label="手机号" path="phone">
          <n-input v-model:value="teacherData.phone" placeholder="请输入手机号" />
        </n-form-item>
        <n-form-item label="邮箱" path="email">
          <n-input v-model:value="teacherData.email" placeholder="请输入邮箱" />
        </n-form-item>
        <n-form-item label="职业" path="profession">
          <n-select v-model:value="teacherData.profession" :options="professionOptions" placeholder="请选择职务" />
        </n-form-item>
        <n-form-item label="学科" path="subject">
          <n-select v-model:value="teacherData.subject" :options="subjectOptions" placeholder="请选择学科" />
        </n-form-item>

        <!-- 生日 -->
        <n-form-item label="生日" path="birth_date">
          <n-date-picker v-model:formatted-value="teacherData.birth_date" value-format="yyyy-MM-dd" placeholder="请选择生日"
            type="date" clearable />
        </n-form-item>

        <!-- 职称 -->
        <n-form-item label="职称" path="professional_title">
          <n-select v-model:value="teacherData.professional_title
            " :options="professionalTitleOptions" placeholder="请选择职称" />
        </n-form-item>
      </n-form>

      <!-- 底部按钮 -->
      <div class="w-full flex justify-end mt-8">
        <n-button @click="emits('close')">取消</n-button>
        <n-button ml-4 type="primary" @click="save" :loading="loading">
          保存
        </n-button>
      </div>
    </n-spin>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { rules } from "./common";
import teacherApi from "@/api/teacherApi";
import DefaultAvatar from "@/assets/images/defaultAvatar.png";
import UniversitySelector from "@/components/university/UniversitySelector.vue";
import type { FormItemRule, SelectOption, FormInst } from "naive-ui";
import optionsApi from "@/api/optionsApi";
const loading = ref(false);

const emits = defineEmits(["close", "reloadList"]);

const props = defineProps({
  isEdit: {
    type: Boolean,
    required: true,
  },
  formData: {
    type: Object as () => Teacher,
    required: false,
    default: {},
  },
});

// 响应式表单数据
const teacherData = ref<TeacherAdd>({
  account: "",
  password: "",
  name: "",
  nickname: "",
  phone: "",
  email: "",
  profession: "",
  department: "",
  birth_date: "2025-06-30",
  gender: "",
  university: "",
  subject: "",
  professional_title: "",
});

const formRef = ref<FormInst>();

// 初始化表单数据
const init = async () => {
  const user = props.formData?.user || {};
  const university = props.formData?.university || {};

  teacherData.value = {
    ...props.formData,
    account: props.formData.user?.account || "",
    password: "",
    name: props.formData.user?.name || "",
    email: props.formData.user?.email || "",
    nickname: props.formData.user?.nickname || "",
    phone: props.formData.user?.phone || "",
    university: props.formData.university?.id || ""
  };

  await getSubjectOptions();
  await getProfessionalTitleOptions();
  await getProfessionOptions();
};

// 保存表单
const save = async () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      loading.value = true;
      let resCode;
      if (props.isEdit) {
        const { code } = await teacherApi.update(<TeacherUpdate>{
          ...teacherData.value,
          id: props.formData.id,
        });
        resCode = code;
      } else {
        const { code } = await teacherApi.add(<TeacherAdd>teacherData.value);
        resCode = code;
      }

      if (resCode === 1) {
        window.$message.success("保存成功");
        emits("reloadList");
        emits("close");
      }
      loading.value = false;
    } else {
      window.$message.error("请完善信息");
    }
  });
};
const subjectOptions = ref(<SelectOption[]>[]);
const getSubjectOptions = async () => {
  const { code, data } = await optionsApi.getOptions("subject");
  if (code === 1) {
    subjectOptions.value = data;
  }
};

const professionalTitleOptions = ref(<SelectOption[]>[]);
const getProfessionalTitleOptions = async () => {
  const { code, data } = await optionsApi.getOptions("teacher_title");
  if (code === 1) {
    professionalTitleOptions.value = data;
  }
};

const professionOptions = ref(<SelectOption[]>[]);
const getProfessionOptions = async () => {
  const { code, data } = await optionsApi.getOptions("teacher_profession");
  if (code === 1) {
    professionOptions.value = data;
  }
};
onMounted(async () => {
  loading.value = true;
  await init();
  loading.value = false;
});
</script>

<style lang="scss" scoped>
.form-container {
  width: 100%;
}

.avatar-container {
  padding: 16px;
  border-bottom: 1px solid #e5e5e5;
}

.ml-6 {
  margin-left: 1.5rem;
}

.mb-8 {
  margin-bottom: 2rem;
}

.mt-8 {
  margin-top: 2rem;
}

.text-gray-500 {
  color: #6b7280;
}
</style>
