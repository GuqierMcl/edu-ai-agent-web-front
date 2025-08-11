import { request } from "@/utils";

export default {
  getList: () => request.get<Teacher[]>("/teacher"),
  add: (teacher: TeacherAdd) => request.post("/teacher", teacher),
  update: (teacher: TeacherAdd) => request.put("/teacher", teacher),
  remove: (id: string) => request.delete("/teacher", { teacherId: id }),
  removeBatch: (ids: string[]) =>
    request.delete("/teacher/batch", { ids: ids }),
};
