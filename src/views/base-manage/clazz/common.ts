import { h } from "vue";
import { NButton, NIcon } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import { EditNoteRound, CloseRound } from "@vicons/material";

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
      title: "班级名",
      key: "name",
      width: 120,
      ellipsis: { tooltip: true },
    },
    {
      title: "学院",
      key: "collegeName",
      width: 120,
      ellipsis: { tooltip: true },
    },
    {
      title: "专业",
      key: "majorName",
      width: 120,
      ellipsis: { tooltip: true },
    },
    {
      title: "年级",
      key: "gradeName",
      width: 120,
      ellipsis: { tooltip: true },
    },
    {
      title: "学生总数",
      key: "num",
      width: 90,
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

export const rules = {
  collegeId: {
    required: true,
    message: "请选择学院",
    trigger: ["change"],
  },
  majorId: {
    required: true,
    message: "请选择专业",
    trigger: ["change"],
  },
  gradeId: {
    required: true,
    message: "请选择年级",
    trigger: ["change"],
  },
  clazzNo: {
    required: true,
    message: "请选择班级",
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

const generateClazzNo = () => {
  const array = [];
  for (let i = 1; i <= 10; i++) {
    array.push({
      label: `${i}班`,
      value: i + "",
    });
  }
  return array;
};

export const clazzNoOptions = generateClazzNo();
