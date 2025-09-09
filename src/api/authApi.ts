import { request } from "@/utils";

export interface LoginInfo {
    account: string;
    password: string;
    // code: string;
    // uuid: string;
}

export interface TeacherRegisterInfo {
    account: string;
    birth_date: string | null;
    department: string;
    email: string;
    gender: string;
    name: string;
    password: string;
    phone: string;
    profession: string;
    professional_title: string;
    subject: string;
    university: string;
    verify_code: string;
    [property: string]: any;
}

export interface StudentRegisterInfo {
    account: string;
    address: string;
    birth_date: string | null;
    email: string;
    enrollment: string | null;
    gender: string;
    identity: string;
    name: string;
    password: string;
    phone: string;
    remark: string;
    status: string;
    student_no: string;
    university: string;
    verify_code: string;
    [property: string]: any;
}

export default {
    login: (loginInfo: LoginInfo) => request.post("/auth/login", loginInfo),
    logout: () => request.post("/auth/logout"),
    refreshToken: () => request.get("/auth/refresh"),
    getVerifyCode: async (phone: string) =>
        request.post("/auth/get_verify_code", { phone }),
    registerTeacher: (data: TeacherRegisterInfo) =>
        request.post("/auth/register_teacher", data),
    registerStudent: (data: StudentRegisterInfo) =>
        request.post("/auth/register_student", data),
};
