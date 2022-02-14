import Api from '@/services/API';
import { createToaster } from '@meforma/vue-toaster';
var page = 1;


export const state = {
  sellerReview:[],
  userServices:'',
  userSingleService:{},
  createGigData:'',
  deleteGig:'',
  loadingStatus:'',
  servicesHasNextPage:'',
  reviewsHasNextPage:'',
  error: null,
  buyerRequests:[]
}

export const getters = {
  getUserServices : state => state.userServices,
  getSingleService : state => state.userSingleService,
  getUserServicesStatus : state => state.userServicesStatus,
  getSellerReview: state => state.sellerReview,
  servicesHasNextPage: state => state.servicesHasNextPage,
  getBuyerRequests: state => state.buyerRequests
}


export const  mutations = {

  setUserServices(state,services){
    state.userServices=services;
  },
  setSingleService(state,service){
    console.log(service)
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
  setRequests(state,request) {
    state.buyerRequests=request;
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

  async userSingleService({commit, state},id)
  {
    if(!state.userServices) {
      const res= await Api.get(`seller/services/${id}`);
      if(res.status===200) {
        commit("setSingleService",res.data);
        console.log(res.data)
      } else {
        console.log(res);
      }      
    } else {
      commit("setSingleService",state.userServices.find(service => service.id === id));
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

  async showBuyerRequests({commit})
  {
    let getData = JSON.parse(localStorage.getItem("userInfo"))
    console.log("in action id: ",getData.id)
    const res= await Api.get(`seller/buyer_requests`);
    if(res.status === 200) {
      commit("setRequests",res.data);
      console.log("Buyer Requests",res.data);
    } else {
      console.log("Buyer Requests error");
    }      
  },

}
