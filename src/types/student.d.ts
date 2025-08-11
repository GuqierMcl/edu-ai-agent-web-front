export {};

declare global {
  interface Student {
    id?: string; //学生ID
    account?: string; //账号
    name?: string; //姓名
    gender?: string;
    collegeId?: string;
    collegeName?: string; //学院（值来源于ts_organization）
    majorId?: string;
    majorName?: string; //专业（值来源于ts_organization）
    gradeId?: string;
    gradeName?: string; //年级（来自tc_code）
    clazzId?: string; //班级（来自ts_clazz）
    clazzName?: string; //班级名称
    score?: string; //积分
    rankName?: string;
    memo?: string; //备注
  }

  interface StudentAdd {
    account: string;
    name: string;
    gender: string;
    clazzId: string;
  }

  interface StudentUpdate extends StudentAdd {
    id: string;
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
