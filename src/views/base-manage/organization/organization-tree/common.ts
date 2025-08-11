import type { FormItemRule } from "naive-ui";

export const formRules = {
  name: {
    required: true,
    message: "请输入姓名",
    trigger: ["input", "blur"],
  },
  sequence: {
    required: true,
    trigger: ["change", "blur"],
    validator(rule: FormItemRule, value: string) {
      if (!value) {
        return new Error("请输入排序序号");
      } else if (!/^\d*$/.test(value)) {
        return new Error("序号应该为整数");
      }
      return true;
    },
  },
};

export const formAddRules = {
  name: {
    required: true,
    message: "请输入组织名称",
    trigger: ["input", "blur"],
  },
  sequence: {
    required: true,
    trigger: ["change", "blur"],
    validator(rule: FormItemRule, value: string) {
      if (!value) {
        return new Error("请输入排序序号");
      } else if (!/^\d*$/.test(value)) {
        return new Error("序号应该为整数");
      }
      return true;
    },
  },
  type: {
    required: true,
    message: "请选择类型",
    trigger: ["change"],
  },
};
