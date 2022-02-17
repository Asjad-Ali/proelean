import Api from '@/services/API';
import { createToaster } from '@meforma/vue-toaster';
import { ref } from 'vue';
var page = 1;


export const state = {
  sellerReview:[],
  userServices:[],
  userSingleService:{},
  createGigData:'',
  deleteService:'',
  loadingStatus:'',
  servicesHasNextPage:'',
  reviewsHasNextPage:'',
  error: null,
  buyerRequests:[],
}

export const getters = {
  getUserServices : state => state.userServices,
  getSingleService : state => state.userSingleService,
  getUserServicesStatus : state => state.userServicesStatus,
  getSellerReview: state => state.sellerReview,
  servicesHasNextPage: state => state.servicesHasNextPage,
  getBuyerRequests: state => state.buyerRequests,
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
    state.deleteService=deletGig;
  },
  setBuyerRequests(state,request) {
    state.buyerRequests=request;
  },
}

export const  actions = {

  async userServices({commit,state},action)
  {
    commit('setLoader',1);
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
        commit('setLoader',0);
        commit("setUserServices",res.data);
        commit('setServicesNextPage',res.links.next ?? '');
        commit('setServicesLoadingStatus','COMPLETED');
        console.log("User Services",res.data);
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
      dispatch("loadSubCategories", service.category.id);

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

  async deleteService({commit, state},serviceID){
    const toaster = createToaster()
    console.log("Delete ID",serviceID)
    const res = await Api.delete(`seller/services/${serviceID}`)
    if(res.status === 200){  
      toaster.success(res.message,{
        position:"top-right",
        dismissible: true
      });
      const tmpServices = ref(state.userServices.filter(service => service.id !== serviceID))
      commit("setUserServices",tmpServices.value)
    } 
    else{
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

  async showBuyerRequests({commit,state})
  {
    commit('setLoader',1);
    let getData = JSON.parse(localStorage.getItem("userInfo"))
    console.log("in action id: ",getData.id)
    if(!state.buyerRequests.length){
      console.log("Buyer Requests State is null");
      const res= await Api.get(`seller/buyer_requests`);
      if(res.status === 200) {
        commit("setBuyerRequests",res.data);
        console.log("Buyer Requests",res.data);
        commit('setLoader',0);
      } else {
        console.log("Buyer Requests error");
      }      
    }
    else{
      commit("setBuyerRequests",state.buyerRequests);
    }
  },

  async deleteBuyerJob({commit,state},id){
    const toaster = createToaster()
    const res = await Api.delete(`seller/cancel_offer/${id}`);
    if(res.status === 200){
      console.log("delete Buyer Job successfully",res.message)
      toaster.success(res.message,{
        position:"top-right",
        dismissible: true});
      const afterRemoveJob = ref(state.buyerRequests.filter(job => job.id !== id))
      commit("setBuyerRequests",afterRemoveJob.value);
    }
    else{
      console.log("Error delete Job");
      toaster.error(res.message,{
        position:"top-right",
        dismissible: true});
    }
  },

  async sendOffer({commit},payload){
    commit('setRegisterStatus',2);
      const toaster = createToaster()
      const resp= await Api.post('seller/send_offer',payload);
      if(resp.status==200){
        console.log("In success")
        toaster.success(resp.message,{
          position:"top-right",
          dismissible: true});
        commit('setRegisterStatus',3);
      }
      else
      {
        console.log("In fail")
        commit('setRegisterStatus',4);
        toaster.error(resp.message,{
          position:"top-right",
          dismissible: true});
      }
    },

}
