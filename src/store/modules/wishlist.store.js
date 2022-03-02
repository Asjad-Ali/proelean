import Api from '@/services/API'
import useToast from '@/composables/useToast.js'

export const state = {
  wishlistServices: [],
  error: null,
}

export const getters = {
  getWishlist: state => state.wishlistServices,
}

export const mutations = {
  setWishlist(state, data) {
    state.wishlistServices = data
  },
  setError(state, error) {
    state.error = error;
  }
}

export const actions = {
  async wishlist({ commit }, payload) {
    const resp = await Api.post('wishlist', payload)
    if (resp.status == 200) {
      useToast(resp.message, 'success');
      commit('toggleFavourite', payload.service_id);
    }
    else {
      useToast(resp.message);
    }

  },

  async showWishlist({ commit }) {
    const resp = await Api.get('get_wishlist')
    if (resp.status == 200) {
      commit('setWishlist', resp.data)
      console.log("Wishlist Service", resp.data)
    }
    else {
      console.log(resp.message)
    }
  },

}