import { request } from "@/utils";

export default {
  getPermissionList: () => request.get<PermissionList[]>("/permission"),
  updateRolePermissions: (EditRoleQueryInfo: EditRoleQueryInfo) =>
    request.put("/permission", EditRoleQueryInfo),
  getPermissionTree: () => request.get<PermissionList[]>("/permission/tree"),
  getPermissionByRole: (roleId: string) => request.get<PermissionList[]>(`/permission/role/${roleId}`)
};
