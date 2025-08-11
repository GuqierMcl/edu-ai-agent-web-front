import { h } from "vue";
import { NButton, NIcon } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import { EditNoteRound, CloseRound } from "@vicons/material";

export const generateColumns = (doEdit: Function, doDelete: Function) => {
  const columns: DataTableColumns<Teacher> = [
    {
      title: "序号",
      key: "no",
      width: 60,
      fixed: "left",
      render: (_, index) => `${index + 1}`,
    },
    {
      title: "角色名称",
      key: "roleName",
      width: 120,
    },
    {
      title: "角色码",
      key: "roleKey",
      width: 120,
    },
    {
      title: "描述",
      key: "des",
      width: 240,
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
              default: () => "编辑权限",
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
  roleName: {
    required: true,
    message: "请输入角色名称",
    trigger: ["input", "blur"],
  },
  roleKey: {
    required: true,
    message: "请输入角色码",
    trigger: ["input", "blur"],
  },
  des: {
    required: true,
    message: "请输入角色描述",
    trigger: ["input", "blur"],
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
