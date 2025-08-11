import { h } from "vue";
import type { Component } from "vue";
import { NIcon } from "naive-ui";

export const renderIcon = (icon: Component, props: any = { size: "12px" }) => {
  return () => h(NIcon, props, { default: () => h(icon) });
};
