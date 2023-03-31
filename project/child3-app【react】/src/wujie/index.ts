export const { bus, props, location: _location } = window.$wujie || {};

// export const location = _location || window.location;

type Wujie = {
	bus: {
		eventObj: {
			[key: string]: Function;
		};
		id: String;
		$clear: Function;
		$emit: Function;
		$off: Function;
		$offAll: Function;
		$on: Function;
		$onAll: Function;
		$once: Function;
	};
	props: {
		routeEventName: string;
		[key: string]: any;
	};
	location: Object;
	shadowRoot: ShadowRoot;
};

declare global {
	interface Window {
		$wujie: Wujie;
		// 是否存在无界
		__POWERED_BY_WUJIE__?: boolean;
		// 子应用信息
		__WUJIE: any;
		// 子应用公共加载路径
		__WUJIE_PUBLIC_PATH__: string;
		// 子应用真实window对象
		__WUJIE_RAW_WINDOW__: Window;
		// 子应用mount函数
		__WUJIE_MOUNT: () => void;
		// 子应用unmount函数
		__WUJIE_UNMOUNT: () => void;
	}
}
