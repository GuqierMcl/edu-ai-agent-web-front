import { h } from "vue";
import { NButton, NIcon, NImage } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import { EditNoteRound, CloseRound } from "@vicons/material";

export const generateColumns = (doEdit: Function, doDelete: Function) => {
  const columns: DataTableColumns<Resource> = [
    { type: "selection", fixed: "left" },
    {
      title: "序号",
      key: "no",
      width: 50,
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
      title: "类型",
      key: "type",
      width: 120,
      ellipsis: { tooltip: true },
      render(row) {
        const option = options.find((opt) => opt.value === row.type);
        console.log(option);

        return option ? option.label : "";
      },
    },
    {
      title: "排序",
      key: "sequence",
      width: 60,
      ellipsis: { tooltip: true },
    },
    {
      title: "缩略图",
      key: "remote_file_url",
      width: 120,
      align: "center",
      render(row) {
        return h(NImage, {
          width: 120,
          maxHeight: 120,
          src: row.remote_file_url,
        });
      },
    },
    {
      title: "大小",
      key: "size",
      width: 100,
      align: "center",
      render(row) {
        return `${row.size} Bytes`;
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

export const batchRules = {
  type: {
    required: true,
    message: "请选择类型",
    trigger: ["change", "blur"],
  },
};

export const rules = {
  name: {
    required: true,
    message: "请输入名称",
    trigger: ["input", "blur"],
  },
  type: {
    required: true,
    message: "请选择类型",
    trigger: ["change", "blur"],
  },
  sequence: {
    required: false,
    message: "默认排序为1",
    trigger: ["input", "blur"],
  },
};

export const options = [
    {
        label: "请选择资源类型",
        value: "",
    },
    {
        label: "图片",
        value: "0",
    },
    {
        label: "文档",
        value: "1",
    },
    {
        label: "视频",
        value: "2",
    },
];