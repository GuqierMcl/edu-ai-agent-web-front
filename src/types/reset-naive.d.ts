import type { TreeOption } from "naive-ui";

export {};

declare global {
  interface MyTreeOption extends TreeOption {
    data: any; // 节点详细信息放在data中
    parent?: MyTreeOption; // 父节点
    children?: MyTreeOption[]; // 子节点
  }
}
