import Vue from 'vue'
import Vuex from './vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        name: 'haha111'
    },
    mutations: {
        setName(state) {
            state.name = 'haha222';
        }
    },
    actions: {
        setName({commit}) {
            setTimeout(() => {
                commit('setName')
            }, 2000)
        }
    }
})
