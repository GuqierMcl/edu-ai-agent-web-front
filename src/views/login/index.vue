<template>
  <div
    class="full f-e-c bg-cover"
    :style="{ backgroundImage: `url(${bgImg})`, overflowY: 'auto' }"
  >
    <div class="f-b-c w-520">
      <n-image :src="logo" width="160" height="160" preview-disabled></n-image>
      <img :src="FontIndex" class="w-450 ml-20" />
    </div>
    <div
      style="transform: translateY(25px)"
      class="max-w-700 min-w-500 f-c-c rounded-30 bg-white p-15 card-shadow"
    >
      <div class="w-430 flex-col px-20 py-25">
        <h5
          class="f-c-c text-36 fw-400 color-#3973a4"
          style="font-family: YouShe"
        >
          欢迎使用
        </h5>
        <div class="mt-30">
          <n-input
            v-model:value="loginInfo.account"
            class="h-50 items-center text-16 rounded-12 bg-#f5f5f5 color-black"
            autofocus
            placeholder="请输入账号"
            :maxlength="20"
          >
            <template #prefix>
              <n-icon
                :component="PersonRound"
                size="28"
                color="#aaa"
                class="mr-10"
              />
            </template>
          </n-input>
        </div>
        <div class="mt-30">
          <n-input
            v-model:value="loginInfo.password"
            class="h-50 items-center text-16 rounded-12 bg-#f5f5f5 color-black"
            type="password"
            show-password-on="mousedown"
            placeholder="请输入密码"
            :maxlength="20"
            @keydown.enter="handleLogin"
          >
            <template #prefix>
              <n-icon
                :component="LockRound"
                size="28"
                color="#aaa"
                class="mr-10"
              />
            </template>
          </n-input>
        </div>
        <!-- <div class="mt-30 f-b-c">
          <n-input
            v-model:value="loginInfo.code"
            class="h-50 w-160! items-center pl-10 text-16 rounded-12 bg-#f5f5f5"
            placeholder="验证码"
            :maxlength="20"
            @keydown.enter="handleLogin"
          />
          <n-image
            @click="verificationCode"
            width="160"
            height="50"
            :src="codeImage"
            preview-disabled
          />
        </div> -->
        <div class="mt-20 h-20"></div>

        <div class="mt-20 w-full f-c-c">
          <n-button
            class="h-50 w-80p w-full rounded-12 text-16 bg-#3973a4! color-white"
            type="primary"
            :loading="loading"
            @click="handleLogin"
          >
            登录
          </n-button>
        </div>
        
        <div class="mt-20 w-full f-c-c">
          <span class="text-14 color-#999">
            还没有账号？
            <span 
              class="color-#3973a4 cursor-pointer hover:underline"
              @click="goToRegister"
            >
              立即注册
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { lStorage, setToken } from "@/utils";
import { addDynamicRoutes } from "@/router";
import { PersonRound, LockRound } from "@vicons/material";
import authApi from "@/api/authApi";
import logo from "@/assets/logo.png";
import bgImg from "@/assets/images/login_bg.jpg";
import FontIndex from "@/assets/images/font-index.png";

const title = import.meta.env.VITE_TITLE;

const router = useRouter();
const { query } = useRoute();

const codeImage = ref();

const loginInfo = ref({
  account: "",
  password: "",
  // code: "",
  // uuid: "",
});

const isRemember = ref(false);
const loading = ref(false);
const handleLogin = async () => {
  // const { account, password, code } = loginInfo.value;
  const { account, password } = loginInfo.value;
  if (!account || !password) {
    window.$message.warning("请输入用户名和密码");
    return;
  }
  // if (!code) {
  //   window.$message.warning("验证码不能为空");
  //   return;
  // }

  loading.value = true;

  try {
    const { code, data } = await authApi.login(loginInfo.value);
    if (code !== 1) {
      return;
    }
    setToken(data.token);
    window.$message.success("登录成功");

    await addDynamicRoutes();
    if (query.redirect) {
      const path = query.redirect;
      Reflect.deleteProperty(query, "redirect");
      // @ts-ignore
      router.push({ path, query });
    } else {
      router.push("/");
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};


const goToRegister = () => {
  router.push("/register");
};

const initLoginInfo = () => {
  const localLoginInfo = lStorage.get("loginInfo");
  if (localLoginInfo) {
    loginInfo.value.account = localLoginInfo.account || "";
    loginInfo.value.password = localLoginInfo.password || "";
  }
};

onMounted(() => {
  // initLoginInfo();
  // verificationCode();
});
</script>

<style scoped>
:deep(.n-input .n-input__border) {
  border: 0px !important;
}
:deep(.n-button .n-button__border) {
  border: 0px !important;
}
:deep(.n-input .n-input__input-el) {
  color: #555;
}
:deep(.n-input .n-input__placeholder) {
  color: #aaa;
}
</style>
