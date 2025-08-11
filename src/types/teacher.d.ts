export {};

declare global {
  interface Teacher {
    id?: string;
    account?: string;
    gender?: string;
    phone?: string;
    email?: string;
    name?: string;
    position?: string;
    status?: string;
  }

  interface TeacherAdd {
    name: string;
    account: string;
    position?: string;
    phone: string;
    email: string;
    gender: string;
  }
}
