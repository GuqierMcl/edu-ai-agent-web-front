import { h } from "vue";
import { NButton, NIcon, NImage } from "naive-ui";
import type { DataTableColumns, FormItemRule } from "naive-ui";
import { EditNoteRound, CloseRound, SearchRound } from "@vicons/material";
import { RouterLink } from "vue-router";

export const generateColumns = (doEdit: Function, doDelete: Function) => {
  const columns: DataTableColumns<Course> = [
    {
      title: "序号",
      key: "no",
      width: 60,
      render: (_, index) => `${index + 1}`,
    },
    {
      title: "封面",
      key: "imageUrl",
      width: 120,
      align: "center",
      render(row) {
        return h(NImage, {
          width: 120,
          src: row.imageUrl,
        });
      },
    },
    {
      title: "课程名",
      key: "name",
      width: 120,
      ellipsis: { tooltip: true },
    },
    {
      title: "操作",
      key: "actions",
      width: 240,
      align: "center",
      render(row) {
        return [
          h(
            RouterLink,
            {
              to: `/book/tree/${row.id}/${row.name}/${row.itemNum}`,
            },
            {
              default: () =>
                h(
                  NButton,
                  {
                    size: "small",
                    type: "primary",
                    style: "margin-right: 15px",
                  },
                  {
                    icon: () =>
                      h(NIcon, {
                        component: SearchRound,
                      }),
                    default: () => "查看书籍",
                  }
                ),
            }
          ),
          h(
            NButton,
            {
              size: "small",
              type: "warning",
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
    trigger: ["input", "blur"],
    validator(rule: FormItemRule, value: string) {
      if (!value) {
        return new Error("请输入名称");
      } else if (value.length > 12) {
        return new Error("课程名称不能超过12个字符");
      }
      return true;
    },
  },
  sequence: {
    required: false,
    message: "请输入排序",
    trigger: ["input", "blur"],
  },
  file: {
    required: true,
    trigger: ["input", "blur"],
    validator(rule: FormItemRule, value: string) {
      if (!value) {
        return new Error("请上传封面");
      }
      return true;
    },
  },
};
