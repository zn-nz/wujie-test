import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Switch } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
export const basename = process.env.PUBLIC_URL;

if (window.__POWERED_BY_WUJIE__) {
	window.__webpack_public_path__ = window.__WUJIE_PUBLIC_PATH__;
}

root.render(
	<Router basename={basename}>
		<Switch>
			<App />
		</Switch>
	</Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
