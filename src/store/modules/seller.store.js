import Api from '@/services/API';
import { ref } from 'vue';
import useToast from '@/composables/useToast.js'

var page = 1;

export const state = {
  sellerReview: [],
  userServices: [],
  s_Loader: '',
  userSingleService: {},
  createGigData: '',
  deleteService: '',
  loadingStatus: '',
  servicesHasNextPage: '',
  reviewsHasNextPage: '',
  error: null,
  buyerRequests: [],
}

export const getters = {
  getUserServices: state => state.userServices,
  getSellerLoader: state => state.s_Loader,
  getServiceLoader: state => state.loadingStatus,
  getSingleService: state => state.userSingleService,
  getUserServicesStatus: state => state.userServicesStatus,
  getSellerReview: state => state.sellerReview,
  servicesHasNextPage: state => state.servicesHasNextPage,
  getBuyerRequests: state => state.buyerRequests,
}


export const mutations = {

  setUserServices(state, services) {
    state.userServices = services;
  },
  setSingleService(state, service) {
    state.userSingleService = service;
  },
  setReviews(state, reviews) {
    reviews.forEach(review => state.sellerReview.push(review));
  },
  setServicesLoadingStatus(state, status) {
    state.loadingStatus = status
  },
  setServicesNextPage(state, nextPage) {
    state.servicesHasNextPage = nextPage
  },
  setReviewsNextPage(state, nextPage) {
    state.reviewsHasNextPage = nextPage
  },
  setError(state, error) {
    state.error = error;
  },
  setCreateGig(state, createGigD) {
    state.createGigData = createGigD;
  },
  setDeleteGig(state, deletGig) {
    state.deleteService = deletGig;
  },
  setBuyerRequests(state, request) {
    state.buyerRequests = request;
  },
  setSellerLoader(state, loaderVal) {
    state.s_Loader = loaderVal
  }
}

export const actions = {

  async userServices({ commit, state }, action) {
    commit('setSellerLoader', 1);
    commit('setServicesLoadingStatus', 'LOADING');
    if (!state.userServices || page >= 1) {
      if (action === '') {
        page = 1;
      }
      else if (action === 'next') {
        page++;
      }
      else {
        page--;
      }
      const res = await Api.get(`seller/services?page=${page}`);
      if (res.status === 200) {
        commit('setSellerLoader', 0);
        commit("setUserServices", res.data);
        commit('setServicesNextPage', res.links.next ?? '');
        commit('setServicesLoadingStatus', 'COMPLETED');
        console.log("User Services", res.data);
      } else {
        console.log(res);
      }
    }
  },

  async userSingleService({ commit, dispatch }, payload) {

    commit('setServicesLoadingStatus', 'LOADING');
    // if (!state.userServices.length) {
      const res = await Api.get(`seller/services/${payload.id}?from=web`);
      if (res.status === 200) {
        commit("setSingleService", res.data);
        if (payload.type === "ONUPDATE") {
          dispatch("loadSubCategories", res.data.category.id);
        }
      } else {
        console.log(res);
      }
    // } else {
    //   service = state.userServices.find(service => service.id === payload.id);
    // }
    commit('setServicesLoadingStatus', 'COMPLETED');
  },

  async getSellerReviews({ commit },payload) {
    //payload = state.userSingleService.service_user.id;
    console.log("reviews, in action id", payload.id);
    const res = await Api.get(`seller/${payload.id}/reviews?page=${page}`);
    if (res.status === 200) {
      commit("setReviews", res.data);
      commit('setReviewsNextPage', res.links.next ?? '')
      console.log("Seller Reviews", res.data);
    } else {
      console.log("Seller Reviews error");
    }
  },

  async deleteService({ commit, state }, serviceID) {
    console.log("Delete ID", serviceID)
    const res = await Api.delete(`seller/services/${serviceID}`)
    if (res.status === 200) {
      useToast(res.message, 'success');
      const tmpServices = ref(state.userServices.filter(service => service.id !== serviceID))
      commit("setUserServices", tmpServices.value)
    }
    else {
      useToast(res.message);
    }
  },

  async createService({ commit }, payload) {
    commit('setRegisterStatus', 2);
    const res = await Api.formData('seller/services', payload);
    if (res.status === 201) {
      useToast("Service has been Created", 'success');
      commit("setCreateGig", res)
      commit('setRegisterStatus', 3);
    }
    else {
      useToast(res.message);
      commit('setRegisterStatus', 4);
    }
  },

  async updateService({ commit }, updateServiceData) {
    commit('setRegisterStatus', 2);
    console.log("id", updateServiceData)
    const res = await Api.formData(`seller/services/${updateServiceData.id}`, updateServiceData);
    if (res.status === 200) {
      useToast("Service has been Updated Successfully", 'success');
      console.log
      commit('setRegisterStatus', 3);
    }
    else {
      useToast(res.message);
      commit('setRegisterStatus', 4);
    }
  },

  async showBuyerRequests({ commit }) {
    commit('setLoader', 1);
    let getData = JSON.parse(localStorage.getItem("userInfo"))
    console.log("in action id: ", getData.id)
    const res = await Api.get(`seller/buyer_requests`);
    if (res.status === 200) {
      commit("setBuyerRequests", res.data);
      console.log("Buyer Requests", res.data);
      commit('setLoader', 0);
    } else {
      console.log("Buyer Requests error");
    }
  },

  async addBuyerRequests({ commit }) {
    const res = await Api.get(`seller/buyer_requests`);
    if (res.status === 200) {
      commit("setBuyerRequests", res.data);
      console.log("Buyer Requests", res.data);
    } else {
      console.log("Buyer Requests error");
    }
  },

  async deleteBuyerJob({ commit, state }, id) {
    const res = await Api.delete(`seller/cancel_offer/${id}`);
    if (res.status === 200) {
      useToast(res.message, 'success');
      const afterRemoveJob = ref(state.buyerRequests.filter(job => job.id !== id))
      commit("setBuyerRequests", afterRemoveJob.value);
    }
    else {
      useToast(res.message);
    }
  },

  async sendOffer({ commit, dispatch }, payload) {
    commit('setRegisterStatus', 2);
    const resp = await Api.post('seller/send_offer', payload);
    if (resp.status == 200) {
      useToast(resp.message, 'success');
      commit('setRegisterStatus', 3);
      dispatch("addBuyerRequests")
    }
    else {
      commit('setRegisterStatus', 4);
      useToast(resp.message);
    }
  },

}
