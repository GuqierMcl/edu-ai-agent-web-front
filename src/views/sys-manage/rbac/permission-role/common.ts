import { h } from "vue";
import { NAvatar, NButton, NIcon, NImage, FormItemRule } from "naive-ui";
import type { DataTableColumns, TreeOption } from "naive-ui";
import { EditNoteRound, CloseRound, KeyFilled } from "@vicons/material";
import DefaultAvatar from "@/assets/images/defaultAvatar.png";
import { identity } from "@vueuse/core";

export interface AdviceOption extends TreeOption {
    type?: string;
}

export const generateColumns = (
    doEdit: Function,
    showFormModal: Function,
    deleteRole: Function
) => {
    const columns: DataTableColumns<RoleList> = [
        {
            type: "selection",
            fixed: "left",
            disabled: (row) => row.type !== "2",
        },
        {
            title: "序号",
            key: "no",
            width: 50,
            fixed: "left",
            align: "center",
            render: (_, index) => `${index + 1}`,
        },
        {
            title: "角色码",
            key: "role_key",
            width: 100,
            ellipsis: { tooltip: true },
        },
        {
            title: "角色名",
            key: "role_name",
            width: 100,
            ellipsis: { tooltip: true },
        },
        {
            title: "类型",
            key: "typeName",
            width: 90,
            ellipsis: { tooltip: true },
        },
        {
            title: "描述",
            key: "des",
            width: 150,
            ellipsis: { tooltip: true },
        },
        {
            title: "操作",
            key: "actions",
            width: 200,
            align: "center",
            fixed: "right",
            render(row) {
                return [
                    h(
                        NButton,
                        {
                            size: "small",
                            type: "warning",
                            style: "margin-right: 15px",
                            disabled: row.type !== "2",
                            onClick: () => doEdit(row),
                        },
                        {
                            icon: () =>
                                h(NIcon, {
                                    component: KeyFilled,
                                }),
                            default: () => "权限",
                        }
                    ),
                    h(
                        NButton,
                        {
                            size: "small",
                            type: "info",
                            style: "margin-right: 15px",
                            disabled: row.type !== "2",
                            onClick: () => showFormModal(true, row),
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
                            disabled: row.type !== "2",
                            onClick: () => deleteRole(row),
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

export const rules = {
    role_key: {
        required: true,
        message: "请输入角色码",
        trigger: ["input", "blur"],
    },
    role_name: {
        required: true,
        message: "请输入角色名",
        trigger: ["input", "blur"],
    },
    des: {
        required: false,
        message: "请输入角色描述",
        trigger: ["input", "blur"],
    },
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
