<template>
	<el-header class="layout-header" :height="setHeaderHeight" v-show="!isTagsViewCurrenFull">
		<NavBarsIndex />
	</el-header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '@/store/themeConfig';
import { useTagsViewRoutes } from '@/store/tagsViewRoutes';
import NavBarsIndex from '@/layout/navBars/index.vue';

const storesTagsViewRoutes = useTagsViewRoutes();
const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);
const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes);
// 设置 header 的高度
const setHeaderHeight = computed(() => {
	let { isTagsview, layout } = themeConfig.value;
	if (isTagsview && layout !== 'classic') return '84px';
	else return '50px';
});
</script>
