import { createStore } from 'vuex'
import Api from '@/services/API';
import * as auth from './modules/auth.store'
import * as home from './modules/home.store'
import * as services from './modules/services.store'
import * as seller from './modules/seller.store'
import * as categories from './modules/categories.store'
import * as buyer from './modules/buyer.store'
import * as become_seller from './modules/become_seller.store'


let user = JSON.parse(localStorage.getItem('userInfo'));

export default createStore({
  state: {
    isLoggedIn: localStorage.getItem('PROELEAN_TOKEN') ? true : false,
    isSeller: user && user.isFreelancer ? true : false,  
    userNotifications:{},
  },
  getters: {
    getUserNotifications : state => state.userNotifications,
  },
  mutations: {
    setNotification(state,notification) {
      state.userNotifications=notification;
    },
  },
  actions: {
    async getNotification({commit}){
      const res = await Api.get('notification');
      if(res.status === 200){
        commit("setNotification",res.notifications)
      }
      else{
        commit("setNotification",res.message)
      }
    },
  },
  modules: {
    auth,
    home,
    services,
    seller,
    categories,
    buyer,
    become_seller
  }
})
