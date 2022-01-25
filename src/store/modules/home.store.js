import Api from '@/services/API'


export const state = {
    categories:[],
    featGigs:[],
    error: null,
  }



export const  mutations = {
    setCategories(state,categories){
      state.categories=categories;
    },
    setFeatGigs(state,featGigs){
      state.featGigs=featGigs;
    },
    setError(state,error){
      state.error=error;
    }
  }

export const  actions = {
    async getHomeList(context){
      const response = await Api.get('home');
      if(response.status===200){ 
        context.commit("setCategories",response.data.categories);
        context.commit("setFeatGigs",response.data.featGigs);
      } else{
        // set error here
      }
    },

}

export const getters = {
  getCategories: (state) => state.categories,
  getFeatGigs: (state) => state.featGigs
}