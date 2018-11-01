import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null, /*{
            name: "Vasya Tysyanchyn",
            email: "tisyanchin13@gmail.com",
            password: 123456,
            avatar: "https://lh3.googleusercontent.com/Uay9SaAfrGoP-tfXGilVbmfKx8q_Mqzn2zMM0CpPst2tgjgBuFzPTrSr5eYZpyFhxDREHKQpGFgeMXfTxO8=w1202-h1262",
        },*/
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
    },
    actions: {
        async auth ({commit}) {
            let res;
            console.log('auth')
            try {
                res = await axios.get(`/api/auth`);
            } catch (e) {
                return commit('user', {type: 'user', value: null});
            }

            const currentUser = res.data;

            commit('user', {type: 'user', value: currentUser});
        },
    }
});
