<template>
	<div class="zn-content">
		<main>child1首页</main>
		<div class="filter-container">
			<el-input v-model="temp.num" class="filter-item"></el-input>
			<el-button class="filter-item" @click="visible = true">弹窗</el-button>
		</div>
		<el-dialog v-model="visible">
			<el-form>
				<el-form-item label="啊手动阀">
					<el-input v-model="temp.num"></el-input>
				</el-form-item>
				<el-form-item label="阿斯顿发生">
					<el-input-number v-model="temp.num" :max="100"></el-input-number>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>
<script setup>
import { ref } from "vue";

const visible = ref(false);
const temp = ref({ num: 1 });
</script>
