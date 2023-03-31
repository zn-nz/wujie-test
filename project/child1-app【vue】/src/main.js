import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import router, { routes } from "./router";

import "./assets/styles/index.scss";
import { bus } from "@/wujie";

if (window.__POWERED_BY_WUJIE__) {
	bus?.$emit("log", `%c${bus.id}-app 加载`, window);
	let app;
	window.__WUJIE_MOUNT = () => {
		app = initApp(true);
	};
	window.__WUJIE_UNMOUNT = () => {
		app.unmount();
	};
	// module脚本异步加载，应用主动调用生命周期
	window.__WUJIE.mount();
} else {
	initApp();
}

function initApp(isWujie) {
	const app = createApp(App);
	app.use(createPinia());
	if (isWujie) {
		const basename = import.meta.env.VITE_ENV === "production" ? `/${bus.id.toLowerCase()}/` : "";
		const router = createRouter({ history: createWebHistory(basename), routes });
		app.use(router);
	} else {
		app.use(router);
	}
	app.mount("#app");
	return app;
}
