export {};

declare global {
  interface StudentUser {
      account: string;
      avatar: string;
      avatar_url: string;
      email: string;
      expired_time: string;
      id: string;
      last_login: string;
      name: string;
      nickname: string;
      phone: string;
      type: string;
  }

  interface Student {
      id: string;
      address: string;
      birth_date: string;
      create_time: string;
      enrollment: string;
      gender: string;
      identity: string;
      identity_name: string;
      remark: string;
      school_no: string;
      status: string;
      status_name: string;
      student_no: string;
      update_time: string;
      user: StudentUser;
  }

  interface StudentAdd {
      account: string;
      password: string;
      address?: string;
      birth_date?: string;
      email?: string;
      enrollment?: string;
      gender?: string;
      identity?: string;
      name: string;
      nickname: string;
      phone: string;
      remark?: string;
      school_no?: string;
      status?: string;
      student_no?: string;
  }

  interface StudentUpdate {
      id: string;
      address?: string;
      birth_date?: string;
      email?: string;
      enrollment?: string;
      gender?: string;
      identity?: string;
      name: string;
      nickname: string;
      phone: string;
      remark?: string;
      school_no?: string;
      status?: string;
      student_no?: string;
  }

  interface StuExcel {
    num: string;
    account: string;
    name: string;
    gender: string;
    college: string;
    major: string;
    grade: string;
    clazz: string;
    msg: string;
    isSuccess: boolean;
  }
}
