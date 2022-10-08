<template>
  <div class="course-user">
    <template v-if="courseList.length == 0">
      <span class="blank">
        You have no course registered.<br />
        Go to 'Explore' to find a course you would like to learn!
      </span>
    </template>
    <template v-else :key="course.cid" v-for="course in courseList">
      <el-card>
        <img :src="course.coverUrl" class="image" />
        <div style="padding: 14px">
          <span>{{ course.title }}</span>
          <el-divider />
          <div class="bottom" divided>
            <el-button type="success" class="button" @click="learn(course.cid)"
              >learn</el-button
            >
          </div>
        </div>
      </el-card>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();
    const courseList = computed(() => store.state.course.myCourseList);
    const uid = computed(() => store.state.login.userInfo.uid).value;
    store.dispatch("course/getMyCourseAction", { uid: uid });
    store.dispatch("course/turnOffCourse");
    const learn = (cid: any) => {
      store.dispatch("course/setLearningCourse", { cid: cid });
      store.dispatch("course/turnOnCourse");
      router.push("/home/course/user/learn");
    };
    return { courseList, learn };
  }
});
</script>

<style scoped lang="less">
.el-card {
  float: left;
  margin-left: 20px;
  margin-bottom: 20px;
}
img {
  width: 200px;
  height: 150px;
}

.blank {
  display: flex;
  width: 100%;
  height: 500px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 30px;
  line-height: 60px;
  font-weight: 700;
}
</style>
