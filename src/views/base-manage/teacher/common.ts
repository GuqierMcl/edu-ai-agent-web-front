import { h } from "vue";
import { NAvatar, NButton, NIcon, NImage, FormItemRule } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import { EditNoteRound, CloseRound } from "@vicons/material";
import DefaultAvatar from "@/assets/images/defaultAvatar.png";
import { identity } from "@vueuse/core";

export const generateColumns = (doEdit: Function, doDelete: Function) => {
  const columns: DataTableColumns<Teacher> = [
    { type: "selection", fixed: "left" },
    {
      title: "序号",
      key: "no",
      width: 60,
      fixed: "left",
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
      width: 120,
      ellipsis: { tooltip: true },
    },
    {
      title: "姓名",
      key: "user.name",
      width: 90,
      ellipsis: { tooltip: true },
    },
    {
      title: "性别",
      key: "gender",
      width: 90,
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
      title: "手机号",
      key: "user.phone",
      width: 120,
      ellipsis: { tooltip: true },
    },
    {
      title: "学校",
      key: "university.school_name",
      width: 120,
      ellipsis: { tooltip: true },
    },
    {
      title: "邮箱",
      key: "user.email",
      width: 150,
      ellipsis: { tooltip: true },
    },
    {
      title: "出生日期",
      key: "birth_date",
      width: 100,
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
      title: "操作",
      key: "actions",
      width: 240,
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
  name: {
    required: true,
    message: "请输入姓名",
    trigger: ["input", "blur"],
  },
  account: {
    required: true,
    message: "请输入账号",
    trigger: ["input", "blur"],
  },
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
  email: [
    {
      required: true,
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
  profession: {
    required: true,
    message: "请输入职业",
    trigger: ["input", "blur"],
  },
  department: {
    required: true,
    message: "请输入部门",
    trigger: ["input", "blur"],
  },
  birth_date: [
    {
      required: true,
      message: "请输入生日",
      trigger: ["input", "blur"],
    },
  ],
  university: [
    {
      required: true,
      message: "请选择学校",
      trigger: ["input", "blur"],
    },
  ],
  gender:
  {
    required: true,
    message: "请选择性别",
    trigger: ["change"],
  },
  subject: [
    {
      required: true,
      message: "请输入科目",
      trigger: ["input", "blur"],
    },
  ],
  professional_title: [
    {
      required: true,
      message: "请输入职称",
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

