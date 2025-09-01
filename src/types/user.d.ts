export {};

declare global {
    interface UserInfo {
        id?: string;
        name?: string;
        nickname?: string;
        account?: string;
        avatar?: string;
        avatar_url?: string;
        email?: string;
        phone?: string;
        roles?: string[];
        permissions?: string[];
        type?: string;
        last_login?: string;
    }
    interface Admin {
        id: string;
        account: string;
        password: string;
        name: string;
        nickname: string;
        gender: string;
        email: string;
        phone: string;
    }

    interface UserQueryInfo {
        userId?: string;
        name?: string;
        nickname?: string;
        avatar?: string;
        avatar_url?: string;
        email?: string;
        phone?: string;
        gender?: string;
    }
    interface AdminAdd extends Admin {
        password: string;
    }
    interface AdminUpdate extends Admin {
        id: string;
    }
}
