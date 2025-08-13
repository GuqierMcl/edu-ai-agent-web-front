<template>
    <n-dropdown :options="options" @select="handleSelect">
        <div class="flex cursor-pointer items-center">
            <n-avatar
                :bordered="true"
                round
                :src="
                    userStore.userInfo.avatar_url?.length
                        ? userStore.userInfo.avatar_url
                        : DefaultAvatar
                "
                :fallback-src="DefaultAvatar"
            />
            <span class="ml-10">{{ userStore.name }}</span>
        </div>
    </n-dropdown>
    <n-modal
        :title="showTitle"
        class="w-520 p-10"
        v-model:show="showModal"
        preset="card"
        size="huge"
    >
        <template v-if="isEdit">
            <div class="cursor-pointer mb-30">
                <n-upload
                    action="123"
                    :default-upload="false"
                    list-type="image"
                    accept="image/*"
                    :show-file-list="false"
                    :max="1"
                    @before-upload="updateAvater"
                    class="f-c-c"
                >
                    <n-avatar
                        :bordered="true"
                        round
                        :size="150"
                        :src="
                            copyUserInfo.avatar_url?.length
                                ? copyUserInfo.avatar_url
                                : DefaultAvatar
                        "
                        :fallback-src="DefaultAvatar"
                    />
                </n-upload>
            </div>
            <n-form
                ref="editFormRef"
                :rules="rules"
                :model="copyUserInfo"
                label-placement="left"
                label-width="auto"
                require-mark-placement="right-hanging"
            >
                <n-form-item label="昵称" path="nickname">
                    <n-input
                        v-model:value="copyUserInfo.nickname"
                        placeholder="请输入昵称"
                    />
                </n-form-item>
                <n-form-item label="姓名" path="name">
                    <n-input
                        v-model:value="copyUserInfo.name"
                        placeholder="请输入姓名"
                    />
                </n-form-item>
                <n-form-item label="电话" path="phone">
                    <n-input
                        v-model:value="copyUserInfo.phone"
                        placeholder="请输入电话"
                    />
                </n-form-item>
                <n-form-item label="邮箱" path="email">
                    <n-input
                        v-model:value="copyUserInfo.email"
                        placeholder="请输入邮箱"
                    />
                </n-form-item>
                <n-form-item label="上一次登录时间">
                    <n-input v-model:value="userInfo.last_login" disabled />
                </n-form-item>
            </n-form>
        </template>
        <template v-else>
            <n-form
                ref="resetFormRef"
                :rules="passwordRules"
                :model="resetPasswordInfo"
                label-placement="left"
                label-width="auto"
                require-mark-placement="right-hanging"
            >
                <n-form-item label="密码" path="password">
                    <n-input
                        v-model:value="resetPasswordInfo.oldPassword"
                        type="password"
                        show-password-on="mousedown"
                    />
                </n-form-item>
                <n-form-item label="新密码" path="newPassword">
                    <n-input
                        v-model:value="resetPasswordInfo.newPassword"
                        type="password"
                        show-password-on="mousedown"
                    />
                </n-form-item>
                <n-form-item
                    ref="rPasswordFormItemRef"
                    first
                    path="reenteredPassword"
                    label="重复密码"
                >
                    <n-input
                        v-model:value="resetPasswordInfo.reenteredPassword"
                        :disabled="!resetPasswordInfo.newPassword"
                        type="password"
                        show-password-on="mousedown"
                        @keydown.enter.prevent
                    />
                </n-form-item>
            </n-form>
        </template>
        <div class="w-full flex justify-end">
            <n-button @click="showModal = false">取消</n-button>
            <n-button ml-20 type="primary" @click="save">保存</n-button>
        </div>
    </n-modal>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore } from "@/store";
import { renderIcon } from "@/utils";
import {
    ExitToAppRound,
    EditNoteOutlined,
    LockOpenOutlined,
} from "@vicons/material";
import { FormItemRule, UploadFileInfo } from "naive-ui";
import DefaultAvatar from "@/assets/images/defaultAvatar.png";
import userApi from "@/api/userApi";
import resourceApi from "@/api/resourceApi";

const showModal = ref(false);
const showTitle = ref("修改个人信息");
const isEdit = ref(false);
const userStore = useUserStore();
const editFormRef = ref();
const resetFormRef = ref();
const userInfo = JSON.parse(JSON.stringify(userStore.userInfo));

const copyUserInfo = ref<UserQueryInfo>({});
const resetPasswordInfo = ref({
    oldPassword: "",
    newPassword: "",
    reenteredPassword: "",
});

