<template>
	<!-- :collapse="isCollapse" -->
	<el-menu :default-active="defaultActive" :collapse-transition="false" router class="aside-menu">
		<ElScrollbar>
			<menu-item :data="sideMenuList" />
		</ElScrollbar>
	</el-menu>
</template>
<script setup>
import { computed } from "vue";
import { ElScrollbar } from "element-plus";
import { useRoute } from "vue-router";
import MenuItem from "./MenuItem.vue";
const sideMenuList = [
	{
		path: "/home",
		name: "home",
		meta: { title: "基座首页" }
	},
	{
		path: "/about",
		name: "About",
		meta: { title: "基座about" }
	},
	{
		path: "/child1",
		name: "Child1",
		meta: { title: "子应用1【vue】" }
	},
	{
		path: "/child2",
		name: "Child2",
		meta: { title: "子应用2【vue】" }
	},
	{
		path: "/child3",
		name: "Child3",
		meta: { title: "子应用3【react】" }
	},
	{
		path: "/child4",
		name: "Child4",
		meta: { title: "子应用4【angular】" }
	}
];

const route = useRoute();
const defaultActive = computed(() => {
	const { path, meta } = route;
	const { menuActive } = meta;
	return menuActive || path;
});
</script>
<style lang="scss" scoped>
.aside-menu {
	height: 100%;
	border: none;
	.side-title {
		color: white;
		padding: 40px 18px 10px 20px;
		line-height: 1;
		white-space: nowrap;
		position: relative;
		.blank-link {
			position: absolute;
			border: 1px solid white;
			padding: 6px 8px;
			font-size: 12px;
			border-radius: 16px;
			top: 8px;
			right: 10px;
		}
	}
	.el-scrollbar {
		height: calc(100% - 74px);
	}
	.el-menu-item {
		min-width: unset;
	}
}
</style>
