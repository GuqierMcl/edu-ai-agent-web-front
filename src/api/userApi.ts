import Page from "@/types/page";
import { request } from "@/utils";

interface AdminPageParams extends Page.Req {
  account: string;
  name: string;
}

interface UserPageParams extends Page.Req {
  account: string;
  name: string;
  type: string;
}

interface ResetPassword {
  oldPassword: string;
  newPassword: string;
}
export default {
  getUser: () => request.get("/user"),
  getAdminPage: (params: AdminPageParams) =>
    request.get<Page.Resp<Admin>>("/user/admin", params),
  addAdmin: (data: AdminAdd) => request.post("/user/admin", data),
  updateAdmin: (data: AdminUpdate) => request.put("/user/admin", data),
  remove: (ids: string[]) => request.delete("/user/admin", { ids: ids }),

  getUers: (params: UserPageParams) =>
    request.get<Page.Resp<Admin>>("/user/manage", params),
  resetPassword: (id: string) => request.put("/user/manage", { id: id }),

  updateUser: (data: UserQueryInfo) => request.put("/user", data),
  resetUserPassword: (data: ResetPassword) => request.put("/user/pwd", data),
};
