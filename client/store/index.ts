import { createStore } from "vuex";
import login from "./login/login";
import register from "./login/register";
import bread from "./nav/bread";
import course from "./course/course";
import post from "./post/post";
import { RootState } from "./types";

const store = createStore<RootState>({
  state: () => {
    return {
      name: "codingDu",
      age: 18
    };
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    login,
    register,
    bread,
    course,
    post
  }
});

export function setupStore() {
  store.dispatch("login/loadLocalLogin");
  store.dispatch("bread/loadBread");
  store.dispatch("course/loadCourse");
  store.dispatch("course/loadMyCourse");
  store.dispatch("course/loadLearningCourse");
  store.dispatch("post/loadPost");
  store.dispatch("post/loadPid");
}

export function setupBread() {
  store.dispatch("bread/loadBread");
}

export default store;
