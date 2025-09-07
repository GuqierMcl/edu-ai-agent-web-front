export {};

declare global {
  interface University {
      id: string;
      authorities: string;
      edu_level: string;
      location: string;
      remarks: null | string;
      school_id_code: string;
      school_name: string;
  }
}
