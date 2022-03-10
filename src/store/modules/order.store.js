import Api from '@/services/API';
import useToast from '@/composables/useToast.js'
import { ref } from 'vue';

export const state = {
  orders: [],
}
export const getters = {
  myOrders: state => state.orders,
}

export const mutations = {
  setOrders(state, order) {
    state.orders = order;
  },
}

export const actions = {

  async myOrders({ commit }, payload) {
    commit('setLoader', 1);
    const res = await Api.get(payload);
    if (res.status === 200) {
      console.log("All Orders Response", res.data)
      commit("setOrders", res.data);
      commit('setLoader', 0);
    }
    else {
      console.log("Error All Orders");
    }
  },

  async manageOrder({ commit, state }, payload) {
    console.log("Order no:", payload.order_no);
    const res = await Api.post(payload.url, payload);
    if (res.status === 200) {
      console.log("Type of Order:", res.status);
      const afterSetOrder = ref(state.orders.filter(order => order.orderNo !== payload.order_no))
      commit("setOrders", afterSetOrder.value);
      useToast(res.message, 'success');
    }
    else {
      useToast(res.message);
      console.log("Error Order Type");
    }
  },


}
