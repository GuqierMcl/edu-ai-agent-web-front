export {};

declare global {
  interface Permission {
    label?: string;
    value?: string;
  }

  interface PermissionRoleList {
    id: string;
    roleKey?: string;
    roleName?: string;
    des?: string;
    type?: string;
  }

  interface PermissionList {
    id?: string;
    permissionKey?: string;
    type?: string;
    name?: string;
    grade?: string;
    des?: string;
  }

  interface RoleAdd {
    roleKey: string;
    roleName: string;
    des: string;
  }
  interface RoleQueryInfo extends Page.Req {}

  interface EditRoleQueryInfo {
    roleId?: string;
    permissionIds?: string[];
  }
}
