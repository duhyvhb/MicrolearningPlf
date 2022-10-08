<template>
  <div class="post-view">
    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column label="Title" prop="title">
        <template #default="scope">
          <span @click="viewPost(scope.row.pid)">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Author" prop="author" />
      <el-table-column label="Time" prop="time" />
      <el-table-column align="right">
        <template #header>
          <div class="headerR">
            <el-input
              v-model="search"
              size="small"
              placeholder="Type to search"
            />
            <el-button type="success" @click="addPost">Post</el-button>
            <el-button type="warning" @click="back">Back</el-button>
          </div>
        </template>
        <template #default="scope" v-if="role == 1">
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row.pid)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { deletePost } from "@/service/post/post";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const cid = computed(() => store.state.course.learningCourse.cid);
    store.dispatch("post/getPostAction", { cid: cid.value });
    const role = computed(() => store.state.login.userInfo.role);
    const postList = computed(() => store.state.post.postList);
    const search = ref("");
    const filterTableData = computed(() =>
      postList.value.filter(
        (data: any) =>
          !search.value ||
          data.title.toLowerCase().includes(search.value.toLowerCase())
      )
    );
    const addPost = () => {
      router.push({
        path: "/home/post/add"
      });
    };
    const handleDelete = async (pid: string) => {
      if (confirm("Are you sure to delete this post?")) {
        const data: any = { pid: pid };
        const result: any = await deletePost(data);
        if (result.status == 200) {
          alert("You have deleted it");
        } else if (result.status == 400) {
          alert("Fail to delete it");
        }
        store.dispatch("post/getPostAction", { cid: cid.value });
      }
    };
    const viewPost = (pid: string) => {
      store.dispatch("post/setPid", pid);
      router.push("detail");
    };
    const back = () => {
      router.back();
    };
    return {
      filterTableData,
      search,
      addPost,
      handleDelete,
      role,
      viewPost,
      back
    };
  }
});
</script>

<style scoped lang="less">
.headerR {
  display: flex;
  justify-content: flex-start;
  .el-input {
    margin-right: 10px;
  }
}

span {
  color: #95d475;
  cursor: pointer;
}

span:hover {
  color: #529b2e;
}
</style>
