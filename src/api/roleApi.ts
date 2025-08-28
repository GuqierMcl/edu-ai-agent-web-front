import { request } from "@/utils";

export default {
    addRole: (RoleAdd: RoleAdd) => request.post("/role", RoleAdd),
    getRoleList: (RoleQueryInfo: RoleQueryInfo) =>
    request.get<Page.Resp<RoleList>>("/role", RoleQueryInfo),
    getAllRoleList: () => request.get<RoleList[]>("/role/all"),
    updateRole: (RoleUpdate: RoleUpdate) =>
        request.put("/role", RoleUpdate),
    deleteRole: (ids: string[]) => request.delete("/role", { ids: ids }),
};
