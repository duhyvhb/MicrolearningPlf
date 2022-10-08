<template>
  <div class="login-panel">
    <h1 class="title">Start learning right now !</h1>
    <el-form
      :model="account"
      :rules="rules"
      status-icon
      label-width="120px"
      ref="accountRef"
    >
      <el-form-item label="Email account" prop="email">
        <el-input v-model="account.email" />
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="account.password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(accountRef)">
          <span class="btnText">Sign in</span>
          <el-icon><Right /></el-icon>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import { useStore } from "vuex";
import { Right } from "@element-plus/icons-vue";

export default defineComponent({
  components: {
    Right
  },
  setup() {
    const store = useStore();
    const account = reactive({
      email: "",
      password: ""
    });

    const accountRef = ref<FormInstance>();

    const validateEmail = (rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("Please input the email"));
      } else {
        callback();
      }
    };
    const validatePass = (rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      } else {
        callback();
      }
    };

    const rules = reactive({
      email: [{ validator: validateEmail, trigger: "blur" }],
      password: [{ validator: validatePass, trigger: "blur" }]
    });

    const onSubmit = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          store.dispatch("login/accountLoginAction", { ...account });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };
    return { account, rules, onSubmit, accountRef, Right };
  }
});
</script>

<style scoped>
.el-form-item {
  margin-top: 50px;
}

.el-form-item:nth-child(2) {
  padding-bottom: 100px;
  border-bottom: 1px solid #000000;
}

.el-form {
  position: relative;
}

.el-button {
  display: flex;
  margin-top: 100px;
  width: 200px;
  font-weight: 700;
}
.btnText {
  margin-right: 20px;
}
</style>
