import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Dashboard from "./views/Dashboard.vue";

Vue.use(Router);

const { Statistics } = Dashboard.components;

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/about",
            name: "about",
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            // component: () =>
            //     import(/* webpackChunkName: "about" */ "./views/About.vue")
            component: About
        },
        {
            path: "/dashboard",
            name: "dashboard",
            component: Dashboard
        },
        {
            path: "/dashboard/statistics",
            name: "Statistics",
            component: Statistics
        },

    ]
});