<template>
	<el-container class="layout-root">
		<el-header class="layout-root-header" height="var(--layout-header-height)">
			<layout-header />
		</el-header>
		<el-container class="layout-container" :class="{ 'is-collapse': isCollapse }">
			<el-aside class="layout-aside">
				<side-menu />
			</el-aside>
			<el-main class="layout-main">
				<div class="flex al-center nav-title">
					<i class="el-icon-s-fold collaspe-btn"></i>
					<h2 class="title">{{}}</h2>
				</div>
				<router-view class="flex-1 main-container" />
			</el-main>
		</el-container>
	</el-container>
</template>
<script setup>
import { ref } from "vue";
import LayoutHeader from "./components/LayoutHeader.vue";
import SideMenu from "./components/SideMenu.vue";

const isCollapse = ref(false);
</script>

<style lang="scss">
.layout-root {
	height: 100%;
	.layout-main {
		display: flex;
		flex-direction: column;
	}
}
</style>
