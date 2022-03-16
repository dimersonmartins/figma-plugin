import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        trackings: [],
        graphicsTypes: [
            {
                id: 0,
                name: "Gráficos"
            },
            {
                id: 1,
                name: "Grupos"
            },
            {
                id: 2,
                name: "Linha"
            },
            {
                id: 3,
                name: "Setor"
            },
            {
                id: 4,
                name: "Coluna"
            },
            {
                id: 5,
                name: "Rosquinha"
            }
        ]
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