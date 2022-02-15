import  Api  from '@/services/API'

export const state = {
  categories:[],
  subcategories:[],
  error: null,
}

export const  mutations = {
  setCategories(state,categories) {
    state.categories=categories;
  },
  setSubCategories(state,subcategories) {
    state.subcategories = subcategories;
  },
  setSelectedSubCategories(state,subcategories) {
    state.selectedSubCategories = subcategories;
  },
  setError(state,error){
    state.error=error;
  }
}

export const getters = {
  getCategories: (state) => state.categories,
  getSubCategories: (state) => state.subcategories,
}

export const actions = {
  loadSubCategories: async ({ commit },categoryId) => {
    const response = await Api.get(`subcategories/${categoryId}`)
    if(response.status === 200) {
      commit('setSubCategories',response.data);
    }
  },
};