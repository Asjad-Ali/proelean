import { createStore } from 'vuex'
import * as auth from './modules/auth.store'
import * as home from './modules/home.store'
import * as services from './modules/services.store'
import * as categories from './modules/categories.store'
import * as buyer from './modules/buyer.store'
import * as become_seller from './modules/become_seller.store'

let user = JSON.parse(localStorage.getItem('userInfo'));

export default createStore({
  state: {
    isLoggedIn: localStorage.getItem('PROELEAN_TOKEN') ? true : false,
    isSeller: user && user.isFreelancer ? true : false,  
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    home,
    services,
    categories,
    buyer,
    become_seller
  }
})
