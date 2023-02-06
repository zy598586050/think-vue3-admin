<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="ml-4">
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="item.path"
    >
      <router-link v-if="index !== $route.matched.length - 1" to="/">{{
        item.meta.title
      }}</router-link>
      <span v-else>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style>
.el-breadcrumb__inner,
a {
  color: #fff !important;
}
.el-breadcrumb__separator {
  color: #fff !important;
}
</style>
