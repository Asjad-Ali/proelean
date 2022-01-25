import Api from '@/services/API'


export const state = {
    userServices:[],
    userServicesStatus: null,
    error: null,
    categorySlug : null,
  }

export const getters = {
  getUserServices : state => state.userServices,
  getUserServicesStatus : state => state.userServicesStatus,
  getCategorySlug : state => state.categorySlug,
}

export const  mutations = {
    setUserServices(state,services){
      state.userServices=services;
    },
    setError(state,error){
      state.error=error;
    },
    setCategorySlug(state,slug){
      state.categorySlug=slug;
    },
    
    setUserServicesStatus(state,status){
      state.userServicesStatus=status;
    },

  }

export const  actions = {
    async searchUserServices(context,keywords)
    {
      const res= await Api.get('search?q='+keywords);
      console.log(res);
      if(res.status===200){
        context.commit("setUserServices",res.data);
      } else {
        // set error here
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

    async searchUserServicesByCategoryId({commit},categoryID)
    {
      console.log("in action id",categoryID)
      const res= await Api.get(`categories/${categoryID}/services?category=${categoryID}`);
      if(res.status ===200){
        commit("setUserServices",res.data);
        commit("setUserServicesStatus",true);
        console.log("services",res);
      } else {
        commit("setUserServicesStatus",false);
      }
    },
}
