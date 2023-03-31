import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "Root",
			redirect: "/home",
			component: () => import("../views/layout/index.vue"),
			children: [
				{
					path: "/home",
					name: "home",
					component: HomeView
				},
				{
					path: "/about",
					name: "About",
					component: () => import("../views/about.vue")
				},
				{
					path: "/child1/:path?",
					name: "Child1",
					meta: { title: "子应用1", menuActive: "/child1", host: "//localhost:2001" },
					component: () => import("../views/child-view.vue")
				},
				{
					path: "/child2/:path?",
					name: "Child2",
					meta: { title: "子应用2", menuActive: "/child2", host: "//localhost:2002" },
					component: () => import("../views/child-view.vue")
				},
				{
					path: "/child3/:path?",
					name: "Child3",
					meta: { title: "子应用3", menuActive: "/child3", host: "//localhost:2003" },
					component: () => import("../views/child-view.vue")
				},
				{
					path: "/child4/:path?",
					name: "Child4",
					meta: { title: "子应用4", menuActive: "/child4", host: "//localhost:2004" },
					component: () => import("../views/child-view.vue")
				}
			]
		}
	]
});

export default router;
