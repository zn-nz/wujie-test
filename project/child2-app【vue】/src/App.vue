<template>
	<header>
		<div class="wrapper">
			<nav>
				<RouterLink to="/">Home</RouterLink>
				&nbsp; &nbsp; &nbsp; &nbsp;
				<RouterLink to="/about">About</RouterLink>
				&nbsp; &nbsp; &nbsp; &nbsp;
				<RouterLink to="/child1">内嵌子应用1【vue】</RouterLink>
				&nbsp; &nbsp; &nbsp; &nbsp;
				<RouterLink to="/child3">内嵌子应用3【react】</RouterLink>
				&nbsp; &nbsp; &nbsp; &nbsp;
				<RouterLink to="/child4">内嵌子应用4【angular】</RouterLink>
			</nav>
		</div>
	</header>

	<RouterView />
</template>
<script setup>
import { watch, onMounted } from "vue";
import { RouterLink, RouterView, useRoute, useRouter } from "vue-router";
import { bus, props } from "@/wujie";
const router = useRouter();
const route = useRoute();
watch(
	() => route.path,
	(v) => {
		// 通知基座子应用路由更新
		bus?.$emit(props.routeEventName, bus.id, v);
	}
);
onMounted(() => {
	bus?.$emit("log", `%c${bus.id}开始监听路由`);
	// 接收基座子应用初始路由
	bus?.$on(`${bus.id}-router-change`, (path) => {
		bus?.$emit("log", `%c${bus.id}切换路由%c${path}`);
		router.push(path);
	});
});
</script>
