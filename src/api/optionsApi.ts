import { request } from "@/utils";

export default {
    getOptions: (type: string) => request.get<any[]>(`/code/options/${type}`),
};
