export {};

declare global {
  interface ImageType {
    id?: string;
    code?: string;
    type?: string;
    name?: string;
    sequence?: string;
    typeName?: null;
  }

  interface Image {
    id?: string;
    name?: string;
    type?: string;
    typeName?: string;
    remoteFileUrl?: string;
    sequence?: number;
    file?: File;
  }

  interface ImageAdd {
    name: string;
    type: string;
    file: File;
    remoteFileUrl?: string;
    sequence?: number;
  }

  interface ImageQueryInfo extends Page.Req {
    name?: string;
    type?: string;
  }
}
