import { h } from "vue";
import { NButton, NIcon } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import { EditNoteRound, CloseRound } from "@vicons/material";

export const generateColumns = (doEdit: Function, doDelete: Function) => {
  const columns: DataTableColumns<Code> = [
    { type: "selection", fixed: "left" },
    {
      title: "序号",
      key: "no",
      width: 60,
      fixed: "left",
      render: (_, index) => `${index + 1}`,
    },
    {
      title: "名称",
      key: "name",
      width: 90,
      ellipsis: { tooltip: true },
    },
    {
      title: "代码",
      key: "code",
      width: 120,
      ellipsis: { tooltip: true },
    },
    {
      title: "类型",
      key: "typeName",
      width: 120,
      ellipsis: { tooltip: true },
    },
    {
      title: "排序",
      key: "sequence",
      width: 60,
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
