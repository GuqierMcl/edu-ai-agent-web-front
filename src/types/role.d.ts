export {};

declare global {
    interface RoleList {
        id?: string;
        role_key?: string;
        role_name?: string;
        type?: string;
        typeName?: string;
        des?: string;
    }
    interface RoleAdd {
        role_key?: string;
        role_name?: string;
        des?: string;
    }
    interface RoleUpdate {
        id?: string;
        role_key?: string;
        role_name?: string;
        des?: string;
    }
    interface RoleQueryInfo extends Page.Req {}

    interface EditRoleQueryInfo {
        roleId?: string;
        permissionIds?: string[];
    }
}
