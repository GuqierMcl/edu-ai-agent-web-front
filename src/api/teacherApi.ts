import { request } from "@/utils";

interface TeacherParams {
    name: string;
    account: string;
    phone: string;
    email: string;
    gender: string;
}

interface TeacherPageParams extends Page.Req, TeacherParams {}


export default {
  getList: (params: TeacherPageParams) => 
    request.get<Page.Resp<Teacher>>("/teacher/mng",params),
  add: (data: TeacherAdd) => request.post("/teacher/mng", data),
  update: (data: TeacherUpdate) => request.put("/teacher/mng", data),
  remove: (ids: string[]) => request.delete("/teacher/mng", { ids: ids }),
};
