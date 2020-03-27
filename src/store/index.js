import Vue from 'vue'
import Vuex from './vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    age: 10
  },
  getters: {
    getAge(state) {
      return state.age + 100;
    }
  },
  mutations: {
    add(state, payload) {
      state.age += payload;
    },
    minus(state, payload) {
      state.age -= payload;
    }
  },
  actions: {
    minus({commit}, payload){
      commit('minus', payload);
    }
  }
})
