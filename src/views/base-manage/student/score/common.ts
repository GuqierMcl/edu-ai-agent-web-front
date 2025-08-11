import { h } from "vue";
import { NTag } from "naive-ui";
import type { DataTableColumns } from "naive-ui";

export const generateColumns = () => {
  const columns: DataTableColumns<Student> = [
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
      width: 45,
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
      title: "学院",
      key: "collegeName",
      width: 90,
      ellipsis: { tooltip: true },
    },
    {
      title: "专业",
      key: "majorName",
      width: 90,
      ellipsis: { tooltip: true },
    },
    {
      title: "年级",
      key: "gradeName",
      width: 90,
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
      title: "等级",
      key: "rankName",
      width: 120,
      ellipsis: { tooltip: true },
      render(row) {
        return [
          h(
            NTag,
            {
              style: {
                marginRight: "6px",
              },
              type: "info",
              bordered: false,
            },
            {
              default: () => row.rankName,
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
  },
];
