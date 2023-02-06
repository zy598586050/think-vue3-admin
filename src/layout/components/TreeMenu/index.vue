<template>
  <template v-for="menu in menuList" :key="menu.path">
    <el-sub-menu v-if="menu.children.length > 0" :index="menu.path">
      <template #title>
        <el-icon>
          <component :is="menu.icon" class="w-4 h-4 mr-2" />
        </el-icon>
        <span class="text-size-14">{{ menu.meta.title }}</span>
      </template>
      <tree-menu :menu-list="menu.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="menu.path">
      <template #title>
        <el-icon>
          <component :is="menu.icon" class="w-4 h-4 mr-2" />
        </el-icon>
        <span class="text-size-14">{{ menu.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import TreeMenu from "@/layout/components/TreeMenu/index.vue";
defineProps({
  menuList: {
    type: Array as any,
    default: () => [],
  },
});
</script>
