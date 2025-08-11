export {};

declare global {
  interface UserInfo {
    id?: string;
    name?: string;
    account?: string;
    avatar?: string;
    avatarUrl?: string;
    email?: string;
    phone?: string;
    roles?: string[];
    permission_keys?: string[];
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
    avatarUrl?: string;
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
