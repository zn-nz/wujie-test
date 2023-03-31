import "./App.css";
import { useEffect } from "react";
import { useHistory, Route, Link, Redirect } from "react-router-dom";
import WujieReact from "wujie-react";
import ChildView from "./views/child-view";
import Home from "./views/home";
import About from "./views/about";
import logger from "./utils/logger";
import { basename } from ".";

function App() {
	const history = useHistory();
	useEffect(() => {
		WujieReact?.bus?.$on("log", (...log) => {
			logger(...log);
		});
		WujieReact?.bus?.$on("sub-route-change", (name, path) => {
			const mainPath = `/${name}${path}`.toLowerCase().replace(/\/$/, "");
			const currentPath = window.location.pathname.replace(`/${basename}`, "");
			switch (true) {
				case mainPath !== currentPath:
					logger(`%c基座路由切换%c${mainPath}`);
					history.push(mainPath);
					break;
				default:
					break;
			}
		});
		// eslint-disable-next-line
	}, []);
	return (
		<div className="App">
			<div>
				<nav>
					<Link to="/">首页</Link> | <Link to="/about">关于</Link> | <Link to="/child1">child1【vue】</Link> | <Link to="/child2">child2【vue】</Link> |<Link to="/child3">child3【react】</Link>|
					<Link to="/child4">child4【angular】</Link>
				</nav>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/about">
					<About />
				</Route>
				<Route path="/child1/:path?">
					<ChildView appName="Child1" host="//localhost:2001" />
				</Route>
				<Route path="/child2/:path?">
					<ChildView appName="Child2" host="//localhost:2002" />
				</Route>
				<Route path="/child3/:path?">
					<ChildView appName="Child3" host="//localhost:2003" />
				</Route>
				<Route path="/child4/:path?">
					<ChildView appName="Child4" host="//localhost:2004" />
				</Route>
				<Route exact path="/">
					<Redirect to="/" />
				</Route>
			</div>
		</div>
	);
}

export default App;
