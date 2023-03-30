<template>
  <el-container class="layout-container">
    <layoutAside />
    <el-container class="flex-center" :class="{ 'layout-backtop': !isFixedHeader }">
      <layoutHeader v-if="isFixedHeader" />
      <el-scrollbar ref="layoutDefaultsScrollbarRef" :class="{ 'layout-backtop': isFixedHeader }">
        <layoutHeader v-if="!isFixedHeader" />
        <layoutMain />
      </el-scrollbar>
    </el-container>
    <el-backtop target=".layout-backtop .el-scrollbar__wrap"></el-backtop>
  </el-container>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '@/store/themeConfig';
import layoutAside from '@/layout/component/aside.vue';
import layoutHeader from '@/layout/component/header.vue';
import layoutMain from '@/layout/component/main.vue';

const route = useRoute();
const layoutDefaultsScrollbarRef = ref()
const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);
const isFixedHeader = computed(() => {
  return themeConfig.value.isFixedHeader;
});
// 监听路由的变化
watch(
  () => route.path,
  () => {
    layoutDefaultsScrollbarRef.value.wrapRef.scrollTop = 0;
  }
);
</script>
