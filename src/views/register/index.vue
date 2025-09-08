<template>
    <div
        class="full f-e-c bg-cover"
        :style="{ backgroundImage: `url(${bgImg})`, overflowY: 'auto' }"
    >
        <div
            style="transform: translateY(25px)"
            class="max-w-700 min-w-500 f-c-c rounded-30 bg-white p-15 card-shadow"
        >
            <!-- <transition name="step-fade" mode="out-in"> -->
                <!-- 身份选择页面 -->
                <div
                    v-if="currentStep === 'select'"
                    key="select"
                    class="w-1000 flex-col px-20 py-25"
                >
                    <h5
                        class="f-c-c text-36 fw-400 color-#3973a4"
                        style="font-family: YouShe"
                    >
                        选择注册身份
                    </h5>

                    <div class="mt-40 w-full">
                        <div class="f-c-c flex-row gap-20">
                            <!-- 学生注册卡片 -->
                            <div
                                class="w-full h-120 f-c-c rounded-12 border-2 cursor-pointer transition-all duration-300 hover:border-#3973a4 hover:bg-#f8fbff"
                                :class="
                                    selectedRole === 'student'
                                        ? 'border-#3973a4 bg-#f8fbff'
                                        : 'border-#e0e0e0'
                                "
                                @click="goToRegister('student')"
                            >
                                <!-- <n-image :src="r_studnet" width="80"/> -->
                                <div class="f-c-c flex-col">
                                    <n-icon
                                        :component="MenuBookFilled"
                                        size="40"
                                        :color="
                                            selectedRole === 'student'
                                                ? '#3973a4'
                                                : '#666'
                                        "
                                    />
                                    <span
                                        class="mt-0 text-18 fw-500"
                                        :class="
                                            selectedRole === 'student'
                                                ? 'color-#3973a4'
                                                : 'color-#666'
                                        "
                                    >
                                        学生注册
                                    </span>
                                    <span class="mt-5 text-14 color-#999">
                                        注册学生账号，享受学习服务
                                    </span>
                                </div>
                            </div>

                            <!-- 教师注册卡片 -->
                            <div
                                class="w-full h-120 f-c-c rounded-12 border-2 cursor-pointer transition-all duration-300 hover:border-#3973a4 hover:bg-#f8fbff"
                                :class="
                                    selectedRole === 'teacher'
                                        ? 'border-#3973a4 bg-#f8fbff'
                                        : 'border-#e0e0e0'
                                "
                                @click="goToRegister('teacher')"
                            >
                                <div class="f-c-c flex-col">
                                    <n-icon
                                        :component="PeopleOutlined"
                                        size="40"
                                        :color="
                                            selectedRole === 'teacher'
                                                ? '#3973a4'
                                                : '#666'
                                        "
                                    />
                                    <span
                                        class="mt-10 text-18 fw-500"
                                        :class="
                                            selectedRole === 'teacher'
                                                ? 'color-#3973a4'
                                                : 'color-#666'
                                        "
                                    >
                                        教师注册
                                    </span>
                                    <span class="mt-5 text-14 color-#999">
                                        注册教师账号，管理教学资源
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-40 w-full f-c-c gap-15">
                        <n-button
                            class="h-50 w-120 rounded-12 text-16 bg-#f5f5f5! color-#666"
                            @click="goBack"
                        >
                            返回登录
                        </n-button>
                        <!-- <n-button
                            class="h-50 w-120 rounded-12 text-16 bg-#3973a4! color-white"
                            type="primary"
                            :disabled="!selectedRole"
                            @click="goToRegister"
                        >
                            下一步
                        </n-button> -->
                    </div>
                </div>

                <!-- 学生注册表单 -->
                <StudentRegister
                    v-else-if="currentStep === 'student'"
                    key="student"
                    @goBack="goBackToSelect"
                />

                <!-- 教师注册表单 -->
                <TeacherRegister
                    v-else-if="currentStep === 'teacher'"
                    key="teacher"
                    @goBack="goBackToSelect"
                />
            <!-- </transition> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import StudentRegister from "@/components/register/StudentRegister.vue";
import TeacherRegister from "@/components/register/TeacherRegister.vue";
// TODO: 导入合适的图标组件
import { MenuBookFilled, PeopleOutlined } from "@vicons/material";

const router = useRouter();

// 当前步骤：select（选择身份）、student（学生注册）、teacher（教师注册）
const currentStep = ref<string>("select");
const selectedRole = ref<string>("");

const goBack = () => {
    router.push("/login");
};

const goToRegister = (role: string) => {
    selectedRole.value = role;
    if (!selectedRole.value) {
        window.$message.warning("请选择注册身份");
        return;
    }

    // 根据选择的身份显示对应的注册表单
    currentStep.value = selectedRole.value;
};

const goBackToSelect = () => {
    currentStep.value = "select";
    selectedRole.value = "";
};

// 导入背景图片
import bgImg from "@/assets/images/login_bg.jpg";
</script>

<style scoped>

/* 步骤切换过渡动画 */
.step-fade-enter-active,
.step-fade-leave-active {
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.step-fade-enter-from {
    opacity: 0;
    /* transform: translateY(20px) scale(0.95); */
}

.step-fade-leave-to {
    opacity: 0;
    /* transform: translateY(-20px) scale(1.05); */
}
</style>
