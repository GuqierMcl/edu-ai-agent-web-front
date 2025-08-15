<template>
    <div class="form-container">
        <!-- 头像展示区域 -->
        <div class="avatar-container flex items-center mb-8" v-if="isEdit">
            <n-avatar
                round
                :src="formData.user?.avatar_url || DefaultAvatar"
                :size="100"
                :name="formData.user?.name || '未知用户'"
            />
            <div class="ml-25">
                <p class="font-bold text-5rem">
                    {{ formData.user?.name || "未设置名称" }}
                </p>
                <p class="text-gray-500">
                    @{{ formData.user?.account || "未设置账号" }}
                </p>
            </div>
        </div>

        <n-form
            ref="formRef"
            :model="studentData"
            :rules="rules"
            label-placement="left"
            label-width="auto"
            require-mark-placement="right-hanging"
        >
            <n-form-item label="账号" path="account" v-if="!isEdit">
                <n-input
                    v-model:value="studentData.account"
                    placeholder="请输入账号"
                    :disabled="isEdit"
                />
            </n-form-item>
            <n-form-item label="密码" path="password" v-if="!isEdit">
                <n-input
                    v-model:value="studentData.password"
                    placeholder="请输入学生账号密码，为空则为初始密码"
                />
            </n-form-item>

            <n-form-item label="姓名" path="name">
                <n-input
                    v-model:value="studentData.name"
                    placeholder="请输入姓名"
                />
            </n-form-item>
            <n-form-item label="昵称" path="nickname">
                <n-input
                    v-model:value="studentData.nickname"
                    placeholder="请输入昵称"
                />
            </n-form-item>
            <n-form-item label="性别" path="gender">
                <n-radio-group v-model:value="formData.gender">
                    <n-radio value="1"> 男 </n-radio>
                    <n-radio value="0"> 女 </n-radio>
                </n-radio-group>
            </n-form-item>
            <n-form-item label="手机号" path="phone">
                <n-input
                    v-model:value="studentData.phone"
                    placeholder="请输入手机号"
                />
            </n-form-item>
            <n-form-item label="邮箱" path="email">
                <n-input
                    v-model:value="studentData.email"
                    placeholder="请输入邮箱"
                />
            </n-form-item>
            <n-form-item label="地址" path="address">
                <n-input
                    v-model:value="studentData.address"
                    placeholder="请输入地址"
                />
            </n-form-item>
            <n-form-item label="学号" path="student_no">
                <n-input
                    v-model:value="studentData.student_no"
                    placeholder="请输入学号"
                />
            </n-form-item>
            <n-form-item label="生日" path="birth_date">
                <n-date-picker
                    v-model:formatted-value="studentData.birth_date"
                    value-format="yyyy-MM-dd"
                    placeholder="请输入生日"
                    type="date"
                    clearable
                />
            </n-form-item>

            <!-- 可编辑字段 -->
            <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <n-form-item label="状态" path="status">
                    <n-select
                        v-model:value="studentData.status"
                        :options="statusOptions"
                        placeholder="请选择状态"
                        :loading="loading"
                    />
                </n-form-item>

                <n-form-item label="身份" path="identity">
                    <n-select
                        v-model:value="studentData.identity"
                        :options="identityOptions"
                        placeholder="请选择身份"
                        :loading="loading"
                    />
                </n-form-item>
            </div>
            <n-form-item label="备注" path="remark">
                <n-input
                    maxlength="200"
                    show-count
                    clearable
                    type="textarea"
                    v-model:value="studentData.remark"
                    placeholder="请输入备注"
                />
            </n-form-item>
        </n-form>
        <div class="w-full flex justify-end mt-8">
            <n-button @click="emits('close')">取消</n-button>
            <n-button ml-20 type="primary" @click="save" :loading="loading"
                >保存</n-button
            >
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import type { FormInst, CascaderOption, SelectOption } from "naive-ui";
import { rules } from "./common";
import studentApi from "@/api/studentApi";
import optionsApi from "@/api/optionsApi";
import DefaultAvatar from "@/assets/images/defaultAvatar.png";

const loading = ref(false);

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

const studentData = ref<StudentAdd>({
    account: "",
    address: "",
    birth_date: "2025-06-30",
    email: "",
    enrollment: "",
    gender: "",
    identity: "",
    name: "",
    nickname: "",
    password: "",
    phone: "",
    remark: "",
    school_no: "",
    status: "",
    student_no: "",
});

const formRef = ref<FormInst>();
const identityOptions = ref<SelectOption[]>([]);
const statusOptions = ref<SelectOption[]>([]);

// 获取身份选项
const getIdentityOptions = async () => {
    const { code, data } = await optionsApi.getOptions("student_identity");
    if (code === 1) {
        identityOptions.value = data;
    }
};

// 获取状态选项
const getStatusOptions = async () => {
    const { code, data } = await optionsApi.getOptions("student_status");
    if (code === 1) {
        statusOptions.value = data;
    }
};

const save = async () => {
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            loading.value = true;
            let resCode;
            if (props.isEdit) {
                const { code } = await studentApi.update(<StudentUpdate>{
                    ...studentData.value,
                    id: props.formData.id,
                });
                resCode = code;
            } else {
                const { code } = await studentApi.add(
                    <StudentAdd>studentData.value
                );
                resCode = code;
            }

            if (resCode === 1) {
                window.$message.success("保存成功");
                emits("reloadList");
                emits("close");
            }
            loading.value = false;
        } else {
            console.log(errors);
            window.$message.error("请完善信息");
        }
    });
};

const init = async () => {
    studentData.value = {
        ...props.formData,
        account: props.formData.user?.account || "",
        password: "",
        name: props.formData.user?.name || "",
        email: props.formData.user?.email || "",
        nickname: props.formData.user?.nickname || "",
        phone: props.formData.user?.phone || "",
    };
};

onMounted(async () => {
    loading.value = true;
    // 先获取选项数据
    await getIdentityOptions();
    await getStatusOptions();
    // 再初始化表单
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

.grid {
    display: grid;
}

.grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
}

.md\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
}

gap-4 {
    gap: 1rem;
}

.mt-8 {
    margin-top: 2rem;
}

.mb-8 {
    margin-bottom: 2rem;
}

.ml-4 {
    margin-left: 1rem;
}

.text-lg {
    font-size: 1.125rem;
}

.font-medium {
    font-weight: 500;
}

.text-gray-500 {
    color: #6b7280;
}
</style>
