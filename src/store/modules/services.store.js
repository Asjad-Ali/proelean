import Api from '@/services/API';

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

  async getSellerServices({ commit }, sellerID)
  {
    const res = await Api.get(`seller/services?seller=${sellerID}`);
    if(res.status === 200) {
      commit("setUserOtherServices",res.data)
    }
  },


}
