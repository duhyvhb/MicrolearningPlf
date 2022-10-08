import localCache from "@/utils/cache";
import { Module } from "vuex";

import { RootState } from "../types";
import { CourseState } from "./types";

import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";

import {
  createCourseRequest,
  getAllCourseRequest,
  getCourseRequest,
  registerCourseRequest,
  getMyCourseRequest,
  deleteCourseRequest
} from "@/service/course/course";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  updateDoc
} from "firebase/firestore";
import store from "..";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBttVPs11xLyJ4lxN9EES7JJz21NgQguQ8",
  authDomain: "microplf-7c141.firebaseapp.com",
  projectId: "microplf-7c141",
  storageBucket: "microplf-7c141.appspot.com",
  messagingSenderId: "1062131539260",
  appId: "1:1062131539260:web:57c161edd85fa0800b9239",
  measurementId: "G-78R6MEHQ86"
};

// Initialize Firebase

const fapp = initializeApp(firebaseConfig);
const db = getFirestore(fapp);

const CourseModule: Module<CourseState, RootState> = {
  namespaced: true,
  state() {
    return {
      courseList: [],
      learningCourse: "",
      createCid: "",
      myCourseList: [],
      learning: false
    };
  },
  mutations: {
    updateCourseList(state, payload) {
      state.courseList = payload;
    },
    updateCreateCid(state, payload) {
      state.createCid = payload;
    },
    updateMyCourseList(state, payload) {
      state.myCourseList = payload;
    },
    updateLearningCourse(state, payload) {
      state.learningCourse = payload;
    },
    switchLearningTrue(state) {
      state.learning = true;
    },
    switchLearningFalse(state) {
      state.learning = false;
    }
  },
  getters: {
    getCreateCid(state) {
      return state.createCid;
    }
  },
  actions: {
    turnOnCourse({ commit }) {
      commit("switchLearningTrue");
    },
    turnOffCourse({ commit }) {
      commit("switchLearningFalse");
    },
    async getAllCourseAction({ commit }) {
      const result: any = await getAllCourseRequest();
      commit("updateCourseList", result.data);
      localCache.setCache("courseList", result.data);
    },
    loadCourse({ commit }) {
      const courseList = localCache.getCache("courseList");
      if (courseList) {
        commit("updateCourseList", courseList);
      }
    },
    async courseRegisterAction({ commit }, payload) {
      const result: any = await registerCourseRequest(payload);
      if (result.data == "400") {
        alert("You have registered this course before. Do not register again.");
      } else if (result.data == "200") {
        alert(
          "Register successfully! You can learn this course in 'My Course' now.~"
        );
      }
    },
    async imgUploadAction({ getters }, payload) {
      const storage = getStorage();
      const cid = getters.getCreateCid;
      const storageRef = ref(storage, "cover/" + cid + ".jpg");
      // Upload the file and metadata
      const uploadTask = await uploadBytes(storageRef, payload);
      const Url = await getDownloadURL(uploadTask.ref);
      const courseRef = doc(db, "course", cid);
      await updateDoc(courseRef, {
        coverUrl: Url
      });
    },
    async videoUploadAction({ getters }, payload) {
      const storage = getStorage();
      const cid = getters.getCreateCid;
      const storageRef = ref(storage, "video/" + cid + ".mp4");
      // Upload the file and metadata
      const uploadTask = await uploadBytes(storageRef, payload);
      const Url = await getDownloadURL(uploadTask.ref);
      const courseRef = doc(db, "course", cid);
      updateDoc(courseRef, {
        videoUrl: Url
      }).then(() => {
        alert("Creation Complete!");
        getAllCourseRequest();
        window.location.reload();
      });
    },
    async createCourseAction({ commit }, payload) {
      const { name, description } = payload;
      const newCourseRef = doc(collection(db, "course"));
      commit("updateCreateCid", newCourseRef.id);
      const data = {
        cid: newCourseRef.id,
        title: name,
        description: description
      };
      await setDoc(newCourseRef, data);
    },
    async getMyCourseAction({ commit }, payload) {
      const result: any = await getMyCourseRequest(payload);
      commit("updateMyCourseList", result.data);
      localCache.setCache("myCourseList", result.data);
    },
    loadMyCourse({ commit }) {
      const myCourseList = localCache.getCache("myCourseList");
      if (myCourseList) {
        commit("updateMyCourseList", myCourseList);
      }
    },
    async setLearningCourse({ commit }, payload) {
      const result: any = await getCourseRequest(payload);
      commit("updateLearningCourse", result.data);
      localCache.setCache("learningCourse", result.data);
    },
    loadLearningCourse({ commit }, payload) {
      const learningCourse = localCache.getCache("learningCourse");
      if (learningCourse) {
        commit("updateLearningCourse", learningCourse);
      }
    },
    async deleteCourse({ commit }, payload) {
      await deleteCourseRequest(payload);
      getAllCourseRequest();
      window.location.reload();
    },
    async uploadAvatar({ commit }, payload) {
      const { file, uid } = payload;
      const storage = getStorage();
      const storageRef = ref(storage, "avatar/" + uid + ".jpg");
      const uploadTask = await uploadBytes(storageRef, file);
      const Url = await getDownloadURL(uploadTask.ref);
      const UserRef = doc(db, "user", uid);
      await updateDoc(UserRef, {
        avatarUrl: Url
      });
    }
  }
};

export default CourseModule;
