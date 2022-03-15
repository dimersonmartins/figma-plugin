import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        trackings: []
    },
    mutations: {
        addTrackings(state, payload) {
            state.trackings = payload
        }
    },
    getters: {},
    actions: {},
    modules: {}
});