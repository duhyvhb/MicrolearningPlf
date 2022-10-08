import localCache from "@/utils/cache";
import { Module } from "vuex";

import { BreadState } from "./types";
import { RootState } from "../types";

const BreadModule: Module<BreadState, RootState> = {
  namespaced: true,
  state() {
    return {
      currentBread: []
    };
  },
  mutations: {
    changeCurrentBread(state, payload) {
      state.currentBread = payload;
    }
  },
  getters: {},
  actions: {
    changeBreadAction({ commit }, payload) {
      commit("changeCurrentBread", payload);
      localCache.setCache("currentBread", payload);
    },
    loadBread({ commit }) {
      const currentBread = localCache.getCache("currentBread");
      if (currentBread) {
        commit("changeCurrentBread", currentBread);
      }
    }
  }
};

export default BreadModule;
