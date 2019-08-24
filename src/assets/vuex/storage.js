import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },

  actions: {
    userLogged (context, user) {
      console.log(user)
    }
  },

  mutations: {
    USER_LOGGED (state, user) {
      state.user = user
    }
  },
});
