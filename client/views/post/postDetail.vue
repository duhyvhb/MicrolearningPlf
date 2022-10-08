<template>
  <div class="post-detail">
    <h2>{{ post.title }}</h2>
    <div class="post-header">
      <span>Author: {{ post.author }}</span>
      <span>Time: {{ post.dateTime }} - {{ post.time }}</span>
      <el-button type="danger" @click="Back">Back</el-button>
    </div>

    <el-divider />

    <div class="post-content">
      <p>{{ post.content }}</p>
    </div>
    <el-divider />
    <div class="post-comment">
      <ul>
        <li v-for="comment in commentList" :key="comment.commentId">
          {{ comment.content + "   -- " + comment.author }}
        </li>
      </ul>
    </div>
    <el-divider />

    <el-form :model="comment" :rules="rules" ref="commentRef" status-icon>
      <el-form-item prop="content">
        <el-input v-model="comment.content" placeholder="Type Comment" />
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submitComment(commentRef)"
          >comment</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { FormInstance } from "element-plus";
import { defineComponent, computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const comment = reactive({
      content: ""
    });
    const commentRef = ref<FormInstance>();

    const validateComment = (rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("Comment cannot be empty"));
      } else {
        callback();
      }
    };

    const rules = reactive({
      content: [{ validator: validateComment, trigger: "blur" }]
    });
    const router = useRouter();
    const Back = () => {
      router.back();
    };
    const store = useStore();
    const pid = computed(() => store.state.post.currentPid);
    const author = computed(() => store.state.login.userInfo.username);
    store.dispatch("post/getPostDetail", { pid: pid.value });
    const post = computed(() => store.state.post.postDetail);
    store.dispatch("post/getCommentAction", { pid: pid.value });
    const commentList = computed(() => store.state.post.commentList);
    const submitComment = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          const data = {
            pid: pid.value,
            content: comment.content,
            author: author.value
          };
          await store.dispatch("post/commentPostAction", data).then(() => {
            window.location.reload();
          });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };
    return {
      post,
      commentRef,
      comment,
      rules,
      submitComment,
      commentList,
      Back
    };
  }
});
</script>

<style scoped lang="less">
.post-detail {
  padding: 50px;
}
.post-header {
  display: flex;
  justify-content: space-around;
}

.post-content {
  min-height: 300px;
}

.el-form-item:first-child {
  margin: 0 50px;
  width: 70%;
  float: left;
}
ul {
  list-style: none;
  overflow: auto;
  height: 200px;
  padding: 0;
  margin: 0;
}

ul li {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
</style>
