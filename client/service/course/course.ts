import hyRequest from "../index";

import { CreateCourse, RegisterCourse } from "./types";

enum courseUrl {
  createCourse = "/course/create",
  getAllCourse = "/course/all",
  getCourse = "/course/get",
  registerCourse = "/course/register",
  getMyCourse = "/course/mycourse",
  deleteCourse = "/course/delete"
}

export function createCourseRequest(createInfo: CreateCourse) {
  return hyRequest.post({
    url: courseUrl.createCourse,
    data: createInfo
  });
}

export function getAllCourseRequest() {
  return hyRequest.get({
    url: courseUrl.getAllCourse
  });
}

export function getCourseRequest(cid: any) {
  return hyRequest.post({
    url: courseUrl.getCourse,
    data: cid
  });
}

export function registerCourseRequest(registerInfo: RegisterCourse) {
  return hyRequest.post({
    url: courseUrl.registerCourse,
    data: registerInfo
  });
}

export function getMyCourseRequest(uid: string) {
  return hyRequest.post({
    url: courseUrl.getMyCourse,
    data: uid
  });
}

export function deleteCourseRequest(cid: string) {
  return hyRequest.post({
    url: courseUrl.deleteCourse,
    data: cid
  });
}
