import "./App.css";
import { useEffect } from "react";
import { Route, NavLink, Redirect, useHistory, useLocation } from "react-router-dom";
import { bus, props } from "./wujie/index.ts";
import Home from "./views/home";
import About from "./views/about";

function App() {
	const history = useHistory();
	const location = useLocation();
	useEffect(() => {
		// 通知基座子应用路由更新
		bus?.$emit(props.routeEventName, bus.id, location.pathname);
	}, [location]);
	useEffect(() => {
		bus?.$emit("log", `%c${bus.id}开始监听路由`);
		// 接收基座子应用初始路由
		bus?.$on(`${bus.id}-router-change`, (path) => {
			bus?.$emit("log", `%c${bus.id}切换路由%c${path}`);
			history.push(path);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className="App">
			<div>
				<nav>
					<NavLink to="/">首页</NavLink> | <NavLink to="/about">关于</NavLink>
				</nav>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/about">
					<About />
				</Route>
				<Route exact path="/">
					<Redirect to="/" />
				</Route>
			</div>
		</div>
	);
}

export default App;
