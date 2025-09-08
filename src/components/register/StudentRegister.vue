<template>
  <div class="w-430 flex-col px-20 py-25">
    <h5
      class="f-c-c text-36 fw-400 color-#3973a4"
      style="font-family: YouShe"
    >
      学生注册
    </h5>
    
    <div class="mt-30">
      <n-input
        v-model:value="registerInfo.studentId"
        class="h-50 items-center text-16 rounded-12 bg-#f5f5f5 color-black"
        placeholder="请输入学号"
        :maxlength="20"
      >
        <template #prefix>
          <n-icon
            :component="IdCardIcon"
            size="28"
            color="#aaa"
            class="mr-10"
          />
        </template>
      </n-input>
    </div>

    <div class="mt-30">
      <n-input
        v-model:value="registerInfo.name"
        class="h-50 items-center text-16 rounded-12 bg-#f5f5f5 color-black"
        placeholder="请输入真实姓名"
        :maxlength="20"
      >
        <template #prefix>
          <n-icon
            :component="PersonIcon"
            size="28"
            color="#aaa"
            class="mr-10"
          />
        </template>
      </n-input>
    </div>

    <div class="mt-30">
      <n-input
        v-model:value="registerInfo.phone"
        class="h-50 items-center text-16 rounded-12 bg-#f5f5f5 color-black"
        placeholder="请输入手机号"
        :maxlength="11"
      >
        <template #prefix>
          <n-icon
            :component="PhoneIcon"
            size="28"
            color="#aaa"
            class="mr-10"
          />
        </template>
      </n-input>
    </div>

    <div class="mt-30">
      <n-input
        v-model:value="registerInfo.email"
        class="h-50 items-center text-16 rounded-12 bg-#f5f5f5 color-black"
        placeholder="请输入邮箱"
        :maxlength="50"
      >
        <template #prefix>
          <n-icon
            :component="EmailIcon"
            size="28"
            color="#aaa"
            class="mr-10"
          />
        </template>
      </n-input>
    </div>

    <div class="mt-30">
      <n-select
        v-model:value="registerInfo.universityId"
        class="h-50"
        placeholder="请选择学校"
        :options="universityOptions"
        :loading="universityLoading"
      >
        <template #prefix>
          <n-icon
            :component="SchoolIcon"
            size="28"
            color="#aaa"
            class="mr-10"
          />
        </template>
      </n-select>
    </div>

    <div class="mt-30">
      <n-input
        v-model:value="registerInfo.major"
        class="h-50 items-center text-16 rounded-12 bg-#f5f5f5 color-black"
        placeholder="请输入专业"
        :maxlength="50"
      >
        <template #prefix>
          <n-icon
            :component="BookIcon"
            size="28"
            color="#aaa"
            class="mr-10"
          />
        </template>
      </n-input>
    </div>

    <div class="mt-30">
      <n-input
        v-model:value="registerInfo.password"
        class="h-50 items-center text-16 rounded-12 bg-#f5f5f5 color-black"
        type="password"
        show-password-on="mousedown"
        placeholder="请输入密码"
        :maxlength="20"
      >
        <template #prefix>
          <n-icon
            :component="LockIcon"
            size="28"
            color="#aaa"
            class="mr-10"
          />
        </template>
      </n-input>
    </div>

    <div class="mt-30">
      <n-input
        v-model:value="registerInfo.confirmPassword"
        class="h-50 items-center text-16 rounded-12 bg-#f5f5f5 color-black"
        type="password"
        show-password-on="mousedown"
        placeholder="请确认密码"
        :maxlength="20"
        @keydown.enter="handleRegister"
      >
        <template #prefix>
          <n-icon
            :component="LockIcon"
            size="28"
            color="#aaa"
            class="mr-10"
          />
        </template>
      </n-input>
    </div>

    <div class="mt-20 h-20"></div>

    <div class="mt-20 w-full f-c-c gap-15">
      <n-button
        class="h-50 w-120 rounded-12 text-16 bg-#f5f5f5! color-#666"
        @click="$emit('goBack')"
      >
        返回
      </n-button>
      <n-button
        class="h-50 w-120 rounded-12 text-16 bg-#3973a4! color-white"
        type="primary"
        :loading="loading"
        @click="handleRegister"
      >
        注册
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
// TODO: 导入合适的图标组件
// import { 
//   Person, 
//   Lock, 
//   Phone, 
//   Email, 
//   School, 
//   Book,
//   IdCard 
// } from "@vicons/material";

const router = useRouter();

// 定义事件
const emit = defineEmits<{
  goBack: []
}>();

// 临时图标，实际使用时请替换为合适的图标
const PersonIcon = ref(null);
const LockIcon = ref(null);
const PhoneIcon = ref(null);
const EmailIcon = ref(null);
const SchoolIcon = ref(null);
const BookIcon = ref(null);
const IdCardIcon = ref(null);

const loading = ref(false);
const universityLoading = ref(false);
const universityOptions = ref([]);

const registerInfo = ref({
  studentId: "",
  name: "",
  phone: "",
  email: "",
  universityId: null,
  major: "",
  password: "",
  confirmPassword: "",
});

const handleRegister = async () => {
  // TODO: 表单验证
  const { studentId, name, phone, email, universityId, major, password, confirmPassword } = registerInfo.value;
  
  if (!studentId || !name || !phone || !email || !universityId || !major || !password || !confirmPassword) {
    window.$message.warning("请填写完整信息");
    return;
  }

  if (password !== confirmPassword) {
    window.$message.warning("两次输入的密码不一致");
    return;
  }

  loading.value = true;

  try {
    // TODO: 调用学生注册接口
    // const { code, data } = await studentApi.register(registerInfo.value);
    // if (code !== 1) {
    //   return;
    // }
    
    window.$message.success("注册成功，请登录");
    router.push("/login");
  } catch (error) {
    console.log(error);
    // TODO: 错误处理
  } finally {
    loading.value = false;
  }
};

const loadUniversities = async () => {
  // TODO: 加载学校列表
  // universityLoading.value = true;
  // try {
  //   const { code, data } = await universityApi.getList();
  //   if (code === 1) {
  //     universityOptions.value = data.map(item => ({
  //       label: item.name,
  //       value: item.id
  //     }));
  //   }
  // } catch (error) {
  //   console.log(error);
  // } finally {
  //   universityLoading.value = false;
  // }
};

onMounted(() => {
  loadUniversities();
});
</script>

<style scoped>
:deep(.n-input .n-input__border) {
  border: 0px !important;
}
:deep(.n-button .n-button__border) {
  border: 0px !important;
}
:deep(.n-select .n-base-selection) {
  border: 0px !important;
  background-color: #f5f5f5 !important;
}
:deep(.n-input .n-input__input-el) {
  color: #555;
}
:deep(.n-input .n-input__placeholder) {
  color: #aaa;
}
</style>
