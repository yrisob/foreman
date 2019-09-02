import Vue from 'vue'
import Vuex from 'vuex'
import authStore from './store/auth.store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: authStore
  }
})
