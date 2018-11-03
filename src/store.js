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
        	const hardCodedUser = {
				name: "Vasya Tysyanchyn",
				email: "tisyanchin13@gmail.com",
				password: 123456,
				avatar: "https://instagram.fiev1-1.fna.fbcdn.net/vp/9e0f28c0fd07f8209b37ab3083d066aa/5C864F9B/t51.2885-15/sh0.08/e35/s640x640/36784619_209271899775865_8618151633781522432_n.jpg",
			};

            let res;
            try {
                res = await axios.get(`/api/auth`);
            } catch (e) {
                // return commit('user', {type: 'user', value: hardCodedUser});
                commit('user', {type: 'user', value: null});
                return false;
                // TODO: delete comment
            }

            const currentUser = res.data;
            commit('user', {type: 'user', value: currentUser});
            return true;

			// TODO: delete comment

            //commit('user', {type: 'user', value: hardCodedUser});
        },
        async logout ({commit}) {
            let res;
            try {
                res = await axios.get(`/api/logout`);
            } catch (e) {
                return commit('user', {type: 'user', value: null});
            }

            commit('user', {type: 'user', value: null});
        },


    }
});
