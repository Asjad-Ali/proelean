import Api from '@/services/API';
import useToast from '@/composables/useToast.js'
import { ref } from 'vue';
//import { useRouter } from 'vue-router';

export const state = {
  orders: [],
  timeline: []
}
export const getters = {
  getMyOrders: state => state.orders,
  getTimeline: state => state.timeline,
}

export const mutations = {
  setOrders(state, order) {
    state.orders = order;
  },
  setTimeline(state, timeline) {
    state.timeline = timeline;
  },
}

export const actions = {

  async myOrders({ commit }, payload) {
    commit('setLoader', 1);
      const res = await Api.get(payload);
      if (res.status === 200) {
        console.log("All Orders Response", res.data)
        commit("setOrders", res.data);

      }
      else {
        console.log("Error All Orders");
      }
    commit('setLoader', 0);
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


  async dateExtendOfOrder({ commit, state }, payload) {
    console.log("Order id:", payload.order_id);
    const res = await Api.post(`seller/extend_order`, payload);
    if (res.status === 201) {
      console.log("Type of Order:", res.status);
      const afterSetOrder = ref(state.orders.filter(order => order.id !== payload.order_id))
      commit("setOrders", afterSetOrder.value);
      useToast(res.message, 'success');
      window.location.href = `/dashboard/orders`
    }
    else {
      useToast(res.message);
      console.log("Error Order extend date");
    }
  },


  async extendOrderRequest({ commit, state }, payload) {
    console.log("Order id:", payload.order_id);
    const res = await Api.post(`buyer/extend_order_request`, payload);
    if (res.status === 200) {
      console.log("Type of Order:", res.status);
      const afterSetOrder = ref(state.orders.filter(order => order.id !== payload.order_id))
      commit("setOrders", afterSetOrder.value);
      useToast(res.message, 'success');
      window.location.href = `/buyer/manage_order`
    }
    else {
      useToast(res.message);
      console.log("Error Order Type");
    }
  },

  async timeline({ commit }, orderNo) {
    commit('setLoader', 1);
    const res = await Api.get(`order/${orderNo}/activity`);
    if (res.status === 200) {
      commit('setLoader', 0);
      commit('setTimeline',res.data);
      return res;
    }
    // return null;
  },


}
