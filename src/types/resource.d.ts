export {};

declare global {
  interface ResourceType {
    id?: string;
    code?: string;
    type?: string;
    name?: string;
    sequence?: string;
    typeName?: null;
  }

  interface Resource {
      id?: string;
      name?: string;
      type?: string;
      typeName?: string;
      sequence?: number;
      file?: File;
      group_name?: null;
      old_filename?: string;
      remote_file_url?: string;
      size?: number;
  }

  interface ResourceAdd {
    name: string;
    type: string;
    file: File;
    remote_file_url?: string;
    sequence?: number;
  }

  interface ResourceQueryInfo extends Page.Req {
    name?: string;
    type?: string;
  }
}
