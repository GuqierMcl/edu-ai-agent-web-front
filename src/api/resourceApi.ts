import { request } from "@/utils";

export default {
  getList: (resourceQueryInfo: ResourceQueryInfo) =>
    request.get<Page.Resp<Resource>>("/resource/page", resourceQueryInfo),
  getUrlByIds: (ids: string[]) => request.get<Image[]>("/image/url", {imageIds: ids}),
  add: (resource: any) => {
    return request.request({
      url: "/resource/upload",
      method: "POST",
      headers: {
        "content-type": "multipart/form-data",
      },
      data: resource,
    });
  },
  update: (resource: Resource) => request.put("/resource", resource),
  removeBatch: (ids: string[]) => request.delete("/resource", { ids: ids }),
  updateAvatar: (resource: any) => {
    return request.request({
      url: "/resource/uploadSingle",
      method: "POST",
      headers: {
        "content-type": "multipart/form-data",
      },
      data: resource,
    });
  },
};
