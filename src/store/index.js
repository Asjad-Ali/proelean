import { createStore } from 'vuex'
import Api from '@/services/API';
import * as auth from './modules/auth.store'
import * as home from './modules/home.store'
import * as services from './modules/services.store'
import * as seller from './modules/seller.store'
import * as categories from './modules/categories.store'
import * as buyer from './modules/buyer.store'
import * as become_seller from './modules/become_seller.store'
import * as wishlist from './modules/wishlist.store'
import * as chat from './modules/chat.store'


let user = JSON.parse(localStorage.getItem('userInfo'));

export default createStore({
  state: {
    isLoggedIn: localStorage.getItem('PROELEAN_TOKEN') ? true : false,
    isSeller: user && user.isFreelancer ? true : false,  
    userNotifications:{},
    usermode:'BUYER',
    screenWidth: screen.width,
  },
  getters: {
    getUserNotifications : state => state.userNotifications,
    isBuyerMode : state => state.usermode == 'BUYER' ? true : false,
    getScreenWidth: state => state.screenWidth,
    recentNotifications:[],
    allNotifications:[],
    usermode:'BUYER'
  },
  getters: {
    getRecentNotifications : state => state.recentNotifications,
    getAllNotifications : state => state.allNotifications,
    isBuyerMode : state => state.usermode == 'BUYER' ? true : false
  },
  mutations: {
    setRecentNotification(state,notification) {
      state.recentNotifications=notification;
    },
    setAllNotification(state,notification) {
      state.allNotifications=notification;
    },
    setScreenWidth(state,width) {
      state.screenWidth=width
    },
    toggleUserMode(state){
      state.usermode = state.usermode =='BUYER' ? "SELLER" : "BUYER"
    }
  },
  actions: {
    async getNotification({commit}){
      const res = await Api.get('notification');
      if(res.status === 200){
        commit("setRecentNotification",res.notifications.slice(0,4))
        commit("setAllNotification",res.notifications)
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
    become_seller,
    wishlist,
    chat
  }
})
