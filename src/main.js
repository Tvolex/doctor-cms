import Vue from "vue";
import Vuetify from "vuetify";
import Toaster from 'v-toaster'
import App from "./App.vue";
import router from "./router";
import store from "./store";

import 'vuetify/dist/vuetify.css'
import 'v-toaster/dist/v-toaster.css'

Vue.config.productionTip = true;

Vue.use(Vuetify);
Vue.use(Toaster, {timeout: 5000})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
