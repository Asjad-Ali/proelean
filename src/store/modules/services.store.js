import Api from '@/services/API';

export const state = {
  services: [],
  servicesStatus: null,
  error: null,
  page: 1,
  url: '',
  loadingStatus: ''
}

export const getters = {
  getServices: state => state.services,
  getLoadingStatus: state => state.loadingStatus,
  getCurrentPage: state => state.page,
}

export const mutations = {

  setServices(state, services) {
    state.services = services;
  },
  setError(state, error) {
    state.error = error;
  },
  setNextPage(state, page) {
    state.page = page;
  },
  setLoadingStatus(state, status) {
    state.loadingStatus = status;
  },
  setInitialUrl(state, url) {
    state.url = url;
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

      if (res.links && res.links.next) {
        commit('setNextPage', state.page + 1);
        commit('setInitialUrl', search);
      } else {
        commit('setNextPage', 1);
      }
      commit('setLoadingStatus', 'COMPLETED');
    }
  },

  async searchServicesByCategoryId({ commit }, categoryID) {
    console.log("in action id", categoryID)
    const res = await Api.get(`categories/${categoryID}/services`);
    if (res.status === 200) {
      commit("setServices", res.data);
      commit("setServicesStatus", true);
      console.log("services", res);
    } else {
      commit("setServicesStatus", false);
    }
  },
}
