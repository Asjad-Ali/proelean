import Api from '@/services/API'
// import { createToaster } from '@meforma/vue-toaster';


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
        this.commit('setError',error);
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

    async handleBecomeSeller(payload) {
      console.log("payload: "+ JSON.stringify(payload))
      // const res = await Api.post('become_freelancer',payload)
      // if(res.status === 200) {
      //   const toaster = createToaster()
      //   toaster.success(res.message,{
      //     position:"top-right",
      //     dismissible: true});
      // }
    },

    register(state,payload) {
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