/* eslint-disable react-hooks/exhaustive-deps */
import WujieReact from "wujie-react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import hostMap from "../constant/host-map";
import { angularAppNames, commonProps } from "../constant/micro";

let _initPath;
export default function ChildView({ host, appName, ...props }) {
	const location = useLocation();
	const path = location.pathname.replace(`/${appName.toLowerCase()}`, "");
	let url = `${hostMap(host)}${path}`;
	if (appName === "Child4") {
		// angular刷新浏览器初始化路由有问题
		url = hostMap(host);
	}
	useEffect(() => {
		console.log("childView: watch", `${path || "/"}`);
		WujieReact.bus.$emit(`${appName}-router-change`, `${path || "/"}`);
	}, [appName, path]);
	useEffect(() => {
		if (angularAppNames.includes(appName)) {
			_initPath = path;
		}
	}, []);
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
				WujieReact.bus.$emit(`${appWindow.__WUJIE.id}-router-change`, _initPath);
				_initPath = null;
			}, 0);
		}
	}
	function deactivated(appWindow) {
		console.log(`${appWindow.__WUJIE.id}: deactivated`);
	}
	function loadError(url, err) {
		console.log(`${appName}: loadError`, url);
	}
	return (
		<WujieReact
			width="100%"
			height="100%"
			alive
			url={url}
			name={appName}
			props={{ ...commonProps, ...props }}
			beforeLoad={beforeLoad}
			beforeMount={beforeMount}
			afterMount={afterMount}
			beforeUnmount={beforeUnmount}
			afterUnmount={afterUnmount}
			activated={activated}
			deactivated={deactivated}
			loadError={loadError}
			plugins={[
				{
					cssAfterLoaders: [{ content: "html{view-transition-name:none}" }] // https://developer.chrome.com/blog/spa-view-transitions-land/
				}
			]}
		></WujieReact>
	);
}
