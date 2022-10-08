import hyRequest from "../index";

import { Register, DataType, LoginResult } from "./type";

enum RegisterAPI {
  AccountRegister = "/register",
  AccountSave = "/register/save"
}

export function accountRegisterRequest(register: Register) {
  return hyRequest.post<DataType<LoginResult>>({
    url: RegisterAPI.AccountRegister,
    data: register
  });
}

// export function accountSaveRequest(register: Register) {
//   return hyRequest.post<DataType<LoginResult>>({
//     url: RegisterAPI.AccountSave,
//     data: register
//   });
// }
