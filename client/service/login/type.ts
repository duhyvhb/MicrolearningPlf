export interface Account {
  email: string;
  password: string;
}

export interface Register {
  email: string;
  password: string;
  cpassword: string;
  nickname: string;
}

export interface LoginResult {
  user: {
    uid: string;
    stsTokenManager: {
      accessToken: string;
    };
  };
}

export interface DataType<T> {
  code: number;
  data: T;
}
