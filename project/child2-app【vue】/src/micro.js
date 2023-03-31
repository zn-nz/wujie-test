import WujieVue from "wujie-vue3";
import { commonProps } from "./constant/micro";
import router from "./router";
import logger from "./utils/logger";

export const { bus, setupApp, preloadApp, destroyApp } = WujieVue;

export default {
	install(app) {
		app.use(WujieVue);
		bus.$on("log", (...log) => {
			if (window.__POWERED_BY_WUJIE__) {
				bus.$emit("log", ...log);
			} else {
				logger(...log);
			}
		});
		bus.$on(commonProps.routeEventName, (name, path) => {
			const mainPath = `/${name}${path}`.toLowerCase().replace(/\/$/, "");
			const { name: currentName, path: currentPath } = router.currentRoute.value;
			const mainNameDiff = name.toLowerCase() === currentName?.toLowerCase();
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
