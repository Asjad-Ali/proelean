
export const state = {
  categories:[],
  error: null,
}

export const  mutations = {
  setCategories(state,categories){
    state.categories=categories;
  },
  setError(state,error){
    state.error=error;
  }
}

export const getters = {
  getCategories: (state) => state.categories,
}

// export const actions = {
//   loadCategories: async ({ commit }) => {
//     const response = await 
//   },
// };