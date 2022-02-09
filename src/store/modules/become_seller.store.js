import Api from '@/services/API'
import { createToaster } from '@meforma/vue-toaster';
import router from '@/router';


export const state = {
    countries: [],
    languages: [],
    deliveryDays: [],
    submitLoader: false,
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
  getSubmitStatus: state => state.submitLoader,
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

    async getCountriesLanguage({ commit }) {
      const response = await Api.get('countries&categories');
      if(response.status === 200) {
        commit('setCountries',response.data.countries);
        commit('setLanguages',response.data.languages);
        commit('setDeliveryDays',response.data.delivery_days);
      }
    },

    async handleBecomeSeller({ commit, state }, payload) {
      console.log(payload)
      state.submitLoader = true;
      const res = await Api.formData('become_freelancer',payload);
      const toaster = createToaster();
      if(res.status === 201) {
        commit('setUserAsSeller');
        toaster.success(res.message,{
          position:"top-right",
          dismissible: true
        });
        router.go()
      } else {
        toaster.error(res.message,{
          position:"top-right",
          dismissible: true
        });
      }
      state.submitLoader = false;
    },
  }