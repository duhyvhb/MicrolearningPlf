<template>
  <div class="main common-layout">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="3">
            <div class="logo">
              <img src="~@/assets/logo.png" alt="" />
              <span class="title">Microlearning</span>
            </div>
          </el-col>
          <el-col :span="5" :offset="16">
            <div class="right">
              <el-button @click="changeComp()">{{ signBtn }}</el-button>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <div class="slogan">
          <span>Learning is a journey. So is life.</span>
        </div>

        <div class="login">
          <Transition name="fade" mode="out-in">
            <component :is="currentComp"></component>
          </Transition>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginPanel from "./cpns/LoginPanel.vue";
import RegisterPanel from "./cpns/RegisterPanel.vue";

export default defineComponent({
  components: {
    LoginPanel,
    RegisterPanel
  },
  data() {
    return {
      currentComp: "login-panel",
      signBtn: "sign up"
    };
  },
  methods: {
    changeComp() {
      if (this.currentComp == "login-panel") {
        this.currentComp = "register-panel";
        this.signBtn = "sign in";
      } else {
        this.currentComp = "login-panel";
        this.signBtn = "sign up";
      }
    }
  },
  setup() {
    return {};
  }
});
</script>

<style scoped lang="less">
.el-header {
  background-color: #001529;
}
.el-main {
  margin: 0;
  padding: 0;
  background-color: #409eff;
}

.slogan {
  float: left;
  margin-top: 300px;
  margin-left: 50px;
  font-size: 36px;
  font-weight: 700;
  color: white;
}
.login {
  float: right;
  margin: 50px 50px 50px 0;
  padding: 0 50px;
  top: 0;
  height: 600px;
  width: 400px;
  background-color: #f9f9f9;
  border-radius: 5% 0 5% 0;
}
.logo {
  display: flex;
  height: 28px;
  padding: 15px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  img {
    height: 60px;
  }
  .title {
    font-size: 16px;
    line-height: 60px;
    font-weight: 700;
    color: white;
  }
}
.right {
  display: flex;
  height: 28px;
  padding: 15px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
