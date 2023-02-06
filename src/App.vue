<template>
  <layout v-if="route.meta.layout" />
  <router-view v-else />
</template>

<script lang="ts" setup>
import layout from "@/layout/index.vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>
