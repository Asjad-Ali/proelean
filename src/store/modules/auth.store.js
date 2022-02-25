import Api from '@/services/API'
import { createToaster } from '@meforma/vue-toaster';
import router from '@/router';

export const state = {
    status: {isLoggedIn:false},
    error: null,
    setPasswordSection:false,
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

  setForgotPasswordSection(state, value){
    state.setPasswordSection = value
  },

  setUserAsSeller(state) {
    state.user.isFreelancer = 1;
    console.log(state.user)
    localStorage.setItem("userInfo",JSON.stringify(state.user))
  }
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

            ///////     date conversion
            const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
            const dateObj = new Date(resp.data.created_at);
            const month = monthNames[dateObj.getMonth()];
            const day = String(dateObj.getDate()).padStart(2, '0');
            const year = dateObj.getFullYear();
            const output = day + ' ' + month  + ', ' + year;
            ///////     date conversion end
            localStorage.setItem("userInfo",JSON.stringify(resp.data))

            var userAuthDate = JSON.parse(localStorage.getItem("userInfo"))
            userAuthDate.created_at = output;
            localStorage.setItem("userInfo",JSON.stringify(userAuthDate))

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

      async forgotPassword({commit},payload){
        console.log("Email",payload)
        commit('setRegisterStatus',2);
        const toaster = createToaster()
        const resp = await Api.post('forgot_password',payload)
        if(resp.status==200){
          toaster.success(resp.message,{
            position:"top-right",
            dismissible: true});
          commit('setRegisterStatus',3);
          commit('setForgotPasswordSection',true)
        }
        else
        {
          commit('setRegisterStatus',4);
          toaster.error(resp.message,{
            position:"top-right",
            dismissible: true});
        }
      },
      async changePassword({commit},payload){
        console.log("Email",payload)
        commit('setRegisterStatus',2);
        const toaster = createToaster()
        const resp = await Api.post('change_password',payload)
        if(resp.status==200){
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
      }
  }

  export const getters = {
    getAuthUser: (state) => state.user,
    getRegisterStatus : state => state.registerStatus,
    getPasswordSection : state => state.setPasswordSection,
  }


  