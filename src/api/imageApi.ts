import { request } from "@/utils";

export default {
  getList: (iamgeQueryInfo: ImageQueryInfo) =>
    request.get<Page.Resp<Image>>("/image", iamgeQueryInfo),
  getUrlByIds: (ids: string[]) => request.get<Image[]>("/image/url", {imageIds: ids}),
  add: (image: any) => {
    return request.request({
      url: "/image/upload",
      method: "POST",
      headers: {
        "content-type": "multipart/form-data",
      },
      data: image,
    });
  },
  update: (image: Image) => request.put("/image", image),
  removeBatch: (ids: string[]) => request.delete("/image", { ids: ids }),
  updateAvatar: (image: any) => {
    return request.request({
      url: "/image/uploadSingle",
      method: "POST",
      headers: {
        "content-type": "multipart/form-data",
      },
      data: image,
    });
  },
};
