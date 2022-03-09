import Api from '@/services/API';

export const state = {
    orders:[],
  }
export const getters = {
  myOrders : state => state.orders,
}

export const  mutations = {
    setOrders(state,order){
      state.orders=order;
    }
  }

export const  actions = {
  

    async myOrders({commit}){
        commit('setLoader',1);
        const res = await Api.get('buyer/orders');
        if(res.status === 200){
          console.log("All Orders Response",res.data)
          commit("setOrders",res.data);
          commit('setLoader',0);
        }
        else{
          console.log("Error All Orders");
        }
      },

      async showFilteredOrders({commit}, value){
        commit('setLoader',1);
        const res = await Api.get(`buyer/orders?status=${value}`);
        if(res.status === 200){
          console.log("Filtered Orders Response",res.data)
          commit("setOrders",res.data);
          commit('setLoader',0);
        }
        else{
          console.log("Error Filtered Orders");
        }
      },

      
}
