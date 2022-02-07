import Api from '@/services/API';
import { createToaster } from '@meforma/vue-toaster';

export const state = {
    buyerCreateJob:[],
  }

export const getters = {
  getBuyerCreateJob : state => state.buyerCreateJob
}

export const  mutations = {
    setCreateJob(state,job){
        state.buyerCreateJob=job;
      },
  }

export const  actions = {
    
      async createJob({commit},payload){
        const toaster = createToaster()
        const res = await Api.post('buyer/jobs',payload);
        if(res.status === 201){
          console.log("Create Job Response",res.data)
          toaster.success("Your request is submitted",{
            position:"top-right",
            dismissible: true});
          commit("setCreateJob",res)
        }
        else{
          toaster.error(res.message,{
            position:"top-right",
            dismissible: true});
        }
      },

      
}
