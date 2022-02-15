import Api from '@/services/API';
import { createToaster } from '@meforma/vue-toaster';
var page = 1;


export const state = {
  sellerReview:[],
  userServices:[],
  userSingleService:{},
  createGigData:'',
  deleteGig:'',
  loadingStatus:'',
  servicesHasNextPage:'',
  reviewsHasNextPage:'',
  error: null,
}

export const getters = {
  getUserServices : state => state.userServices,
  getSingleService : state => state.userSingleService,
  getUserServicesStatus : state => state.userServicesStatus,
  getSellerReview: state => state.sellerReview,
  servicesHasNextPage: state => state.servicesHasNextPage
}


export const  mutations = {

  setUserServices(state,services){
    state.userServices=services;
  },
  setSingleService(state,service){
    state.userSingleService=service;
  },
  setReviews(state,reviews) {
    reviews.forEach(review => state.sellerReview.push(review));
  },
  setServicesLoadingStatus(state,status) {
    state.loadingStatus = status
  },
  setServicesNextPage(state,nextPage) {
    state.servicesHasNextPage = nextPage
  },
  setReviewsNextPage(state,nextPage) {
    state.reviewsHasNextPage = nextPage
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

  async userServices({commit,state},action)
  {
    commit('setServicesLoadingStatus','LOADING');
    if(!state.userServices || page>=1) {
      if(action === ''){
        page = 1;
      }
      else if(action === 'next') {
        page++;
      }
      else{
          page--;
      }
      const res= await Api.get(`seller/services?page=${page}`);
      if(res.status===200) {
        commit("setUserServices",res.data);
        commit('setServicesNextPage',res.links.next ?? '');
        commit('setServicesLoadingStatus','COMPLETED');
      } else {
        console.log(res);
      }
    }
  },

  async userSingleService({commit, state, dispatch},payload)
  {
    var service = null;
    if(!state.userServices.length) {
      const res = await Api.get(`seller/services/${payload.id}`);
      if(res.status===200) {
        service = res.data;
      } else {
        console.log(res);
      }      
    } else {
      service = state.userServices.find(service => service.id === payload.id);
    }
    commit("setSingleService",service);
    if(payload.type==="ONUPDATE") {
      dispatch("loadSubCategories", service.category_id);
    }

  },
  async getSellerReviews({commit})
  {
    let getData = JSON.parse(localStorage.getItem("userInfo"))
    console.log("in action id",getData.id)
    const res= await Api.get(`seller/${getData.id}/reviews?page=${page}`);
    if(res.status === 200) {
      commit("setReviews",res.data);
      commit('setReviewsNextPage',res.links.next ?? '')
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
