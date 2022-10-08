<template>
  <div class="nav-header">
    <el-icon @click="handleFoldClick">
      <component :is="isFold ? 'expand' : 'fold'"></component>
    </el-icon>
    <div class="content">
      <NavBreadcrumb :breadcrumbs="breadcrumbs" />
      <div class="userinfo">
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar
              :size="30"
              :src="avatarUrl"
              fit="fill"
              @click="goProfile"
            />
            <span class="uname">{{ username }}</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="logOut">Log out</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch } from "vue";
import { Expand, Fold } from "@element-plus/icons-vue";
import { createStore, useStore } from "vuex";
import NavBreadcrumb from "@/components/nav-breadcrumb";
import { HyBreadcrumb } from "@/components/nav-breadcrumb/types";
import { useRouter } from "vue-router";
import router from "@/router";

export default defineComponent({
  emits: ["foldChange"],
  components: {
    Fold,
    Expand,
    NavBreadcrumb
  },
  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();
    const username = computed(() => store.state.login.userInfo.username);
    const isFold = ref(false);
    const handleFoldClick = () => {
      isFold.value = !isFold.value;
      emit("foldChange", isFold.value);
    };
    const avatarUrl = computed(() => store.state.login.userInfo.avatarUrl);

    const breadcrumbs = computed(() => store.state.bread.currentBread);

    const goProfile = () => {
      let bread = [];
      bread.push({ name: "Profile" });
      router.push({
        path: "/home/profile"
      });
      store.dispatch("bread/changeBreadAction", bread);
    };

    const logOut = () => {
      store.dispatch("login/logOut");
      router.push("/");
      window.location.reload();
    };

    return {
      isFold,
      handleFoldClick,
      avatarUrl,
      username,
      breadcrumbs,
      logOut,
      goProfile
    };
  }
});
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .el-icon {
    margin-top: 6px;
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    flex: 1;
    padding: 0 20px;
    align-items: center;
  }

  .el-dropdown-link {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    align-items: center;
  }
}
</style>
