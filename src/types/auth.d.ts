export {};

declare global {
  interface Role {
    label?: string;
    value?: string;
  }

  interface RoleList {
    id: string;
    roleKey?: string;
    roleName?: string;
    des?: string;
  }

  interface RoleTeacher {
    id?: string;
    account?: string;
    name?: string;
    roles?: RoleList[];
  }

  interface AuthQueryInfo extends Page.Req {
    name?: string;
    account?: string;
  }

  interface EditTeacherQueryInfo {
    teacherId?: string;
    roleIds?: string[];
  }
}
