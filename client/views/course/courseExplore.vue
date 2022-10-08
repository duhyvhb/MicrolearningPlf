<template>
  <div class="course-explore">
    <template :key="course.cid" v-for="course in courseList">
      <el-card>
        <img :src="course.coverUrl" class="image" />
        <div style="padding: 14px">
          <span>{{ course.title }}</span>
          <el-divider />
          <div class="bottom" divided>
            <el-button
              type="primary"
              class="button"
              @click="courseRegister(course.cid, course.title)"
              >Register</el-button
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

export default defineComponent({
  setup() {
    const store = useStore();
    store.dispatch("course/getAllCourseAction");
    store.dispatch("course/turnOffCourse");
    const courseList = computed(() => store.state.course.courseList);
    const courseRegister = (cid: string, title: string) => {
      const uid = computed(() => store.state.login.userInfo.uid).value;
      const payload = {
        uid: uid,
        cid: cid
      };
      if (
        confirm("Are you sure you want to register the course " + title + "?")
      ) {
        store.dispatch("course/courseRegisterAction", payload);
      }
    };
    return { courseList, courseRegister };
  }
});
</script>

<style scoped lang="less">
.el-card {
  float: left;
  margin-left: 20px;
  margin-bottom: 20px;
  width: 250px;
  height: 350px;
}
img {
  width: 200px;
  height: 150px;
}
</style>
