<template>
  <div class="nav-breadcrumb">
    <el-breadcrumb>
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item>{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { HyBreadcrumb } from "../types";

export default defineComponent({
  props: {
    breadcrumbs: {
      type: Array as PropType<HyBreadcrumb[]>,
      default: () => []
    }
  },
  setup() {
    return {};
  }
});
</script>

<style scoped></style>
