import { request } from "@/utils";

export default {
  getList: (RoleQueryInfo: RoleQueryInfo) =>
    request.get<Page.Resp<PermissionList>>(
      "/permission/roleList",
      RoleQueryInfo
    ),
  getPermissionList: () => request.get<PermissionList[]>("/permission"),
  getRolePermissionList: (roleId: string) =>
    request.get<PermissionList[]>("/permission/role", { roleId: roleId }),
  add: (RoleAdd: RoleAdd) => request.post("/permission", RoleAdd),
  update: (EditRoleQueryInfo: EditRoleQueryInfo) =>
    request.put("/permission", EditRoleQueryInfo),
  remove: (id: string) => request.delete("/permission", { id: id }),
};
