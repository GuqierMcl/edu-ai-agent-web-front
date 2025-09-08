import { request } from "@/utils";

interface Option {
    label: string;
    value: string | number;
    [k: string]: unknown;
}

export default {
    getOptions: (type: string) =>
        request.get<Option[]>(`/code/options/${type}`),
};
