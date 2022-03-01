import Api from '@/services/API';

export const state = {
  services: [],
  servicesStatus: null,
  error: null,
  page: 1,
  currentPage:0,
  lastPage:0,
  preUrl: '',
  loadingStatus: ''
}

export const getters = {
  getServices: state => state.services,
  getLoadingStatus: state => state.loadingStatus,
  getCurrentPage: state => state.currentPage,
  getNextPage: state => state.page,
  getLastPage: state => state.lastPage,
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
  setCurrentPage(state) {
    state.currentPage++;
  },
  setLastPage(state, status) {
    state.lastPage = status
  },
  setPreUrl(state, url) {
    state.preUrl = url;
  },
  setLoadingStatus(state, status) {
    state.loadingStatus = status;
  }

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
      } else {
        commit('setLastPage', 1);
      }
      commit('setCurrentPage');
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

  setPage({commit},page) {
    commit('setNextPage',page)
  }
}