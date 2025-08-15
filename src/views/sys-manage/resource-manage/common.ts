import { h } from "vue";
import { NButton, NEmpty, NIcon, NImage } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import { EditNoteRound, CloseRound } from "@vicons/material";

export const generateColumns = (
    doEdit: Function,
    doDelete: Function,
    options: any[]
) => {
    const columns: DataTableColumns<Resource> = [
        { type: "selection", fixed: "left" },
        {
            title: "序号",
            key: "no",
            width: 50,
            fixed: "left",
            render: (_, index) => `${index + 1}`,
        },
        {
            title: "名称",
            key: "name",
            width: 90,
            ellipsis: { tooltip: true },
        },

        {
            title: "源文件名",
            key: "old_filename",
            width: 90,
            ellipsis: { tooltip: true },
        },
        {
            title: "类型",
            key: "type_name",
            width: 120,
            ellipsis: { tooltip: true },
        },
        {
            title: "排序",
            key: "sequence",
            width: 60,
            ellipsis: { tooltip: true },
        },
        {
            title: "缩略图",
            key: "remote_file_url",
            width: 120,
            align: "center",
            render(row) {
                // if (row.old_filename?.split(".")[1] === "jpg" ) {
                //     return h(NImage, {
                //         width: 120,
                //         maxHeight: 120,
                //         src: row.remote_file_url,
                //     });
                // }
                // return h(NEmpty, {
                //     description: "无缩略图",
                //     width: 120,
                //     height: 120,
                // });
                return h(NImage, {
                        width: 120,
                        maxHeight: 120,
                        src: row.remote_file_url,
                    });
            },
        },
        {
            title: "大小",
            key: "size",
            width: 100,
            align: "center",
            render(row) {
                // 自动计算单位
                let fileSize = row.size ? row.size : 0;
                let unit = "Bytes";
                if (fileSize > 1024) {
                    unit = "KB";
                    fileSize /= 1024;
                }
                if (fileSize > 1024) {
                    unit = "MB";
                    fileSize /= 1024;
                }
                if (fileSize > 1024) {
                    unit = "GB";
                    fileSize /= 1024;
                }
                return `${fileSize.toFixed(2)} ${unit}`;
            },
        },
        {
            title: "操作",
            key: "actions",
            width: 240,
            align: "center",
            fixed: "right",
            render(row) {
                return [
                    h(
                        NButton,
                        {
                            size: "small",
                            type: "primary",
                            style: "margin-right: 15px",
                            onClick: () => doEdit(row),
                            disabled: Number(row.type) < 0,
                        },
                        {
                            icon: () =>
                                h(NIcon, {
                                    component: EditNoteRound,
                                }),
                            default: () => "编辑",
                        }
                    ),
                    h(
                        NButton,
                        {
                            size: "small",
                            type: "error",
                            onClick: () => doDelete(row),
                            disabled: Number(row.type) < 0,
                        },
                        {
                            icon: () =>
                                h(NIcon, {
                                    component: CloseRound,
                                }),
                            default: () => "删除",
                        }
                    ),
                ];
            },
        },
    ];
    return {
        columns,
    };
};

export const pageSizes = [
    {
        label: "10 每页",
        value: 10,
    },
    {
        label: "20 每页",
        value: 20,
    },
    {
        label: "30 每页",
        value: 30,
    },
    {
        label: "40 每页",
        value: 40,
    },
];

export const batchRules = {
    type: {
        required: true,
        message: "请选择类型",
        trigger: ["change", "blur"],
    },
};

export const rules = {
    name: {
        required: true,
        message: "请输入名称",
        trigger: ["input", "blur"],
    },
    type: {
        required: true,
        message: "请选择类型",
        trigger: ["change", "blur"],
    },
    sequence: {
        required: false,
        message: "默认排序为1",
        trigger: ["input", "blur"],
    },
};
