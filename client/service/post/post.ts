import hyRequest from "../index";
import { addPost, commentPost } from "./types";

enum postUrl {
  addPost = "/post/add",
  getPost = "/post/get",
  deletePost = "/post/delete",
  viewPostDetail = "/post/detail",
  commentPost = "/post/comment",
  getPostComment = "/post/getcomment"
}

export function getPostRequest(cid: string) {
  return hyRequest.post({
    url: postUrl.getPost,
    data: cid
  });
}

export function addPost(addInfo: addPost) {
  return hyRequest.post({
    url: postUrl.addPost,
    data: addInfo
  });
}

export function deletePost(pid: string) {
  return hyRequest.post({
    url: postUrl.deletePost,
    data: pid
  });
}

export function viewPostDetail(pid: string) {
  return hyRequest.post({
    url: postUrl.viewPostDetail,
    data: pid
  });
}

export function commentPost(commentInfo: commentPost) {
  return hyRequest.post({
    url: postUrl.commentPost,
    data: commentInfo
  });
}

export function getPostComment(pid: string) {
  return hyRequest.post({
    url: postUrl.getPostComment,
    data: pid
  });
}
