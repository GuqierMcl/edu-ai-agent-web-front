import { h } from "vue";
import { NButton, NIcon } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import { EditNoteRound, CloseRound } from "@vicons/material";

export const generateColumns = (doEdit: Function, doDelete: Function) => {
  const columns: DataTableColumns = [
    { type: "selection", fixed: "left" },
    {
      title: "序号",
      key: "id",
      width: 60,
      align: "center",
      fixed: "left",
      render: (_, index) => `${index + 1}`,
    },
    {
      title: "账号",
      key: "account",
      width: 90,
      ellipsis: { tooltip: true },
    },
    {
      title: "姓名",
      key: "name",
      width: 90,
      ellipsis: { tooltip: true },
    },
    {
      title: "昵称",
      key: "nickname",
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
        } else if (row.gender == "1") {
          return "男";
        }
      },
      ellipsis: { tooltip: true },
    },
    {
      title: "电话",
      key: "phone",
      width: 120,
      ellipsis: { tooltip: true },
    },
    {
      title: "邮箱",
      key: "email",
      width: 120,
      ellipsis: { tooltip: true },
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

export const addRules = {
  account: {
    required: true,
    message: "请输入账号",
    trigger: ["input", "blur"],
  },
  password: {
    required: true,
    message: "请输入密码",
    trigger: ["input", "blur"],
  },
  name: {
    required: true,
    message: "请输入姓名",
    trigger: ["input", "blur"],
  },
  gender: {
    required: true,
    message: "请选择性别",
    trigger: ["change"],
  },
};

export const updateRules = {
  account: {
    required: true,
    message: "请输入账号",
    trigger: ["input", "blur"],
  },
  name: {
    required: true,
    message: "请输入姓名",
    trigger: ["input", "blur"],
  },
  gender: {
    required: true,
    message: "请选择性别",
    trigger: ["change"],
  },
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
