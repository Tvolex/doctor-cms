import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard.vue";
import Register from "./views/Register";
import PersonalKey from "./views/personalKey";

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
			path: "/register",
			name: "Register",
			component: Register
		},
		{
			path: "/personalKey",
			name: "PersonalKey",
			component: PersonalKey
		},
		{
			path: "/login",
			name: "Login",
			component: Login
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
            path: "/dashboard/calendar",
            name: "Calendar",
            component: Dashboard
        },
		{
			path: "/dashboard/newPatient",
			name: "newPatient",
			component: Dashboard
		},
		{
			path: "/dashboard/newDoctor",
			name: "newDoctor",
			component: Dashboard
		},
        {
            path: "/dashboard/findPatient",
            name: "findPatient",
            component: Dashboard
        },
		{
			path: "/dashboard/patients",
			name: "management",
			component: Dashboard
		},
        {
            path: "/dashboard/doctors",
            name: "management",
            component: Dashboard
        },
		{
			path: "/dashboard/settings",
			name: "Settings",
			component: Dashboard
		},


    ]
});
