import { createApp } from "vue";
// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import hyRequest from "./service";
import "normalize.css";
import "@/assets/css/index.less";
import { setupStore } from "./store";
import Vue3VideoPlayer from "@cloudgeek/vue3-video-player";
import "@cloudgeek/vue3-video-player/dist/vue3-video-player.css";
interface dataType {
  data: any;
  returnCode: string;
}

const app = createApp(App);
app.use(Vue3VideoPlayer, {
  lang: "en"
});
app.use(store);
app.use(router);
setupStore();
app.mount("#app");
