import localCache from "@/utils/cache";
import { RootState } from "./../types";
import { postState } from "./types";
import { Module } from "vuex";
import {
  getPostRequest,
  addPost,
  viewPostDetail,
  commentPost,
  getPostComment
} from "@/service/post/post";

const postModule: Module<postState, RootState> = {
  namespaced: true,
  state() {
    return {
      currentPid: "",
      postList: [],
      postDetail: {},
      commentList: []
    };
  },
  mutations: {
    updatePostList(state, payload) {
      state.postList = payload;
    },
    updatePid(state, payload) {
      state.currentPid = payload;
    },
    updatePostDetail(state, payload) {
      state.postDetail = payload;
    },
    updateCommentList(state, payload) {
      state.commentList = payload;
    }
  },
  getters: {},
  actions: {
    async getPostAction({ commit }, payload) {
      const result: any = await getPostRequest(payload);
      commit("updatePostList", result.data);
      localCache.setCache("postList", result.data);
    },
    loadPost({ commit }) {
      const postList = localCache.getCache("postList");
      if (postList) {
        commit("updatePostList", postList);
      }
    },
    setPid({ commit }, payload) {
      commit("updatePid", payload);
      localCache.setCache("currentPid", payload);
    },
    loadPid({ commit }) {
      const pid = localCache.getCache("currentPid");
      if (pid) {
        commit("updatePid", pid);
      }
    },
    async addPost({ commit }, payload) {
      const result: any = await addPost(payload);
      if (result.status == 200) {
        alert("Post successfully!");
      } else if (result.status == 400) {
        alert("Fail to post!");
      }
    },
    async getPostDetail({ commit }, payload) {
      const result: any = await viewPostDetail(payload);
      commit("updatePostDetail", result.data);
    },
    async commentPostAction({ commit }, payload) {
      const result: any = await commentPost(payload);
      if (result.status == 200) {
        alert("Comment successfully!");
      } else if (result.status == 400) {
        alert("Fail to comment!");
      }
    },
    async getCommentAction({ commit }, payload) {
      const result: any = await getPostComment(payload);
      commit("updateCommentList", result.data);
    }
  }
};

export default postModule;
