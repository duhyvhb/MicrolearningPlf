import hyRequest from "../index";
import { DataType, UserInfoResult, Uid, UserChangeName } from "./type";

enum userAPI {
  getInfo = "/user/getinfo",
  changeName = "/user/changename"
}

export function userGetInfoRequest(uid: Uid) {
  return hyRequest.post<DataType<UserInfoResult>>({
    url: userAPI.getInfo,
    data: uid
  });
}

export function userChangeNameRequest(data: UserChangeName) {
  return hyRequest.post({
    url: userAPI.changeName,
    data: data
  });
}
