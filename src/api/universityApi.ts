import { request } from "@/utils";

export default {
    search: (keyword: string) =>
        request.get<University[]>("/university/search", { keyword }),
    get: (id: string) => request.get<University>(`/university/${id}`),
};
