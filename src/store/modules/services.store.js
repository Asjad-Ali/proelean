import Api from '@/services/API'


export const state = {
    userServices:[],
    services: [],
    servicesStatus: null,
    error: null,
    categorySlug : null,
  }

export const getters = {
  getUserServices : state => state.userServices,
  getServices : state => state.services,
  getUserServicesStatus : state => state.userServicesStatus,
  getCategorySlug : state => state.categorySlug,
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

  }

export const  actions = {
    async searchServices({ commit},keywords)
    {
      const res= await Api.get('search?q='+keywords);
      console.log(res); 
      if(res.status===200){
        commit("setServicesStatus",true);
        commit("setServices",res.data);
      } else {
        commit("setServicesStatus",false);
      }
    },

    
      async userServices(context)
      {
        const res= await Api.get('seller/services');
        console.log(res);
        if(res.status===200){
          context.commit("setUserServices",res.data);
        } else {
          console.log(res);
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
