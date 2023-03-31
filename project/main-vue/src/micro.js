import WujieVue from "wujie-vue3";
import router from "./router";
import logger from "./utils/logger";

export const { bus, setupApp, preloadApp, destroyApp } = WujieVue;

export default {
	install(app) {
		app.use(WujieVue);
		bus.$on("log", (...log) => {
			logger(...log);
		});
		bus.$on("sub-route-change", (name, path) => {
			const mainPath = `/${name}${path}`.toLowerCase().replace(/\/$/, "");
			const { name: currentName, path: currentPath } = router.currentRoute.value;
			const mainNameDiff = name.toLowerCase() === currentName.toLowerCase();
			switch (true) {
				case !mainNameDiff:
				case mainNameDiff && mainPath !== currentPath:
					logger(`%c基座路由切换%c${mainPath}`);
					router.push({ name, params: { path: path.replace(/^\//, "") } });
					break;
				default:
					break;
			}
		});
	}
};
