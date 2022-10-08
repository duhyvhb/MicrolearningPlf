<template>
  <div class="course-learn">
    <div class="video-header">
      <h2>{{ courseInfo.title }}</h2>
      <el-button type="danger" @click="Back">Back</el-button>
    </div>
    <div class="video">
      <vue3-video-player
        @play="playMethod"
        v-if="courseInfo.videoUrl"
        :src="courseInfo.videoUrl"
      ></vue3-video-player>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const learning = computed(() => store.state.course.learning);
    const Back = () => {
      router.back();
    };
    const courseInfo = computed(() => store.state.course.learningCourse);
    const Url = courseInfo.value.videoUrl;
    const playMethod = () => {
      console.log("video playing");
    };
    return { courseInfo, Back, learning, Url, playMethod };
  }
});
</script>

<style scoped>
.video-header {
  position: relative;
  width: 100%;
  height: 80px;
}
.video {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

h2 {
  position: absolute;
  float: left;
  width: 300px;
  left: 50%;
  margin-left: -150px;
}

.el-button {
  float: right;
  margin-top: 20px;
  margin-right: 50px;
}
</style>
