import { request } from "@/utils";

export default {
  getCodeType: () => request.get<Code[]>("/code/type"),
  getList: (codeQueryInfo: CodeQueryInfo) =>
    request.get<Page.Resp<Code>>("/code", codeQueryInfo),
  add: (code: CodeAdd) => request.post("/code", code),
  update: (code: Code) => request.put("/code", code),
  removeBatch: (ids: string[]) => request.delete("/code", { ids: ids }),
};
