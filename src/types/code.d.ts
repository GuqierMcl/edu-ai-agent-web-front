
export {};

declare global {
  interface CodeType {
    value?: string;
    label?: string;
  }

  interface Code {
    id?: string;
    code?: string;
    type?: string;
    name?: string;
    typeName?: string;
    sequence?: number;
  }

  interface CodeAdd {
    type?: string;
    name?: string;
    code?: string;
    sequence?: number;
  }

  interface CodeQueryInfo extends Page.Req {
    type?: string;
  }
}
