import { createStore } from 'vuex'
import * as auth from './modules/auth.store'
import * as home from './modules/home.store'
import * as services from './modules/services.store'

export default createStore({
  state: {
    isLoggedIn: localStorage.getItem('PROELEAN_TOKEN') ? true : false
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    home,
    services
  }
})
