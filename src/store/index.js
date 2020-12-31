import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    funding: {},
  },
  mutations: {
    updateFunding(state, res) {

    },
    setSessionStorage(state) {
      sessionStorage.setItem('state', JSON.stringify(state))
    },
    getSessionStorage(state) {
      if (sessionStorage.getItem('state') != null) {
        const tmp = JSON.parse(sessionStorage.getItem('state'))
        state.funding = tmp.funding
      }
    }
  },
})

export default store