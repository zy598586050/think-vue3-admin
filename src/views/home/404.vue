<template>
  <el-result icon="warning" title="404" sub-title="Sorry, request error">
    <template #extra>
      <el-button type="primary" @click="$router.push('/')">Back</el-button>
    </template>
  </el-result>
</template>
