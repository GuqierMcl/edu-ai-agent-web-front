<template>
    <div class="w-800 flex-col px-20 py-25 f-c-c">
        <n-spin :show="loading">
            <h5
                class="f-c-c text-36 fw-400 color-#3973a4"
                style="font-family: YouShe"
            >
                教师注册
            </h5>

            <n-steps :current="currentStep" status="process" class="mt-30">
                <n-step title="填写账户信息" />
                <n-step title="完善个人信息" />
                <n-step title="成功注册" />
            </n-steps>

            <div class="mt-30 w-full">
                <n-form
                    ref="formRef"
                    :model="registerInfo"
                    :rules="rules"
                    label-placement="top"
                    label-width="auto"
                    require-mark-placement="right-hanging"
                    size="large"
                >
                    <div v-show="currentStep == 1">
                        <n-grid :cols="24" :x-gap="24">
                            <n-form-item-gi
                                :span="24"
                                label="账号"
                                path="account"
                            >
                                <n-input
                                    v-model:value="registerInfo.account"
                                    round
                                    placeholder="请输入账号"
                                />
                            </n-form-item-gi>
                            <n-form-item-gi
                                :span="12"
                                label="密码"
                                path="password"
                            >
                                <n-input
                                    type="password"
                                    v-model:value="registerInfo.password"
                                    round
                                    placeholder="请输入密码"
                                />
                            </n-form-item-gi>
                            <n-form-item-gi
                                :span="12"
                                label="确认密码"
                                path="verify_password"
                            >
                                <n-input
                                    type="password"
                                    v-model:value="registerInfo.verify_password"
                                    round
                                    placeholder="请再次输入密码"
                                />
                            </n-form-item-gi>
                            <n-form-item-gi
                                :span="12"
                                label="姓名"
                                path="name"
                                suffix
                            >
                                <n-input
                                    round
                                    v-model:value="registerInfo.name"
                                    placeholder="请输入姓名"
                                />
                            </n-form-item-gi>
                            <n-form-item-gi
                                :span="12"
                                label="手机号"
                                path="phone"
                            >
                                <n-input
                                    round
                                    v-model:value="registerInfo.phone"
                                    placeholder="请输入手机号"
                                />
                            </n-form-item-gi>
                            <n-form-item-gi
                                :span="12"
                                label="电子邮箱"
                                path="email"
                            >
                                <n-input
                                    round
                                    v-model:value="registerInfo.email"
                                    placeholder="请输入电子邮箱"
                                />
                            </n-form-item-gi>
                            <n-form-item-gi
                                :span="12"
                                label="手机验证码"
                                path="verify_code"
                            >
                                <n-input-group>
                                    <n-input
                                        round
                                        v-model:value="registerInfo.verify_code"
                                        placeholder="请输入验证码"
                                    />
                                    <n-button
                                        round
                                        @click="getVerifyCode"
                                        :disabled="sending || counting"
                                        :loading="sending"
                                    >
                                        {{
                                            counting
                                                ? counter + "s后重试"
                                                : "发送验证码"
                                        }}
                                    </n-button>
                                </n-input-group>
                            </n-form-item-gi>
                        </n-grid>
                    </div>
                    <div v-show="currentStep == 2">
                        <n-grid :cols="24" :x-gap="24">
                            <n-form-item-gi
                                :span="12"
                                label="出生日期"
                                path="birth_date"
                            >
                                <n-date-picker
                                    v-model:formatted-value="
                                        registerInfo.birth_date
                                    "
                                    value-format="yyyy-MM-dd"
                                    type="date"
                                    placeholder="请输入生日"
                                />
                            </n-form-item-gi>
                            <n-form-item-gi
                                :span="12"
                                label="性别"
                                path="gender"
                            >
                                <n-radio-group
                                    v-model:value="registerInfo.gender"
                                >
                                    <n-radio value="1"> 男 </n-radio>
                                    <n-radio value="0"> 女 </n-radio>
                                </n-radio-group>
                            </n-form-item-gi>
                            <n-form-item-gi
                                :span="12"
                                label="学校"
                                path="university"
                            >
                                <university-selector
                                    v-model="registerInfo.university"
                                    w-full
                                />
                            </n-form-item-gi>
                            <n-form-item-gi
                                :span="12"
                                label="学科"
                                path="subject"
                            >
                                <n-select
                                    v-model:value="registerInfo.subject"
                                    :options="subjectOptions"
                                    placeholder="请选择学科"
                                />
                            </n-form-item-gi>
                            <n-form-item-gi
                                :span="12"
                                label="职称"
                                path="professional_title"
                            >
                                <n-select
                                    v-model:value="
                                        registerInfo.professional_title
                                    "
                                    :options="professionalTitleOptions"
                                    placeholder="请选择职称"
                                />
                            </n-form-item-gi>
                            <n-form-item-gi
                                :span="12"
                                label="职务"
                                path="profession"
                            >
                                <n-select
                                    v-model:value="registerInfo.profession"
                                    :options="professionOptions"
                                    placeholder="请选择职务"
                                />
                            </n-form-item-gi>
                            <n-form-item-gi
                                :span="24"
                                label="所在部门"
                                path="department"
                            >
                                <n-input
                                    round
                                    v-model:value="registerInfo.department"
                                    placeholder="请输入所属部门"
                                />
                            </n-form-item-gi>
                        </n-grid>
                    </div>
                    <div v-show="currentStep === 3">
                        <n-result
                            status="success"
                            title="注册成功"
                            description="欢迎加入！"
                        >
                            <template #footer>
                                <n-button
                                    class="h-50 w-150 rounded-12 text-16"
                                    @click="goToLogin"
                                    type="primary"
                                >
                                    <template #icon>
                                        <n-icon>
                                            <ArrowBackIosFilled />
                                        </n-icon>
                                    </template>
                                    返回登录页面
                                </n-button>
                            </template>
                        </n-result>
                    </div>
                </n-form>
            </div>

            <div class="mt-20 h-20"></div>

            <div class="mt-20 w-full f-c-c gap-15">
                <n-button
                    class="h-50 w-120 rounded-12 text-16"
                    @click="$emit('goBack')"
                    v-if="currentStep < 3"
                >
                    返回
                </n-button>
                <div class="ml-auto">
                    <n-button
                        class="h-50 w-120 rounded-12 text-16"
                        @click="currentStep--"
                        v-if="currentStep > 1 && currentStep < 3"
                    >
                        <template #icon>
                            <n-icon>
                                <ArrowBackFilled />
                            </n-icon>
                        </template>
                        上一步
                    </n-button>
                    <n-button
                        class="h-50 w-120 rounded-12 text-16"
                        @click="next"
                        v-if="currentStep < 2"
                        type="primary"
                    >
                        <template #icon>
                            <n-icon>
                                <ArrowForwardFilled />
                            </n-icon>
                        </template>
                        下一步
                    </n-button>
                    <n-button
                        class="h-50 w-120 rounded-12 text-16 ml-10"
                        type="primary"
                        :loading="loading"
                        @click="save"
                        v-if="currentStep > 1 && currentStep < 3"
                    >
                        <template #icon>
                            <n-icon>
                                <BorderColorFilled />
                            </n-icon>
                        </template>
                        注册
                    </n-button>
                </div>
            </div>
        </n-spin>
    </div>
