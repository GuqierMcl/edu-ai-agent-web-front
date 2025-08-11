import { request } from "@/utils";

export interface LoginInfo {
  account: string;
  password: string;
  // code: string;
  // uuid: string;
}

export default {
  login: (loginInfo: LoginInfo) => request.post("/auth/login", loginInfo),
  logout: () => request.post("/auth/logout"),
  refreshToken: () => request.get("/auth/refresh"),
  getVerifyCode: async () => request.get("/auth/code"),
  getList: (authQueryInfo: AuthQueryInfo) =>
    request.get<Page.Resp<Teacher>>("/role/teacher", authQueryInfo),
  getAllRoles: () => request.get<RoleList[]>("/role"),
  editTeacherAuth: (editTeacherQueryInfo: EditTeacherQueryInfo) =>
    request.put("/role/teacher", editTeacherQueryInfo),
};
