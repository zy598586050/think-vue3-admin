<template>
	<div class="pt15 pr15 pb15 pl15">
		<el-form :model="line" size="default" label-width="50px">
			<el-form-item label="来往">
				<el-input v-model="line.contact" placeholder="来往" clearable disabled></el-input>
			</el-form-item>
			<el-form-item label="类型">
				<el-input v-model="line.type" placeholder="类型" clearable disabled></el-input>
			</el-form-item>
			<el-form-item label="label">
				<el-input v-model="line.label" placeholder="请输入label内容" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="onLineTextReset">
					<SvgIcon name="ele-RefreshRight" />
					重置
				</el-button>
				<el-button @click="onLineTextChange" type="primary">
					<SvgIcon name="ele-Check" />
					保存
				</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue';

// 定义接口来定义对象的类型
interface WorkflowDrawerLineState {
	line: any;
}

const emit = defineEmits(['change', 'close'])

const state = reactive<WorkflowDrawerLineState>({
	line: {},
});
// 获取父组件数据
const getParentData = (data: object) => {
	state.line = data;
};
// 重置
const onLineTextReset = () => {
	state.line.label = '';
};
// 保存
const onLineTextChange = () => {
	emit('change', state.line.label);
	emit('close');
};
const { line } = toRefs(state)
</script>