</template>

<script setup lang="ts">
import { TeacherRegisterInfo } from "@/api/authApi";
import { ref, onMounted, unref, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import type { FormItemRule, SelectOption, FormInst } from "naive-ui";
import {
    ArrowBackFilled,
    ArrowForwardFilled,
    BorderColorFilled,
    ArrowBackIosFilled,
} from "@vicons/material";
const onlyAllowNumber = (value: string) => !value || /^\d+$/.test(value);
import UniversitySelector from "@/components/university/UniversitySelector.vue";
import optionsApi from "@/api/optionsApi";
import authApi from "@/api/authApi";
import { isArray } from "@/utils";

const router = useRouter();
// 定义事件
const emit = defineEmits<{
    goBack: [];
}>();

const loading = ref(false);
const currentStep = ref(1);
const formRef = ref<FormInst>();

const registerInfo = ref(<TeacherRegisterInfo>{
    account: "",
    birth_date: null,
    department: "",
    email: "",
    gender: "",
    name: "",
    password: "",
    phone: "",
    profession: "",
    professional_title: "",
    subject: "",
    university: "",
    verify_code: "",
    verify_password: "",
});

const counting = ref(false);
const counter = ref(60);
const sending = ref(false);
let timer: ReturnType<typeof setInterval> | null;
const getVerifyCode = async () => {
    if (!/^1[3456789]\d{9}$/.test(registerInfo.value.phone)) {
        window.$message.warning("请填写正确的手机号");
    } else {
        sending.value = true;
        try {
            const { code, data } = await authApi.getVerifyCode(
                registerInfo.value.phone
            );
            if (code === 1) {
                window.$message.success("验证码已发送");
                startCountdown();

                window.$notify.success({
                    title: "验证码",
                    content: data.verify_code,
                });
            }
        } catch (e: any) {
            window.$message.error(e.msg || "发送失败");
        } finally {
            sending.value = false;
        }
    }
};

/* 倒计时逻辑 */
const startCountdown = () => {
    counting.value = true;
    counter.value = 60;
    timer = setInterval(() => {
        counter.value--;
        if (counter.value <= 0) {
            clearInterval(timer!);
            counting.value = false;
        }
    }, 1000);
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
const init = async () => {
    loading.value = true;
    await getSubjectOptions();
    await getProfessionalTitleOptions();
    await getProfessionOptions();
    loading.value = false;
};

const next = async () => {
    currentStep.value++;
};

const save = async () => {
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            if (
                registerInfo.value.password !=
                registerInfo.value.verify_password
            ) {
                window.$message.error("两次输入的密码不一致");
                return;
            }
            // if (isArray(registerInfo.value.verify_code)) {
            //     // @ts-ignore
            //     registerInfo.value.verify_code =
            //         registerInfo.value.verify_code.join("");
            // }

            loading.value = true;
            const { code } = await authApi.registerTeacher(registerInfo.value);

            if (code === 1) {
                window.$message.success("注册成功！");
                currentStep.value++;
            }
            loading.value = false;
        } else {
            console.log(errors);
            window.$message.error("请完善信息");
        }
    });
};

