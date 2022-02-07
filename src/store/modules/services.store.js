import Api from '@/services/API';
import { createToaster } from '@meforma/vue-toaster';
var page = 1;

export const state = {
    userServices:[],
    services: [],
    servicesStatus: null,
    error: null,
    categorySlug : null,
    sellerReview:[],
    userNotifications:{},
    createGigData:''
  }

export const getters = {
  getUserNotifications : state => state.userNotifications,
  getUserServices : state => state.userServices,
  getServices : state => state.services,
  getUserServicesStatus : state => state.userServicesStatus,
  getCategorySlug : state => state.categorySlug,
  getSellerReview: state => state.sellerReview,
}

export const  mutations = {
    setUserServices(state,services){
      state.userServices=services;
    },
    setServices(state,services){
      state.services=services;
    },
    setError(state,error){
      state.error=error;
    },
    setCategorySlug(state,slug){
      state.categorySlug=slug;
    },
    
    setServicesStatus(state,status){
      state.servicesStatus=status;
    },
    setReviews(state,reviews){
      state.sellerReview = [...state.sellerReview,...reviews];
    },
    setNotification(state,notification){
      state.userNotifications=notification;
    },
    setCreateGig(state,createGigD){
      state.createGigData=createGigD;
    },
  }

export const  actions = {
    async searchServices({ commit},keywords)
    {
      const res= await Api.get('search?q='+keywords);
      console.log(res.data); 
      if(res.status===200){
        commit("setServicesStatus",true);
        commit("setServices",res.data);
      } else {
        commit("setServicesStatus",false);
      }
    },

    
      async userServices({ commit})
      {
        const res= await Api.get('seller/services');
        console.log("user Services");
        console.log(res);
        if(res.status===200){
          commit("setUserServices",res.data);
        } else {
          console.log(res);
        }
      },

      async getNotification({commit}){
        const res = await Api.get('notification');
        if(res.status === 200){
          commit("setNotification",res.notifications)
        }
        else{
          commit("setNotification",res.message)
        }
      },

      async createGig({commit},payload){
        commit('setRegisterStatus',2);
        const toaster = createToaster()
        const res = await Api.formData('seller/services',payload);
        if(res.status === 200){
          console.log("Create Gig Response",res)
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

    async searchServicesByCategoryId({commit},categoryID)
    {
      console.log("in action id",categoryID)
      const res= await Api.get(`categories/${categoryID}/services?category=${categoryID}`);
      if(res.status ===200){
        commit("setServices",res.data);
        commit("setServicesStatus",true);
        console.log("services",res);
      } else {
        commit("setServicesStatus",false);
      }
    },
}
