import { h } from "vue";
import { NButton, NIcon } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import { EditNoteRound, CloseRound } from "@vicons/material";

export const generateColumns = (doEdit: Function, doDelete: Function) => {
  const columns: DataTableColumns<Student> = [
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
      title: "年级",
      key: "gradeName",
      width: 90,
      ellipsis: { tooltip: true },
    },
    {
      title: "学院",
      key: "collegeName",
      width: 90,
      ellipsis: { tooltip: true },
    },
    {
      title: "专业",
      key: "majorName",
      width: 120,
      ellipsis: { tooltip: true },
    },
    {
      title: "班级",
      key: "clazzName",
      width: 120,
      ellipsis: { tooltip: true },
    },
    {
      title: "积分",
      key: "score",
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
  gender: {
    required: true,
    message: "请选择性别",
    trigger: ["change"],
  },
  clazzId: {
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
