import { request } from "@/utils";

export default {
    getList: (resourceQueryInfo: ResourceQueryInfo) =>
        request.get<Page.Resp<Resource>>("/resource/page", resourceQueryInfo),
    getUrlByIds: (ids: string[]) =>
        request.get<Resource[]>("/resource/url", { resourceIds: ids }),
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
    getResourceType: async () => {
        let { code, data } = await request.get<ResourceType[]>(
            "/resource/type"
        );
        if (code !== 1) return [];
        data = [{ name: "全部", code: "" }, ...data];
        return data.map((item) => {
            return {
                label: item.name,
                value: item.type,
            };
        });
    },
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
