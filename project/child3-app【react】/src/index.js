import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { bus } from "./wujie/index.ts";

const root = ReactDOM.createRoot(document.getElementById("root"));
let basename = "";
if (window.__POWERED_BY_WUJIE__) {
	basename = process.env.NODE_ENV === "production" ? `/${bus.id.toLowerCase()}/` : "";
	bus?.$emit("log", `%c${bus.id}-app 加载`, window);
	window.__WUJIE_MOUNT = () => {
		root.render(
			<Router basename={basename}>
				<Switch>
					<App />
				</Switch>
			</Router>
		);
	};
	window.__WUJIE_UNMOUNT = () => {
		root.unmount();
	};
} else {
	root.render(
		<Router basename={basename}>
			<Switch>
				<App />
			</Switch>
		</Router>
	);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