const options = [
    {
        label: "修改账户信息",
        key: "edit",
        icon: renderIcon(EditNoteOutlined, { size: "14px" }),
    },
    {
        label: "修改密码",
        key: "resetPassword",
        icon: renderIcon(LockOpenOutlined, { size: "14px" }),
    },
    {
        label: "退出登录",
        key: "logout",
        icon: renderIcon(ExitToAppRound, { size: "14px" }),
    },
];

const rules = {
    name: [
        {
            required: true,
            message: "请输入姓名",
            trigger: ["input", "blur"],
        },
    ],
    nickname: [
        {
            required: true,
            message: "请输入昵称",
            trigger: ["input", "blur"],
        },
    ],
    phone: [
        {
            required: true,
            message: "请输入正确的电话",
            validator: (rule: FormItemRule, value: string) => {
                if (value == null || value == "") {
                    return true;
                }
                return /^1[3456789]\d{9}$/.test(value);
            },
            trigger: ["blur"],
        },
    ],
    email: [
        {
            required: false,
            message: "请输入正确的邮箱",
            validator: (rule: FormItemRule, value: string) => {
                console.log(value);

                if (value == null || value == "") {
                    return true;
                }
                return /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(
                    value
                );
            },
            trigger: ["blur"],
        },
    ],
};

const passwordRules = {
    password: [
        {
            required: true,
            message: "请输入密码",
        },
    ],
    newPassword: [
        {
            required: true,
            message: "请输入新密码",
        },
    ],
    reenteredPassword: [
        {
            required: true,
            message: "请再次输入密码",
            trigger: ["input", "blur"],
        },
        {
            validator: validatePasswordStartWith,
            message: "两次密码输入不一致",
            trigger: "input",
        },
        {
            validator: validatePasswordSame,
            message: "两次密码输入不一致",
            trigger: ["blur", "password-input"],
        },
    ],
};

function handleSelect(key: string) {
    if (key === "logout") {
        window.$dialog.info({
            title: "提示",
            type: "info",
            content: "确认退出？",
            positiveText: "确定",
            negativeText: "取消",
            onPositiveClick: () => {
                userStore.logout();
                window.$message.success("已退出登录");
            },
            onNegativeClick: () => {},
        });
    } else if (key === "edit") {
        showTitle.value = "修改个人信息";
        isEdit.value = true;
        showModal.value = true;
        copyUserInfo.value = userInfo;
        copyUserInfo.value.userId = userStore.userInfo.id;
    } else if (key === "resetPassword") {
        showTitle.value = "修改密码";
        isEdit.value = false;
        showModal.value = true;
    }
}

function validatePasswordStartWith(rule: FormItemRule, value: string): boolean {
    return (
        !!resetPasswordInfo.value.newPassword &&
        resetPasswordInfo.value.newPassword.startsWith(value) &&
        resetPasswordInfo.value.newPassword.length >= value.length
    );
}
function validatePasswordSame(rule: FormItemRule, value: string): boolean {
    return value === resetPasswordInfo.value.newPassword;
}

const reserUserInfo = async () => {
    const { code, data } = await userApi.getUser();
    userStore.setUserInfo(data);
};
const updateAvater = async ({ file }: { file: UploadFileInfo }) => {
    const formData = new FormData();
    console.log(file);
    // @ts-ignore
    formData.append("name", file.name.split(".")[0]);
    // @ts-ignore
    formData.append("type", "0");
    // @ts-ignore
    formData.append("sequence", 1);
    // @ts-ignore
    formData.append("file", file.file);
    const { code, data } = await resourceApi.updateAvatar(formData);
    if (code == 1) {
        window.$message.success("头像上传成功，点击“保存”按钮更新用户信息。");
        copyUserInfo.value.avatar = data.id;
        copyUserInfo.value.avatar_url = data.remote_file_url;
    }

    return false;
};

const save = () => {
    if (isEdit.value) {
        editFormRef.value?.validate(async (errors: any) => {
            if (!errors) {
                const { code } = await userApi.updateUser(
                    <UserQueryInfo>copyUserInfo.value
                );
                if (code == 1) {
                    window.$message.success("修改个人信息成功");
                    reserUserInfo();
                    showModal.value = false;
                }
            } else {
                window.$message.error("请完善信息");
            }
        });
    } else {
        resetFormRef.value?.validate(async (errors: any) => {
            if (!errors) {
                console.log("修改密码");
                const { code } = await userApi.resetUserPassword(
                    resetPasswordInfo.value
                );
                if (code == 1) {
                    window.$message.success("修改密码成功");
                    showModal.value = false;
                    userStore.logout();
                    window.$message.success("已退出登录");
                }
            } else {
                window.$message.error("请完善信息");
            }
        });
    }
};
</script>
