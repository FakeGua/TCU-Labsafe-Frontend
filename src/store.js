import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo: {
      isLogined: false,
      username: '',
      name: '',

    }
  },
  mutations: {

  },
  actions: {

  }
})