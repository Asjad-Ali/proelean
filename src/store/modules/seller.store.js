import Api from '@/services/API';
import { ref } from 'vue';
import useToast from '@/composables/useToast.js'

var page = 1;

export const state = {
  sellerReviews: [],
  serviceReviews: [],
  userServices: [],
  s_Loader: '',
  userSingleService: [],
  createGigData: '',
  deleteService: '',
  loadingStatus: '',
  servicesHasNextPage: '',
  reviewsHasNextPage: '',
  error: null,
  buyerRequests: [],
  buyerRequestsCurrentPage: 1,
  hasNextPage: false,
  earnings: {}
}

export const getters = {
  getUserServices: state => state.userServices,
  getSellerLoader: state => state.s_Loader,
  getServiceLoader: state => state.loadingStatus,
  getSingleService: state => state.userSingleService,
  getUserServicesStatus: state => state.userServicesStatus,
  getSellerReviews: state => state.sellerReviews,
  getServiceReviews: state => state.serviceReviews,
  servicesHasNextPage: state => state.servicesHasNextPage,
  getBuyerRequests: state => state.buyerRequests,
  getBuyerRequestsCurrentPage: state => state.buyerRequestsCurrentPage,
  isBuyerRequestHasNextPage: state => state.hasNextPage,
  getSellerEarning: state => state.earnings
}


export const mutations = {

  setUserServices(state, services) {
    state.userServices = services;
  },
  setSingleService(state, service) {
    state.userSingleService = service;
  },
  setSellerReviews(state, reviews) {
    state.sellerReviews = reviews;
    //reviews.forEach(review => state.sellerReviews.push(review))
  },
  setServiceReviews(state, reviews) {
    state.serviceReviews = reviews;
    //reviews.forEach(review => state.serviceReviews.push(review))
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
  setBuyerRequests(state, requests) {
    state.buyerRequests = requests;
  },
  setSellerLoader(state, loaderVal) {
    state.s_Loader = loaderVal
  },
  setBuyerRequestPageNo(state, page) {
    state.buyerRequestsCurrentPage = page;
  },
  buyerRequestHasNextPage(state, status) {
    state.hasNextPage = status;
  },
  toggleOfferedService(state, serviceId) {
    console.log("in offerd service", serviceId)
    state.userSingleService.offered_services.forEach(service => {
      if (service.id == serviceId) {
        service.favourite = service.favourite == 1 ? 0 : 1;
      }
    });
  },

  setEarnings(state, earnings) {
    state.earnings = earnings
  },
}

export const actions = {

  async userServices({ commit, state }, action) {
    commit('setSellerLoader', 1);
    commit('setLoadingStatus', 'LOADING');
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
    commit('setLoadingStatus', 'COMPLETED');
  },

  async userSingleService({ commit, dispatch }, payload) {
    commit('setServicesLoadingStatus', 'LOADING');
    // if (!state.userSingleService || state.userSingleService.id !== payload.id) {
      const res = await Api.get(`seller/services/${payload.id}?from=web`);
      if (res.status === 200) {
        commit("setSingleService", res.data);
        if (payload.type === "ONUPDATE") {
          dispatch("loadSubCategories", res.data.category.id);
        }
      } else {
        console.log(res);
      }
    // }
    commit('setServicesLoadingStatus', 'COMPLETED');
  },


  async getReviews({ commit }, payload) {
    console.log("reviews, in action id", payload);
    const res = await Api.get(`${payload.type}/${payload.id}/reviews?page=${page}`);
    if (res.status === 200) {
      payload.type === 'seller'
        ? commit("setSellerReviews", res.data)
        : commit("setServiceReviews", res.data);

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
    return res;
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

  async showBuyerRequests({ commit },jobStatus) {

    // let currentPage = getters.getBuyerRequestsCurrentPage;
    // if(jobStatus) {
    //   currentPage = 1;
    // }

    commit('setLoader', 1);
    const res = await Api.get(`seller/buyer_requests?status=${jobStatus}`);
    if (res.status === 200) {
      commit("setBuyerRequests", res.data);
      if (res.links.next) {
        commit('buyerRequestHasNextPage', true);
        commit('setBuyerRequestPageNo', res.meta.current_page + 1);
      } else {
        commit('buyerRequestHasNextPage', false);
      }

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
    commit('setRegisterStatus', id);
    const res = await Api.delete(`seller/cancel_offer/${id}`);
    if (res.status === 200) {
      useToast(res.message, 'success');
      const afterRemoveJob = ref(state.buyerRequests.filter(job => job.id !== id))
      commit("setBuyerRequests", afterRemoveJob.value);
      commit('setRegisterStatus', 3);
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

  async getEarnings({ commit, state }) {
    if(!state.earnings.length) {
      const res = await Api.get(`seller/getEarnings`);
      console.log(res)
      if (res.status === 200) {
        commit("setEarnings", res);
      } else {
        console.log("get Earnings error");
      }
    }
  },

}
