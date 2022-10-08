<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="~@/assets/logo.png" alt="" />
      <span v-if="!collapse" class="title">Microlearning</span>
    </div>
    <el-menu
      active-text-color="#ffd04b"
      background-color="#051E34"
      text-color="#fff"
      unique-opened:boolean="true"
      :collapse="collapse"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><School /></el-icon>
          <span>Course</span>
        </template>
        <el-menu-item index="1-1" @click="handleItemClick($event)">
          Explore
        </el-menu-item>
        <el-menu-item index="1-2" @click="handleItemClick($event)"
          >My Course</el-menu-item
        >
        <el-menu-item
          index="1-3"
          v-if="role == 1"
          @click="handleItemClick($event)"
          >Course Manage</el-menu-item
        >
      </el-sub-menu>
      <el-menu-item index="2" @click="handleItemClick($event)">
        <el-icon><ChatLineSquare /></el-icon>
        <span>Post</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { School, ChatLineSquare } from "@element-plus/icons-vue";
export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  components: {
    School,
    ChatLineSquare
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const role = computed(() => store.state.login.userInfo.role);
    let bread = [];
    const handleItemClick = (e: any) => {
      bread = [];
      if (e.index == "1-1") {
        router.push("/home/course/explore");
        bread.push({ name: "Course" });
        bread.push({ name: "Explore" });
      } else if (e.index == "1-2") {
        router.push("/home/course/user");
        bread.push({ name: "Course" });
        bread.push({ name: "My Course" });
      } else if (e.index == "1-3") {
        router.push("/home/course/manage");
        bread.push({ name: "Course" });
        bread.push({ name: "Manage Course" });
      } else if (e.index == "2") {
        router.push("/home/post");
        bread.push({ name: "Post" });
      }
      store.dispatch("bread/changeBreadAction", bread);
    };
    return {
      role,
      School,
      ChatLineSquare,
      handleItemClick
    };
  }
});
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      line-height: 28px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }
}
</style>
