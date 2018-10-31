import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        host: process.env.VUE_APP_HOST || "http://localhost:3000",
        user: null,
    },
    getters: {
        host(state) {
            return state.host;
        },

        user(state) {
            return state.user;
        },
    },
    mutations: {
        user(state, {type, value}) {
            state[type] = value;
        },
    },
    actions: {
        async auth ({commit}) {
            let res;

            try {
                res = await axios.get(`/auth`)
            } catch (e) {
                return commit('user', {type: 'user', value: null});
            }

            const currentUser = res.data;

            commit('user', {type: 'user', value: currentUser});
        },
    }
});
