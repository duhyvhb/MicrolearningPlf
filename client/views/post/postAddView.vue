<template>
  <h2>Add Post in {{ courseName }}</h2>
  <el-form
    :model="post"
    label-width="120px"
    :rules="rules"
    ref="postRef"
    status-icon
  >
    <el-form-item label="Title" prop="title">
      <el-input v-model="post.title" />
    </el-form-item>
    <el-form-item label="Post Content" prop="content">
      <el-input v-model="post.content" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="success" @click="onSubmit(postRef)">Post</el-button>
      <el-button type="danger" @click="Back">Back</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { FormInstance } from "element-plus";
import { defineComponent, ref, computed } from "vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const store = useStore();
    const post = reactive({
      title: "",
      content: "",
      author: store.state.login.userInfo.username,
      cid: store.state.course.learningCourse.cid
    });
    const postRef = ref<FormInstance>();
    const courseName = computed(() => store.state.course.learningCourse.title);
    const validateTitle = (rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("Please input title"));
      } else {
        callback();
      }
    };

    const validateContent = (rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("Content cannot be empty"));
      } else {
        callback();
      }
    };

    const router = useRouter();
    const Back = () => {
      router.back();
    };
    const rules = reactive({
      title: [{ validator: validateTitle, trigger: "blur" }],
      content: [{ validator: validateContent, trigger: "blur" }]
    });

    const onSubmit = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          await store.dispatch("post/addPost", { ...post }).then(() => {
            router.back();
          });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };
    return {
      post,
      onSubmit,
      Back,
      rules,
      postRef,
      courseName
    };
  }
});
</script>

<style scoped>
.el-form-item {
  margin: 50px;
}
.el-button {
  float: left;
  margin-top: 100px;
  margin-left: 15%;
  margin-bottom: 100px;
  width: 200px;
  font-weight: 700;
}
</style>
