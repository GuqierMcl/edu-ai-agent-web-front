import { h } from "vue";
import { NAvatar, NButton, NIcon, NImage, FormItemRule } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import { EditNoteRound, CloseRound } from "@vicons/material";
import DefaultAvatar from "@/assets/images/defaultAvatar.png";
import { identity } from "@vueuse/core";

export const generateColumns = (doEdit: Function, doDelete: Function) => {
    const columns: DataTableColumns<Student> = [
        { type: "selection", fixed: "left" },
        {
            title: "序号",
            key: "no",
            width: 50,
            fixed: "left",
            align: "center",
            render: (_, index) => `${index + 1}`,
        },
        {
            title: "头像",
            key: "user.avatar_url",
            width: 60,
            ellipsis: { tooltip: true },
            render(row) {
                return h(NAvatar, {
                    width: 40,
                    round: true,
                    maxHeight: 40,
                    src: row.user.avatar_url
                        ? row.user.avatar_url
                        : DefaultAvatar,
                });
            },
        },
        {
            title: "账号",
            key: "user.account",
            width: 100,
            ellipsis: { tooltip: true },
        },
        {
            title: "姓名",
            key: "user.name",
            width: 90,
            ellipsis: { tooltip: true },
        },
        {
            title: "昵称",
            key: "user.nickname",
            width: 90,
            ellipsis: { tooltip: true },
        },
        {
            title: "性别",
            key: "gender",
            width: 60,
            render(row) {
                if (row.gender == "0") {
                    return "女";
                } else {
                    return "男";
                }
            },
            ellipsis: { tooltip: true },
        },
        {
            title: "电话",
            key: "user.phone",
            width: 120,
            ellipsis: { tooltip: true },
        },
        {
            title: "邮箱",
            key: "user.email",
            width: 180,
            ellipsis: { tooltip: true },
        },
        {
            title: "身份",
            key: "identity_name",
            width: 90,
            ellipsis: { tooltip: true },
        },
        {
            title: "状态",
            key: "status_name",
            width: 90,
            ellipsis: { tooltip: true },
            render(row) {
                return row.status_name != null ? row.status_name : "-";
            },
        },
        {
            title: "学号",
            key: "student_no",
            width: 90,
            ellipsis: { tooltip: true },
        },
        {
            title: "学校代码",
            key: "school_no",
            width: 90,
            ellipsis: { tooltip: true },
        },
        {
            title: "入学时间",
            key: "enrollment",
            width: 100,
            ellipsis: { tooltip: true },
        },
        {
            title: "出生日期",
            key: "birth_date",
            width: 100,
            ellipsis: { tooltip: true },
        },
        {
            title: "地址",
            key: "address",
            width: 90,
            ellipsis: { tooltip: true },
        },
        {
            title: "上次登录",
            key: "last_login",
            width: 100,
            ellipsis: { tooltip: true },
            render(row) {
                return row.user.last_login
                    ? new Date(row.user.last_login).toLocaleString()
                    : "-";
            },
        },
        {
            title: "备注",
            key: "remark",
            width: 90,
            ellipsis: { tooltip: true },
        },
        {
            title: "操作",
            key: "actions",
            width: 200,
            align: "center",
            fixed: "right",
            render(row) {
                return [
                    h(
                        NButton,
                        {
                            size: "small",
                            type: "primary",
                            style: "margin-right: 15px",
                            onClick: () => doEdit(row),
                        },
                        {
                            icon: () =>
                                h(NIcon, {
                                    component: EditNoteRound,
                                }),
                            default: () => "编辑",
                        }
                    ),
                    h(
                        NButton,
                        {
                            size: "small",
                            type: "error",
                            onClick: () => doDelete(row),
                        },
                        {
                            icon: () =>
                                h(NIcon, {
                                    component: CloseRound,
                                }),
                            default: () => "删除",
                        }
                    ),
                ];
            },
        },
    ];
    return {
        columns,
    };
};

export const rules = {
    account: {
        required: true,
        message: "请输入账号",
        trigger: ["input", "blur"],
    },
    name: {
        required: true,
        message: "请输入名称",
        trigger: ["input", "blur"],
    },
    password: {
        required: true,
        message: "请输入密码",
        trigger: ["input", "blur"],
        validator: (rule: FormItemRule, value: string) => {
            // 8-20位数字和字母组合
            return /^[A-Za-z0-9]{8,20}$/.test(value);
        },
    },
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
    identity: [
        {
            required: true,
            message: "请选择身份",
            trigger: ["input", "blur"],
        },
    ],
};

export const pageSizes = [
    {
        label: "10 每页",
        value: 10,
    },
    {
        label: "20 每页",
        value: 20,
    },
    {
        label: "30 每页",
        value: 30,
    },
    {
        label: "40 每页",
        value: 40,
    },
];

export const confirmTableColumns: DataTableColumns<StuExcel> = [
    {
        title: "序号",
        key: "no",
        width: 30,
        fixed: "left",
        render: (_, index) => `${index + 1}`,
    },
    {
        title: "账号",
        key: "account",
        width: 90,
    },
    {
        title: "姓名",
        key: "name",
        width: 60,
    },
    {
        title: "性别",
        key: "gender",
        width: 60,
    },
    {
        title: "学院",
        key: "college",
        width: 90,
    },
    {
        title: "专业",
        key: "major",
        width: 90,
    },
    {
        title: "年级",
        key: "grade",
        width: 60,
    },
    {
        title: "班级",
        key: "clazz",
        width: 90,
    },
    {
        title: "信息",
        key: "msg",
        width: 120,
        fixed: "right",
        render: (row) => {
            return h(
                "span",
                {
                    style: {
                        color: row.isSuccess ? "#18A058" : "red",
                    },
                },
                row.msg
            );
        },
    },
];
