import Vue from "vue";
import Vuetify from "vuetify";
import VueChartkick from 'vue-chartkick';
import Chart from 'chart.js';
import FullCalendar from 'vue-full-calendar';
import Notificator from './utils/notificator';
import App from "./App.vue";
import router from "./router";
import store from "./store";

import 'vuetify/dist/vuetify.min.css'
import "fullcalendar/dist/fullcalendar.min.css";

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(Notificator);
Vue.use(FullCalendar);
Vue.use(VueChartkick, {adapter: Chart});

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount("#app");
