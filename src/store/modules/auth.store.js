import Api from '@/services/API'
import { createToaster } from '@meforma/vue-toaster';
import router from '@/router';

export const state = {
    status: {isLoggedIn:false},
    error: null,
    loginStatus : 1,
    registerStatus : 1,
    user: JSON.parse(localStorage.getItem("userInfo"))
  }

export const  mutations = {
  setRegisterStatus(state,status) {
    state.registerStatus = status;
  },

  setError(state,error) {
    state.error=error;
  },
}

export const  actions = {
    async login({commit},payload){
      commit('setRegisterStatus',2);
      const toaster = createToaster()
      const resp = await Api.post('login',payload)
        if(resp.status==200){
          toaster.success(resp.message,{
            position:"top-right",
            dismissible: true});
            localStorage.setItem("userInfo",JSON.stringify(resp.data))
            localStorage.setItem("PROELEAN_TOKEN",resp.token)
            commit('setRegisterStatus',3);
          router.go()
        }
        else
        {
          commit('setRegisterStatus',4); 
          toaster.error(resp.message,{
            position:"top-right",
            dismissible: true});
        }
        return resp;
      },
    async register({commit},payload){
      commit('setRegisterStatus',2);
        const toaster = createToaster()
        const resp= await Api.post('register',payload);
        if(resp.status==201){
          toaster.success(resp.message,{
            position:"top-right",
            dismissible: true});
          commit('setRegisterStatus',3);
          router.push('login');
        }
        else
        {
          commit('setRegisterStatus',4);
          toaster.error(resp.message,{
            position:"top-right",
            dismissible: true});
        }
        return resp;
      },
  }

  export const getters = {
    getAuthUser: (state) => state.user,
    getRegisterStatus : state => state.registerStatus,
  }


  