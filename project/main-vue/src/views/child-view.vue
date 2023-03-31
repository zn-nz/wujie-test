<template>
	<WujieVue
		width="100%"
		height="100%"
		style="flex: 1"
		alive
		:name="route.name"
		:url="url"
		:fetch="fetch"
		:props="{ ...props, appName: route.name }"
		:beforeLoad="beforeLoad"
		:beforeMount="beforeMount"
		:afterMount="afterMount"
		:beforeUnmount="beforeUnmount"
		:afterUnmount="afterUnmount"
		:activated="activated"
		:deactivated="deactivated"
		:loadError="loadError"
		:plugins="[
			{
				cssAfterLoaders: [{ content: 'html{view-transition-name:none}' }] // https://developer.chrome.com/blog/spa-view-transitions-land/
			}
		]"
	></WujieVue>
</template>
<script setup>
import { computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import hostMap from "@/constant/host-map";
import fetch from "@/utils/fetch";
import WujieVue from "wujie-vue3";
import { angularAppNames, commonProps } from "@/constant/micro";
const route = useRoute();

const props = { ...commonProps };
function beforeLoad(appWindow) {
	console.log(`${appWindow.__WUJIE.id}: beforeLoad`);
}
function beforeMount(appWindow) {
	console.log(`${appWindow.__WUJIE.id}: beforeMount`);
}
function afterMount(appWindow) {
	console.log(`${appWindow.__WUJIE.id}: afterMount`);
}
function beforeUnmount(appWindow) {
	console.log(`${appWindow.__WUJIE.id}: beforeUnmount`);
}
function afterUnmount(appWindow) {
	console.log(`${appWindow.__WUJIE.id}: afterUnmount`);
}
function activated(appWindow) {
	console.log(`${appWindow.__WUJIE.id}: activated`);
	if (_initPath) {
		// angular刷新浏览器初始化路由有问题
		setTimeout(() => {
			WujieVue.bus.$emit(`${appWindow.__WUJIE.id}-router-change`, _initPath);
			_initPath = null;
		}, 0);
	}
}
function deactivated(appWindow) {
	console.log(`${appWindow.__WUJIE.id}: deactivated`);
}
function loadError(url, err) {
	console.log(`${route.name}: loadError`, url);
}

const url = computed(() => {
	if (angularAppNames.includes(route.name)) {
		// angular刷新浏览器初始化路由有问题
		return hostMap(route.meta.host);
	}
	return `${hostMap(route.meta.host)}/${route.params.path || ""}`;
});

let _initPath;
onMounted(() => {
	console.log("childView: onMounted", url.value);
	if (angularAppNames.includes(route.name)) {
		_initPath = route.params.path;
	}
});
// 子应用启动保活模式(配合alive)
watch(
	() => [route.params.path, route.meta.host],
	() => {
		console.log("childView: watch", `/${route.params.path}`);
		WujieVue.bus.$emit(`${route.name}-router-change`, `/${route.params.path}`);
	},
	{
		immediate: true
	}
);
</script>
