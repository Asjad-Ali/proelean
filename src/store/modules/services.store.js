import Api from '@/services/API';
import useToast from '@/composables/useToast.js'

export const state = {
  services: [],
  servicesStatus: null,
  error: null,
  hasNextpage: false,
  currentPage: 0,
  loadingStatus: ''
}

export const getters = {
  getServices: state => state.services,
  getLoadingStatus: state => state.loadingStatus,
  getCurrentPage: state => state.currentPage,
  getNextPage: state => state.hasNextpage,
}

export const mutations = {

  setServices(state, services) {
    state.services = services;
  },
  setError(state, error) {
    state.error = error;
  },
  setNextPage(state, hasNextpage) {
    state.hasNextpage = hasNextpage;
  },
  setCurrentPage(state,page) {
    state.currentPage = page;
  },
  setLoadingStatus(state, status) {
    state.loadingStatus = status;
  },
  toggleFavourite(state,serviceId){
    state.services.forEach(service => {
      if(service.id==serviceId){
        service.favourite = service.favourite == 1 ? 0 : 1;
      }
    });
  },
}

export const actions = {

  async searchServices({ commit, state }, search) {
    state.services = [];
    commit('setLoadingStatus', 'LOADING');
    const res = await Api.get(search);
    if (res.status === 200) {
      commit("setServices", res.data);
      commit('setCurrentPage', res.meta.current_page ?? state.currentPage);
      commit('setNextPage', res.links.next ? true : false);
    }
    commit('setLoadingStatus', 'COMPLETED');
  },

  async searchServicesByCategoryId({ commit }, categoryID) {
    console.log("in action id", categoryID)
    const res = await Api.get(`categories/${categoryID}/services`);
    if (res.status === 200) {
      commit("setServices", res.data);
      commit("setServicesStatus", true);
    } else {
      commit("setServicesStatus", false);
    }
  },

  async wishlist({commit},payload){
    const resp = await Api.post('wishlist',payload)
    if(resp.status == 200 ){
      useToast(resp.message,'success');
        commit('toggleFavourite',payload.service_id);
      }
    else{
      useToast(resp.message);
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
}
