import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./assets/styles/index.scss";

import Micro from "./micro";

const app = createApp(App);

app.use(Micro);
app.use(createPinia());
app.use(router);

app.mount("#app");
