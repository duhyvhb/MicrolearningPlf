import { Module } from "vuex";

import { accountLoginRequest } from "@/service/login/login";
import { userGetInfoRequest, userChangeNameRequest } from "@/service/user/user";

import localCache from "@/utils/cache";
import { LoginState } from "./types";
import { RootState } from "../types";
import router from "@/router";

const loginModule: Module<LoginState, RootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {}
    };
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
    updateUserAvatar(state, payload) {
      state.userInfo.avatarUrl = payload;
    }
  },
  getters: {},
  actions: {
    async accountLoginAction({ commit }, payload: any) {
      const loginResult = await accountLoginRequest(payload);
      const { accessToken } = loginResult.data.user.stsTokenManager;
      const uid = loginResult.data.user.uid;
      const userInfoG = await userGetInfoRequest({ uid });
      commit("changeToken", accessToken);
      localCache.setCache("token", accessToken);
      commit("changeUserInfo", userInfoG.data);
      localCache.setCache("userInfo", userInfoG.data);
      router.push("/home");
    },
    loadLocalLogin({ commit }) {
      const token = localCache.getCache("token");
      const userInfo = localCache.getCache("userInfo");
      if (token) {
        commit("changeToken", token);
      }
      if (userInfo) {
        commit("changeUserInfo", userInfo);
      }
    },
    logOut() {
      localCache.clearCache();
    },
    async userGetInfo({ commit }, payload) {
      const userInfoG = await userGetInfoRequest(payload);
      commit("changeUserInfo", userInfoG.data);
      localCache.setCache("userInfo", userInfoG.data);
    },
    async userChangeName({ commit }, payload) {
      const result: any = await userChangeNameRequest(payload);
    }
  }
};

export default loginModule;
