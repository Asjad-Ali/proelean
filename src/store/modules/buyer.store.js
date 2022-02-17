import Api from '@/services/API';
import { createToaster } from '@meforma/vue-toaster';
import { ref } from 'vue';


export const state = {
    createJob:[],
    allJobs:[],
    allOrders:[],
    loader: null
  }

export const getters = {
  getCreateJob : state => state.createJob,
  getAllJobs : state => state.allJobs,
  getAllOrders : state => state.allOrders,
  getLoaderVal : state => state.loader
}

export const  mutations = {
    setCreateJob(state,job){
        state.createJob=job;
      },
    setAllJobs(state,job){
      state.allJobs=job;
    },
    setAllOrders(state,order){
      state.allOrders=order;
    },
    setLoader(state,loader){
      state.loader=loader;
      console.log("loader",state.loader)
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
        commit('setLoader',1);
        const res = await Api.get('buyer/jobs');
        if(res.status === 200){
          console.log("All Jobs Response",res.data)
          commit("setAllJobs",res.data);
          commit('setLoader',0);
        }
        else{
          console.log("Error All Jobs");
        }
      },

      async deleteAJob({commit,state},id){
        const toaster = createToaster()
        const res = await Api.delete(`buyer/jobs/${id}`);
        if(res.status === 200){
          console.log("delete Job successfully",res.message)
          toaster.success(res.message,{
            position:"top-right",
            dismissible: true});
          const afterRemoveJob = ref(state.allJobs.filter(job => job.id !== id))
          commit("setAllJobs",afterRemoveJob.value);
        }
        else{
          console.log("Error delete Job");
          toaster.error(res.message,{
            position:"top-right",
            dismissible: true});
        }
      },

      async showAllOrders({commit}){
        commit('setLoader',1);
        const res = await Api.get('buyer/orders');
        if(res.status === 200){
          console.log("All Orders Response",res.data)
          commit("setAllOrders",res.data);
          commit('setLoader',0);
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
