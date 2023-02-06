<template>
  <div class="flex justify-between">
    <slot name="left"></slot>
    <div v-show="!superSearch" v-if="showSearch">
      <slot name="right">
        <el-input
          v-model="keyword"
          :placeholder="placeholder"
          size="mini"
          class="w-[150px] mr-4"
          clearable
        ></el-input>
        <el-button type="primary" size="mini" @click="$emit('search', keyword)"
          >搜索</el-button
        >
        <el-button
          v-if="showSuperSearch"
          type="success"
          size="mini"
          @click="superSearch = true"
          >高级搜索</el-button
        >
      </slot>
    </div>
  </div>
  <!-- 高级搜索 -->
  <el-card v-show="superSearch" class="mt-5">
    <div class="flex justify-between items-center">
      <span class="text-base">高级搜索</span>
      <el-button type="text" @click="closeSuperSearch">收起</el-button>
    </div>
    <!-- 表单 -->
    <slot name="form"></slot>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, defineProps } from "vue";
defineProps({
  placeholder: {
    type: String,
    default: "",
  },
  // 控制是否显示搜索
  showSearch: {
    type: Boolean,
    default: true,
  },
  // 控制是否显示高级搜索按钮
  showSuperSearch: {
    type: Boolean,
    default: true,
  },
});
const keyword = ref();
const superSearch = ref(false);
const closeSuperSearch = () => {
  superSearch.value = false;
};
</script>
