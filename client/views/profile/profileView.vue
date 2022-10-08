<template>
  <div class="profile-view">
    <div class="header">
      <h1>Profile</h1>
    </div>
    <el-divider />
    <div class="profileBody">
      <div class="currentAvatar">
        <span>current avatar</span>
        <img :src="currentAvatar" />
      </div>
      <el-form
        :inline="true"
        :model="profile"
        ref="profileRef"
        :rules="rules"
        status-icon
      >
        <el-form-item label="Nickname" prop="nickname">
          <el-input v-model="profile.nickname" :placeholder="oldNickname" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(profileRef)"
            >Update Nickname</el-button
          >
        </el-form-item>
      </el-form>
      <el-upload
        ref="avatarUpload"
        action="#"
        :http-request="imgUploadAction"
        :show-file-list="false"
      >
        <template #trigger>
          <el-button type="primary">Update Avatar</el-button>
        </template>
      </el-upload>
    </div>
  </div>
</template>

<script lang="ts">
import { FormInstance } from "element-plus";
import { defineComponent, ref, computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const store = useStore();
    const oldNickname = computed(() => store.state.login.userInfo.username);
    const currentAvatar = computed(() => store.state.login.userInfo.avatarUrl);
    const uid = computed(() => store.state.login.userInfo.uid);
    const avatarUpload = ref();
    const imgUploadAction = async (img: any) => {
      const payload = {
        file: img.file,
        uid: uid.value
      };
      await store.dispatch("course/uploadAvatar", payload).then(() => {
        store.dispatch("login/userGetInfo", { uid: uid.value });
        alert("Avatar Updated");
        window.location.reload();
      });
    };
    const profile = reactive({
      nickname: ""
    });
    const profileRef = ref<FormInstance>();
    const validateNickname = (rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("Please input nickname"));
      } else {
        callback();
      }
    };
    const rules = reactive({
      nickname: [{ validator: validateNickname, trigger: "blur" }]
    });
    const onSubmit = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          const data = {
            uid: uid.value,
            nickname: profile.nickname
          };
          store.dispatch("login/userChangeName", data).then(() => {
            alert("Nickname Updated");
            store.dispatch("login/userGetInfo", { uid: uid.value });
          });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };
    return {
      oldNickname,
      currentAvatar,
      avatarUpload,
      imgUploadAction,
      profile,
      onSubmit,
      rules,
      profileRef
    };
  }
});
</script>

<style scoped lang="less">
.header {
  width: 100%;
  height: 50px;
}

h1 {
  float: left;
  margin-left: 20px;
}

.profileBody {
  position: relative;
  width: 100%;
  min-height: 300px;
  .currentAvatar {
    position: absolute;
    display: flex;
    float: left;
    margin-left: 50px;
    font-size: 20px;
    line-height: 40px;
    align-items: center;
    img {
      margin-left: 15px;
      width: 100px;
      height: 100px;
    }
  }
}
</style>
