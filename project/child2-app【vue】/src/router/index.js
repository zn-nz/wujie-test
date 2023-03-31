import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
export const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView
	},
	{
		path: "/about",
		name: "about",
		// route level code-splitting
		// this generates a separate chunk (About.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import("../views/AboutView.vue")
	},
	{
		path: "/child1/:path?",
		name: "Child2Child1",
		meta: { title: "子应用1", menuActive: "/child1", host: "//localhost:2001" },
		component: () => import("../views/child-view.vue")
	},
	{
		path: "/child3/:path?",
		name: "Child2Child3",
		meta: { title: "子应用3", menuActive: "/child3", host: "//localhost:2003" },
		component: () => import("../views/child-view.vue")
	},
	{
		path: "/child4/:path?",
		name: "Child2Child4",
		meta: { title: "子应用4", menuActive: "/child4", host: "//localhost:2004" },
		component: () => import("../views/child-view.vue")
	}
];
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
});

export default router;
