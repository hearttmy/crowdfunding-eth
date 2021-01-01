import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    funding: {},
    isEmpty: true,
  },
  mutations: {
    updateFunding(state, res) {
      state.funding = res
      state.isEmpty = false
    },
  },
})

export default store