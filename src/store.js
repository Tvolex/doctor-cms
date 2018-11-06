import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
		event: null,
        patients: null,
	},
    getters: {
        user(state) {
            return state.user;
        },
		event(state) {
			return state.event;
		},
        patients(state) {
            return state.patients;
        },
    },
    mutations: {
        user(state, {type, value}) {
            state[type] = value;
        },
		event(state, {type, value}) {
			state[type] = value;
		},
        patients(state, {type, value}) {
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

        async patients ({commit}) {
            axios.get('/api/user/patients').then((res) => {
                commit('patients', {type: 'patients', value: res.data});
                return res.data;
            }).catch((err) => {
                console.log(err);
                return false;
            });
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
