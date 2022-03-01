import Api from '@/services/API';
import { ref } from 'vue';
import showToast from '@/composables/showToast.js'
import { createToaster } from '@meforma/vue-toaster';

var page = 1;


export const state = {
  sellerReview:[],
  userServices:[],
  wishlistServices:[],
  s_Loader:'',
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
  getSellerLoader : state => state.s_Loader,
  getSingleService : state => state.userSingleService,
  getUserServicesStatus : state => state.userServicesStatus,
  getSellerReview: state => state.sellerReview,
  servicesHasNextPage: state => state.servicesHasNextPage,
  getBuyerRequests: state => state.buyerRequests,
  getWishlist: state => state.wishlistServices,
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
  setSellerLoader(state,loaderVal){
    state.s_Loader = loaderVal
  },
  setWishlist(state,data){
    state.wishlistServices = data
  }
}

export const  actions = {

  async userServices({commit,state},action)
  {
    commit('setSellerLoader',1);
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
        commit('setSellerLoader',0);
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

  async createService({commit},payload){
    commit('setRegisterStatus',2);
    const toaster = createToaster()
    const res = await Api.formData('seller/services',payload);
    if(res.status === 201){
      toaster.success("Service has been Created",{
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

  async updateService({commit},updateServiceData){
    commit('setRegisterStatus',2);
    console.log("id",updateServiceData)
    const toaster = createToaster()
    const res = await Api.formData(`seller/services/${updateServiceData.id}`,updateServiceData);
    if(res.status === 200){
      toaster.success("Service has been Updated Successfully",{
        position:"top-right",
        dismissible: true});
        console.log
      commit('setRegisterStatus',3);
    }
    else{
      toaster.error(res.message,{
        position:"top-right",
        dismissible: true});
        commit('setRegisterStatus',4); 
    }
  },



  async wishlist({commit},payload){
    const resp = await Api.post('wishlist',payload)
    if(resp.status == 200 ){
      showToast(resp.message,'success');
        commit('toggleFavourite',payload.service_id);
      }
    else{
      showToast(resp.message);
    }
    
  },

  async showWishlist({commit}){
    const resp = await Api.get('get_wishlist')
    if(resp.status == 200){
      commit('setWishlist',resp.data)
      console.log("Wishlist Service",resp.data)
    }
    else{
      console.log(resp.message)
    }
  },

  async showBuyerRequests({commit})
  {
    commit('setLoader',1);
    let getData = JSON.parse(localStorage.getItem("userInfo"))
    console.log("in action id: ",getData.id)
      const res= await Api.get(`seller/buyer_requests`);
      if(res.status === 200) {
        commit("setBuyerRequests",res.data);
        console.log("Buyer Requests",res.data);
        commit('setLoader',0);
      } else {
        console.log("Buyer Requests error");
      }      
  },

  async addBuyerRequests({commit})
  {
    const res= await Api.get(`seller/buyer_requests`);
    if(res.status === 200) {
      commit("setBuyerRequests",res.data);
      console.log("Buyer Requests",res.data);
    } else {
      console.log("Buyer Requests error");
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

  async sendOffer({commit,dispatch},payload){
    commit('setRegisterStatus',2);
      const toaster = createToaster()
      const resp= await Api.post('seller/send_offer',payload);
      if(resp.status==200){
        toaster.success(resp.message,{
          position:"top-right",
          dismissible: true});
        commit('setRegisterStatus',3);
        dispatch("addBuyerRequests")
      }
      else
      {
        commit('setRegisterStatus',4);
        toaster.error(resp.message,{
          position:"top-right",
          dismissible: true});
      }
    },

}
