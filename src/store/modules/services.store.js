import Api from '@/services/API';

export const state = {
    services: [],
    servicesStatus: null,
    error: null,
    categorySlug : null,
    page: 1,
    url: '',
    loadingStatus: ''
  }

export const getters = {
  getServices : state => state.services,
  getCategorySlug : state => state.categorySlug,
  getLoadingStatus: state => state.loadingStatus,
  getCurrentPage: state => state.page,
}

export const  mutations = {

    setServices(state,services){
      state.services=services;
    },
    setError(state,error) {
      state.error=error;
    },
    setCategorySlug(state,slug) {
      state.categorySlug=slug;
    },
    setNextPage(state,page) {
      state.page = page;
    },
    setLoadingStatus(state,status) {
      state.loadingStatus=status;
    },
    setInitialUrl(state,url) {
      state.url = url;
    },
    
}

export const  actions = {

    async searchServices({ commit, state },search) {
      commit('setLoadingStatus','LOADING');
      const res= await Api.get(search);
      console.log(res.data); 
      if(res.status===200) {
        commit("setServices",res.data);

        if(res.links && res.links.next) {
          commit('setNextPage',state.page+1);
          commit('setInitialUrl',search);
        } else {
          commit('setNextPage',1);
        }
        commit('setLoadingStatus','COMPLETED');
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
