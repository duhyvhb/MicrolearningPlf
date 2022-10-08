<template>
  <div class="register-panel">
    <h1 class="title">Ready to go !</h1>
    <el-form
      :model="register"
      :rules="rules"
      status-icon
      label-width="150px"
      ref="registerRef"
    >
      <el-form-item label="Email account" prop="email">
        <el-input v-model="register.email" />
      </el-form-item>
      <el-form-item label="Password(length: 6)" prop="password">
        <el-input v-model="register.password" type="password" />
      </el-form-item>
      <el-form-item label="Confirm password" prop="cpassword">
        <el-input v-model="register.cpassword" type="password" />
      </el-form-item>
      <el-form-item label="Nickname" prop="nickname">
        <el-input v-model="register.nickname" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(registerRef)">
          <span class="btnText">Sign up</span>
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
    const register = reactive({
      email: "",
      password: "",
      cpassword: "",
      nickname: ""
    });

    const registerRef = ref<FormInstance>();

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
      } else if (value.length != 6) {
        callback(new Error("The length of password should be 6"));
      } else {
        callback();
      }
    };

    const validatePass2 = (rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      } else if (value !== register.password) {
        callback(new Error("Please confirm the password"));
      } else {
        callback();
      }
    };

    const validateNickname = (rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("Please input the nickname"));
      } else {
        callback();
      }
    };

    const rules = reactive({
      email: [{ validator: validateEmail, trigger: "blur" }],
      password: [{ validator: validatePass, trigger: "blur" }],
      cpassword: [{ validator: validatePass2, trigger: "blur" }],
      nickname: [{ validator: validateNickname, trigger: "blur" }]
    });

    const onSubmit = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          store.dispatch("register/accountRegisterAction", { ...register });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };
    return { register, rules, onSubmit, registerRef, Right };
  }
});
</script>

<style scoped>
.el-form-item {
  margin-top: 45px;
}

.el-form-item:nth-child(4) {
  padding-bottom: 50px;
  border-bottom: 1px solid #000000;
}

.el-form {
  position: relative;
}

.el-button {
  display: flex;
  margin-top: 50px;
  width: 200px;
  font-weight: 700;
}
.btnText {
  margin-right: 20px;
}
</style>
