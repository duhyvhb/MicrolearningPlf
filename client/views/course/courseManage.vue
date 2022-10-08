<template>
  <div class="course-manage">
    <el-table style="width: 100%" :data="courseList">
      <el-table-column label="Id" prop="cid" />
      <el-table-column label="Name" prop="title" />
      <el-table-column label="Description" prop="description" />
      <el-table-column align="right">
        <template #header>
          <el-button type="success" @click="createFormVisible = true"
            >Add New Course</el-button
          >
        </template>
        <template #default="scope">
          <el-button
            size="default"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="create-course">
    <el-dialog v-model="createFormVisible" title="Create Course">
      <el-form :model="courseForm" label-width="140px">
        <el-form-item label="Course name">
          <el-input v-model="courseForm.name" />
        </el-form-item>
        <el-form-item label="Course description">
          <el-input v-model="courseForm.description" />
        </el-form-item>
        <el-form-item label="Upload the cover">
          <el-upload
            ref="imgUpload"
            action="#"
            :http-request="imgUploadAction"
            :auto-upload="false"
          >
            <template #trigger>
              <el-button type="primary">Add Cover(one cover limited)</el-button>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="Upload the video">
          <el-upload
            ref="videoUpload"
            action="#"
            :http-request="videoUploadAction"
            :auto-upload="false"
          >
            <el-button type="primary">Add Video(one video limited)</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="createFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submit">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { Plus } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const store = useStore();
    store.dispatch("course/getAllCourseAction");
    store.dispatch("course/turnOffCourse");
    const courseList = computed(() => store.state.course.courseList);
    const createFormVisible = ref(false);

    const handleDelete = (index: number, row: any) => {
      if (confirm("Are you sure to delete this course?(Cannot Undo)")) {
        store.dispatch("course/deleteCourse", { cid: row.cid });
        const uid = computed(() => store.state.login.userInfo.uid).value;
        store.dispatch("course/getMyCourseAction", { uid: uid });
      }
    };

    const courseForm = reactive({
      name: "",
      description: ""
    });

    const imgUrl = "";
    const imgUpload = ref();
    const imgUploadAction = (img: any) => {
      let payload = new FormData();
      payload.append("file", img.file);
      store.dispatch("course/imgUploadAction", img.file);
    };

    const videoUpload = ref();
    const videoUploadAction = (video: any) => {
      store.dispatch("course/videoUploadAction", video.file);
    };

    const submit = async () => {
      store.dispatch("course/createCourseAction", courseForm);
      imgUpload.value?.submit();
      videoUpload.value?.submit();
    };

    return {
      courseList,
      handleDelete,
      createFormVisible,
      courseForm,
      imgUpload,
      imgUploadAction,
      imgUrl,
      videoUpload,
      videoUploadAction,
      submit,
      Plus
    };
  }
});
</script>

<style scoped>
.el-icon {
  width: 100px;
  height: 100px;
  border: 1px solid;
  font-size: 30px;
}
</style>