const goToLogin = () => {
    router.push("/login");
};

onMounted(async () => {
    init();
});

/* 组件卸载清理定时器 */
onUnmounted(() => {
    if (timer) clearInterval(timer);
});

const rules = {
    account: {
        required: true,
        message: "请输入账号",
        trigger: ["input", "blur"],
        validator: (rule: FormItemRule, value: string) => {
            return /^(?![_]*$)[A-Za-z0-9_]+$/.test(value);
        },
    },
    name: {
        required: true,
        message: "请输入姓名",
        trigger: ["input", "blur"],
    },
    password: {
        required: true,
        message: "请输入8-20位由字母、数字组成的密码",
        trigger: ["input", "blur"],
        validator: (rule: FormItemRule, value: string) => {
            return /^[A-Za-z0-9]{8,20}$/.test(value);
        },
    },
    verify_password: {
        required: true,
        message: "请再次输入密码",
        trigger: ["input", "blur"],
        validator: (rule: FormItemRule, value: string) => {
            return /^[A-Za-z0-9]{8,20}$/.test(value);
        },
    },
    phone: {
        required: true,
        message: "请输入正确的电话",
        validator: (rule: FormItemRule, value: string) => {
            return /^1[3456789]\d{9}$/.test(value);
        },
        trigger: ["blur"],
    },
    email: {
        required: true,
        message: "请输入正确的邮箱",
        validator: (rule: FormItemRule, value: string) => {
            return /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(
                value
            );
        },
        trigger: ["blur"],
    },
    university: {
        required: true,
        message: "请选择学校",
        trigger: ["input", "blur"],
    },
    birth_date: {
        required: true,
        message: "请选择出生日期",
        trigger: ["blur", "change"],
    },
    department: {
        required: true,
        message: "请输入所在部门",
        trigger: ["input", "blur"],
    },
    gender: {
        required: true,
        message: "请选择性别",
        trigger: ["change"],
    },
    profession: {
        required: true,
        message: "请输入职务",
        trigger: ["input", "blur"],
    },
    professional_title: {
        required: true,
        message: "请输入职称",
        trigger: ["input", "blur"],
    },
    subject: {
        required: true,
        message: "请输入学科",
        trigger: ["input", "blur"],
    },
    verify_code: [
        {
            required: true,
            message: "请输入验证码",
            validator: (_: any, value: string[] | null) => {
                if (value === null) return false;
                return value.length >= 6;
            },
            trigger: ["blur"],
        },
    ],
};
</script>

<style scoped></style>
