import Api from '@/services/API';

export const state = {
  services: [],
  sellerOfferedServices: [],
  servicesStatus: null,
  error: null,
  pages: [],
  links:{},
  currentPage: 0,
  loadingStatus: ''
}

export const getters = {
  getServices: state => state.services,
  getSellerOfferedServices: state => state.sellerOfferedServices,
  getLoadingStatus: state => state.loadingStatus,
  getCurrentPage: state => state.currentPage,
  getPages: state => state.pages,
  getLinks: state => state.links,
}

export const mutations = {

  setServices(state, services) {
    state.services = services;
  },
  setError(state, error) {
    state.error = error;
  },
  setLinks(state, links) {
    state.links = links;
  },
  setPagination(state, pages) {
    state.pages = pages;
  },
  setCurrentPage(state,page) {
    state.currentPage = page;
  },
  setLoadingStatus(state, status) {
    state.loadingStatus = status;
  },
  setSellerOfferedServices(state, services) {
    state.sellerOfferedServices = services;
  },
  toggleGigsFavourite(state,serviceId){
      state.services.forEach(service => {
        if(service.id==serviceId){
          service.favourite = service.favourite == 1 ? 0 : 1;
        }
      });
  }
}

export const actions = {

  
  async searchServices({ commit, state }, search) {
    state.services = [];
    commit('setLoadingStatus', 'LOADING');
    const res = await Api.get(search);
    if (res.status === 200) {
      commit("setServices", res.data);
      commit('setCurrentPage', res.meta.current_page);
      commit('setLinks', res.links);
      commit('setPagination', res.meta);
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


}
