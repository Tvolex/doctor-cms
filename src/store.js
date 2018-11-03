import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
	},
    getters: {
        user(state) {
            return state.user;
        },
    },
    mutations: {
        user(state, {type, value}) {
            state[type] = value;
        },
        exit(state, {type, value}) {
            state[type] = value;
        },
    },
    actions: {
        async auth ({commit}) {
            let res;
            try {
                res = await axios.get(`/api/auth/check`);
            } catch (err) {
            	console.log(err);
                commit('user', {type: 'user', value: null});
                return false;
            }
            commit('user', {type: 'user', value: res.data});
            return true;
        },
        async logout ({commit}) {
            let res;
            try {
                res = await axios.get(`/api/auth/logout`);
            } catch (e) {
                return commit('user', {type: 'user', value: null});
            }

            commit('user', {type: 'user', value: null});
        },


    }
});
