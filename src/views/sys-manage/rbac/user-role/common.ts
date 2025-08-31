import { h } from "vue";
import { NAvatar, NButton, NIcon, NTag } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import { PeopleAltOutlined } from "@vicons/material";
import DefaultAvatar from "@/assets/images/defaultAvatar.png";

export const generateColumns = (editRole: Function) => {
    const columns: DataTableColumns<UserWithRoles> = [
        {
            title: "序号",
            key: "no",
            width: 50,
            fixed: "left",
            align: "center",
            render: (_, index) => `${index + 1}`,
        },
        {
            title: "头像",
            key: "avatar_url",
            width: 60,
            ellipsis: { tooltip: true },
            render(row) {
                return h(NAvatar, {
                    width: 40,
                    round: true,
                    maxHeight: 40,
                    src: row.avatar_url ? row.avatar_url : DefaultAvatar,
                });
            },
        },
        {
            title: "账号",
            key: "account",
            width: 100,
            ellipsis: { tooltip: true },
        },
        {
            title: "昵称",
            key: "nickname",
            width: 100,
            ellipsis: { tooltip: true },
        },
        {
            title: "姓名",
            key: "name",
            width: 90,
            ellipsis: { tooltip: true },
        },
        {
            title: "电话",
            key: "phone",
            width: 150,
            ellipsis: { tooltip: true },
        },
        {
            title: "邮箱",
            key: "email",
            width: 150,
            ellipsis: { tooltip: true },
        },
        {
            title: "拥有角色",
            key: "roles",
            width: 150,
            ellipsis: { tooltip: true },
            render(row) {
                if(row.roles == null || row.roles.length == 0){
                    return "-";
                }
                // 使用NTag展示角色名称
                return row.roles?.map((role) =>
                    h(NTag, { type: "info", size: "small", style: { marginRight: "5px" } }, role.role_name)
                );
            },
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
                            disabled: row.type !== "1",
                            onClick: () => editRole(row),
                        },
                        {
                            icon: () =>
                                h(NIcon, {
                                    component: PeopleAltOutlined,
                                }),
                            default: () => "角色",
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
