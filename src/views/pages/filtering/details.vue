<template>
	<div :style="{ height: `calc(100vh - ${initTagViewHeight}` }">
		<div class="layout-view-bg-white">
			<div class="w100 h100 flex">
				<div class="flex-margin color-primary">filtering-details 测试界面</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '@/store/themeConfig';
import { useTagsViewRoutes } from '@/store/tagsViewRoutes';

const storesTagsViewRoutes = useTagsViewRoutes();
const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);
const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes);
// 设置主内容的高度
const initTagViewHeight = computed(() => {
	let { isTagsview } = themeConfig.value;
	if (isTagsViewCurrenFull.value) {
		return `30px`;
	} else {
		if (isTagsview) return `114px`;
		else return `80px`;
	}
});
</script>
