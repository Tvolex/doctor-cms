import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
		event: null,
        doctors: null,
        patients: null,
	},
    getters: {
        user(state) {
            return state.user;
        },
		event(state) {
			return state.event;
		},
        doctors(state) {
            return state.doctors;
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
        doctors(state, {type, value}) {
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

        async doctors ({commit}) {
            let res;
            try {
                res = await axios.get(`/api/user`, {
                    params: {
                        filter: {
                            type: ['doctor'],
                        }
                    }
                });
            } catch (err) {
                console.log(err);
                commit('doctors', {type: 'doctors', value: null});
                return [];
            }
            commit('doctors', {type: 'doctors', value: res.data});
            return res.data;
        },

		async patients ({commit}) {
			let res;
			try {
				res = await axios.get(`/api/user/patients`, {
                    params: {
                        filter: {
                            type: ['patient'],
                        }
                    }
				});
			} catch (err) {
				console.log(err);
				commit('patients', {type: 'patients', value: null});
				return [];
			}
			commit('patients', {type: 'patients', value: res.data});
			return res.data;
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
