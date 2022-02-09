import Api from '@/services/API';
import { createToaster } from '@meforma/vue-toaster';

export const state = {
    createJob:[],
    allJobs:[],
    deleteJob:[],
    allOrders:[]
  }

export const getters = {
  getCreateJob : state => state.createJob,
  getAllJobs : state => state.allJobs,
  getDeleteJob : state => state.deleteJob,
  getAllOrders : state => state.allOrders
}

export const  mutations = {
    setCreateJob(state,job){
        state.createJob=job;
      },
    setAllJobs(state,job){
      state.allJobs=job;
    },
    setDeleteJob(state,job){
      state.deleteJob=job;
    },
    setAllOrders(state,order){
      state.allOrders=order;
    }
  }

export const  actions = {
    
      async createAJob({commit},payload){
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

      async showAllJobs({commit}){
        const res = await Api.get('buyer/jobs');
        if(res.status === 200){
          console.log("All Jobs Response",res.data)
          commit("setAllJobs",res.data);
        }
        else{
          console.log("Error All Jobs");
        }
      },

      async deleteAJob({commit},id){
        const toaster = createToaster()
        const res = await Api.delete(`buyer/jobs/${id}`);
        if(res.status === 200){
          console.log("delete Job successfully",res.message)
          toaster.success(res.message,{
            position:"top-right",
            dismissible: true});
          commit("setDeleteJob",res.message);
        }
        else{
          console.log("Error delete Job");
          toaster.error(res.message,{
            position:"top-right",
            dismissible: true});
        }
      },

      async showAllOrders({commit}){
        const res = await Api.get('buyer/orders');
        if(res.status === 200){
          console.log("All Orders Response",res.data)
          commit("setAllOrders",res.data);
        }
        else{
          console.log("Error All Orders");
        }
      },

      async showFilteredOrders({commit}, value){
        const res = await Api.get(`buyer/orders?status=${value}`);
        if(res.status === 200){
          console.log("Filtered Orders Response",res.data)
          commit("setAllOrders",res.data);
        }
        else{
          console.log("Error Filtered Orders");
        }
      },

      
}
