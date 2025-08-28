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
        parent?: string;
        key?: string;
        type?: string;
        name?: string;
        grade?: string;
        des?: string;
    }

    interface PermissionTree {
        id?: string;
        parent?: string;
        key?: string;
        type?: string;
        name?: string;
        grade?: string;
        des?: string;
        children?: PermissionTree[];
    }
}
