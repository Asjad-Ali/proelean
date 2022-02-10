import Api from '@/services/API';
import { createToaster } from '@meforma/vue-toaster';
var page = 1;


export const state = {
  userServices:[],
  sellerReview:[],
  createGigData:'',
  deleteGig:'',
  error: null,
}

export const getters = {
  getUserServices : state => state.userServices,
  getUserServicesStatus : state => state.userServicesStatus,
  getSellerReview: state => state.sellerReview,
}


export const  mutations = {
  setUserServices(state,services){
    state.userServices=services;
  },
  setReviews(state,reviews) {
    state.sellerReview = [...state.sellerReview,...reviews];
  },
    setError(state,error) {
      state.error=error;
    },

    setCreateGig(state,createGigD) {
      state.createGigData=createGigD;
    },
    setDeleteGig(state,deletGig) {
      state.deleteGig=deletGig;
    },

  }

export const  actions = {

  async userServices({commit})
  {
    const res= await Api.get('seller/services');
    if(res.status===200){
      commit("setUserServices",res.data);
    } else {
      console.log(res);
    }
  },
  async sellerReviewsById({commit},payload)
      {
        let getData = JSON.parse(localStorage.getItem("userInfo"))
        console.log("in action id",getData.id)
          if(payload === ''){
            page = 1;
          }
          else if(payload === 'next'){
            page++;
          }
          else{
            if(page !== 1){
               page--;
            }
          }
          const res= await Api.get(`seller/${getData.id}/reviews?page=${page}`);
          if(res.status === 200){
            state.sellerReview = '';
            commit("setReviews",res.data);
            console.log("Seller Reviews",res.data);
          } else {
            console.log("Seller Reviews error");
          }  
        
        
      },
    
      async deleteGig({commit, state},serviceID){
        const toaster = createToaster()
        console.log("Delete ID",serviceID)
        const res = await Api.delete(`seller/services/${serviceID}`)
        if(res.status === 200){  
          toaster.success(res.message,{
            position:"top-right",
            dismissible: true
          });
          let tmpServices = state.userServices.filter(service => service.id !== serviceID)
          commit("setUserServices",tmpServices)
        } else{
            toaster.error(res.message,{
              position:"top-right",
              dismissible: true});
          }
      },

      async createGig({commit},payload){
        commit('setRegisterStatus',2);
        const toaster = createToaster()
        const res = await Api.formData('seller/services',payload);
        if(res.status === 200){
          toaster.success(res.message,{
            position:"top-right",
            dismissible: true});
          commit("setCreateGig",res)
          commit('setRegisterStatus',3);
        }
        else{
          toaster.error(res.message,{
            position:"top-right",
            dismissible: true});
            commit('setRegisterStatus',4); 
        }
      },
        
}
