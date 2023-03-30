<template>
	<div class="layout-footer mt15" v-show="isDelayFooter">
		<div class="layout-footer-warp">
			<div>Copyright © 2021-2023 think-js.cn All Rights Reserved.</div>
			<div class="mt5">张家口龙宝宝网络科技有限公司版权所有</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { toRefs, reactive } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';

const state = reactive({
	isDelayFooter: true,
});
// 路由改变时，等主界面动画加载完毕再显示 footer
onBeforeRouteUpdate(() => {
	setTimeout(() => {
		state.isDelayFooter = false;
		setTimeout(() => {
			state.isDelayFooter = true;
		}, 800);
	}, 0);
});
const { isDelayFooter } = toRefs(state)
</script>

<style scoped lang="scss">
.layout-footer {
	width: 100%;
	display: flex;

	&-warp {
		margin: auto;
		color: var(--el-text-color-secondary);
		text-align: center;
		animation: error-num 1s ease-in-out;
	}
}
</style>
