import { request } from "@/utils";

interface StudentParams {
  collegeId: string;
  majorId: string;
  clazzId: string;
  name: string;
  gradeId: string;
  account: string;
}

interface StudentPageParams extends Page.Req, StudentParams {}

export default {
  getList: (params: StudentPageParams) =>
    request.get<Page.Resp<Student>>("/student", params),
  add: (data: StudentAdd) => request.post("/student", data),
  update: (data: StudentUpdate) => request.put("/student", data),
  remove: (ids: string[]) => request.delete("/student", { ids: ids }),
  upload: (data: FormData) => {
    return request.request({
      url: "/student/import",
      method: "POST",
      headers: {
        "content-type": "multipart/form-data",
      },
      data: data,
    });
  },
  importSuccess: (key: string) => request.put("/student/import?uuid=" + key),
  exportFail: (key: string) => {
    request
      .request({
        url: "/student/import?uuid=" + key,
        method: "GET",
        responseType: "blob",
      })
      .then((data: any) => {
        window.$message.info("正在导出，请稍后");
        let blob = new Blob([data], {
          type: "application/vnd.ms-excel", //将会被放入到blob中的数组内容的MIME类型
        });
        let objectUrl = URL.createObjectURL(blob); //生成一个url
        window.location.href = objectUrl;
      });
  },
  exportByQuery: (params: StudentParams) => {
    request
      .request({
        url: "/student/export",
        method: "GET",
        params: params,
        responseType: "blob",
      })
      .then((data: any) => {
        window.$message.info("正在导出，请稍后");
        let blob = new Blob([data], {
          type: "application/vnd.ms-excel", //将会被放入到blob中的数组内容的MIME类型
        });
        let objectUrl = URL.createObjectURL(blob); //生成一个url
        window.location.href = objectUrl;
      });
  },

  getScoreList: (params: StudentPageParams) =>
    request.get<Page.Resp<Student>>("/score/student", params),
};
