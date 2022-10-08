export interface DataType<T> {
  code: number;
  data: T;
}

export interface UserInfoResult {
  username: string;
  uid: string;
  email: string;
  clist: [];
  plist: [];
  role: number;
}

export interface Uid {
  uid: string;
}

export interface UserChangeName {
  uid: string;
  nickname: string;
}
