import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Dashboard from "./views/Dashboard.vue";

Vue.use(Router);
export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home
        },
        {
            path: "/about",
            name: "About",
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            // component: () =>
            //     import(/* webpackChunkName: "about" */ "./views/About.vue")
            component: About
        },
        {
            path: "/dashboard",
            name: "Dashboard",
            component: Dashboard
        },
		{
			path: "/dashboard/",
			name: "Dashboard",
			component: Dashboard
		},
        {
            path: "/dashboard/statistics",
            name: "Statistics",
            component: Dashboard
        },
		{
			path: "/dashboard/newPatient",
			name: "newPatient",
			component: Dashboard
		},
        {
            path: "/dashboard/findPatient",
            name: "newPatient",
            component: Dashboard
        },
		{
			path: "/dashboard/management",
			name: "newPatient",
			component: Dashboard
		},


    ]
});
