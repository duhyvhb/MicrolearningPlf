import { Module } from "vuex";

import { accountRegisterRequest } from "@/service/login/register";
import { userGetInfoRequest } from "@/service/user/user";

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
    }
  },
  getters: {},
  actions: {
    async accountRegisterAction({ commit }, payload: any) {
      const registerResult = await accountRegisterRequest(payload);
      const { accessToken } = registerResult.data.user.stsTokenManager;
      const uid = registerResult.data.user.uid;
      const userInfoG = await userGetInfoRequest({ uid });
      commit("changeToken", accessToken);
      localCache.setCache("token", accessToken);
      commit("changeUserInfo", userInfoG.data);
      localCache.setCache("userInfo", userInfoG.data);
      alert("Now you have an account. Let's go to learn!");
      router.push("/home");
      window.location.reload();
    }
  }
};

export default loginModule;
