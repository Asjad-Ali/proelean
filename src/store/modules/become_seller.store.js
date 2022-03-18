import Api from '@/services/API'
import useToast from '@/composables/useToast.js'
import router from '@/router';


export const state = {
    countries: [],
    languages: [],
    deliveryDays: [],
    error: null,
  }

export const  mutations = {
  setCountries(state,countries) {
    state.countries = countries;
  },
  setLanguages(state,languages) {
    state.languages = languages;
  },
  setDeliveryDays(state,deliveryDays) {
    state.deliveryDays = deliveryDays;
  },
  setError(state,error){
    state.error=error;
  }
}

export const getters = {
  getCountries: state => state.countries,
  getLanguages: state => state.languages,
  getDeliveryDays: state => state.deliveryDays,
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
        commit('setError',error);
        return Promise.reject(error);
      });
    },

    async getCountriesLanguage({ commit, state }) {
      if(!state.deliveryDays.length){
        const response = await Api.get('countries&categories');
        if(response.status === 200) {
          commit('setCountries',response.data.countries);
          commit('setLanguages',response.data.languages);
          commit('setDeliveryDays',response.data.delivery_days);
        }
      }
    },

    async handleBecomeSeller({ commit }, payload) {
      commit('setRegisterStatus', 2);
      console.log(payload)
      const res = await Api.formData('become_freelancer',payload);
      if(res.status === 201) {
        commit('setUserAsSeller');
        useToast(res.message,'success');
        commit('setRegisterStatus', 3);
        router.go()
      } else {
        useToast(res.message);
      }

    },
  }