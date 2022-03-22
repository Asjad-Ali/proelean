import Api from '@/services/API';
import useToast from '@/composables/useToast.js'
import { ref } from 'vue';
//import { useRouter } from 'vue-router';

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

  async getOrderById({ commit }, id) {
    commit('setLoader', 1);
    const res = await Api.get(`get_order/${id}`);
    if (res.status === 200) {
      commit('setLoader', 0);
      return res;
    }
    return null;
  },

  async manageOrder({ commit, state, getters }, payload) {
    console.log("Order no:", payload.order_no);
    const res = await Api.post(payload.url, payload);
    //const router = useRouter();
    if (res.status === 200) {
      console.log("Type of Order:", res.status);
      const afterSetOrder = ref(state.orders.filter(order => order.orderNo !== payload.order_no))
      commit("setOrders", afterSetOrder.value);
      useToast(res.message, 'success');

      if (getters.isBuyerMode) {
        window.location.href = `/buyer/manage_order`
        //router.push({ name: "ManageOrder" });
      } else {
        window.location.href = `/dashboard/orders`
        //router.push({ name: "Orders" });
      }
    }
    else {
      useToast(res.message);
      console.log("Error Order Type");
    }
  },


}
