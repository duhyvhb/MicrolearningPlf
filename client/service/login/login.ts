import hyRequest from "../index";

import { Account, DataType, LoginResult } from "./type";

enum LoginAPI {
  AccountLogin = "/login"
}

export function accountLoginRequest(account: Account) {
  return hyRequest.post<DataType<LoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  });
}
