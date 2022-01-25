import Api from '@/services/API'


export const state = {
    error: null,
  }

export const  mutations = {
    setError(state,error){
      state.error=error;
    }
  }

export const  actions = {
    getCategories({commit},payload){
      return Api.get('categories',payload).then(
        resp=>{
        console.log(resp);
        commit('setAuthUser',resp.data);
        return Promise.resolve(resp);
      },
      error=>{
        this.commit('setError',error);
        return Promise.reject(error);
      });
    },

    register(state,payload){
        return Api.post('register',payload).then(
          resp=>{
          //   this.commit('LOGIN_SUCCESS');
            return Promise.resolve(resp);
        },
        error=>{
          // this.commit('LOGIN_FAILED');
          return Promise.reject(error);
        });
      }
  }