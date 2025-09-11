export {};

declare global {
  interface TeacherUser {
      id: string;
      avatar_url: string;
      account: string;
      nickname: string;
      name: string;
      phone: string;
      email: string;
      type: string;
      avatar: string;
      expired_time: string;
      last_login: string;
  }

  interface TeaUniversity {
      id: string;
      create_time: string;
      updata_time: string;
      school_name: string;
      school_id_code: string;
      authorities: string;
      location: string;
      edu_level: string;
      remarks: string;
  }

interface Teacher {
      id: string;
      user: TeacherUser;
      university: TeaUniversity;
      subject_name: string;
      professional_title_name: string;
      profession_name: string;
      create_time: string;
      update_time: string;
      birth_date: string;
      gender: string;
      subject: string;
      professional_title: string;
      profession: string;
      department: string;
  }

  interface TeacherAdd {
      account: string;
      password: string;
      name: string;
      nickname: string;
      phone: string;
      email?: string;
      profession?: string;
      department?: string;
      birth_date?: string;
      gender?: string;
      university?: string;
      subject?: string;
      professional_title?: string;
  }

  interface TeacherUpdate {
      name: string;
      nickname: string;
      phone: string;
      email?: string;
      profession?: string;
      department?: string;
      birth_date?: string;
      gender?: string;
      university?: University;
      subject?: string;
      professional_title?: string;
  }
}
