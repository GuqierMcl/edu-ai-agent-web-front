import type { Component } from "vue";

declare namespace Page {
  interface Tag {
    title: string;
    icon: Component;
    routeName: string;
  }

  type Type = "check" | "edit" | "add";

  interface Req {
    page: number;
    pageSize: number;
    [key: string]: any;
  }

  interface Resp<T> {
    records: T[];
    total: number;
  }
}

export = Page;
export as namespace Page;
