<template>
	<div class="login-scan-container">
		<!-- <div ref="qrcodeRef"></div> -->
		<img src="https://www.zhangyubk.com/img/wechat.png"/>
		<!-- <div class="font12 mt20 login-msg">{{ $t('message.scan.text') }}</div> -->
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
// @ts-ignore
import QRCode from 'qrcodejs2-fixes';

const qrcodeRef = ref<HTMLElement | null>(null);
// 初始化生成二维码
const initQrcode = () => {
	(qrcodeRef.value as HTMLElement).innerHTML = '';
	new QRCode(qrcodeRef.value, {
		text: `https://www.zhangyubk.com/img/wechat.png`,
		width: 260,
		height: 260,
		colorDark: '#000000',
		colorLight: '#ffffff',
	});
};
// 页面加载时
onMounted(() => {
	// initQrcode();
});
</script>

<style scoped lang="scss">
.login-scan-animation {
	opacity: 0;
	animation-name: error-num;
	animation-duration: 0.5s;
	animation-fill-mode: forwards;
}

.login-scan-container {
	padding: 20px;
	display: flex;
	flex-direction: column;
	text-align: center;
	@extend .login-scan-animation;
	animation-delay: 0.1s;

	:deep(img) {
		margin: auto;
	}

	.login-msg {
		color: var(--el-text-color-placeholder);
		@extend .login-scan-animation;
		animation-delay: 0.2s;
	}
}</style>
