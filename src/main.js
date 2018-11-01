import Vue from "vue";
import Vuetify from "vuetify";
import Toaster from 'v-toaster';
import FullCalendar from 'vue-full-calendar'
import App from "./App.vue";
import router from "./router";
import store from "./store";

import 'vuetify/dist/vuetify.css'
import "fullcalendar/dist/fullcalendar.min.css";
import 'v-toaster/dist/v-toaster.css'

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(FullCalendar);
Vue.use(Toaster, {timeout: 5000});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
