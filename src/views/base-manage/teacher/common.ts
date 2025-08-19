import { h } from "vue";
import { NButton, NIcon } from "naive-ui";
import type { DataTableColumns, FormItemRule } from "naive-ui";
import { EditNoteRound, CloseRound } from "@vicons/material";
import { Type } from "naive-ui/lib/button/src/interface";

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
      title: "账号",
      key: "account",
      width: 120,
      ellipsis: { tooltip: true },
    },
    {
      title: "姓名",
      key: "name",
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
      key: "phone",
      width: 120,
      ellipsis: { tooltip: true },
    },
    {
      title: "邮箱",
      key: "email",
      width: 150,
      ellipsis: { tooltip: true },
    },
    {
      title: "职位",
      key: "position",
      width: 90,
      render(row) {
        let name: string;
        let type: Type = "default";
        if (row.position == "0") {
          name = "管理员";
          type = "info";
        } else if (row.position == "1") {
          name = "教师";
          type = "success";
        }
        return h(
          NButton,
          {
            tertiary: true,
            type: type,
          },
          { default: () => name }
        );
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

export const generalOptions = [
  {
    value: "0",
    label: "管理员",
  },
  {
    value: "1",
    label: "教师",
  },
];

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
  position: {
    required: true,
    message: "请选择职位",
    trigger: ["change", "blur"],
  },
  phone: {
    trigger: ["input", "blur"],
    validator(rule: FormItemRule, value: string) {
      if (!value) {
        return new Error("请输入手机号");
      } else if (!/^1[3456789]\d{9}$/.test(value)) {
        return new Error("请输入正确的手机号");
      }
      return true;
    },
  },
  email: {
    trigger: ["input", "blur"],
    validator(rule: FormItemRule, value: string) {
      if (!value) {
        return new Error("请输入邮箱");
      } else if (
        !/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value)
      ) {
        return new Error("请输入正确的邮箱");
      }
      return true;
    },
  },
  gender: {
    required: true,
    message: "请选择性别",
    trigger: ["change"],
  },
};
