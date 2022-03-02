import Api from '@/services/API';
import { ref } from 'vue';
import useToast from '@/composables/useToast.js'


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
        commit('setRegisterStatus',2);
        const res = await Api.post('buyer/jobs',payload);
        if(res.status === 201){
          console.log("Create Job Response",res.data)
          useToast("Your request is submitted",'success');
          commit("setCreateJob",res)
          commit('setRegisterStatus',3);
        }
        else{
          useToast(res.message);
            commit('setRegisterStatus',4);
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
        const res = await Api.delete(`buyer/jobs/${id}`);
        if(res.status === 200){
          console.log("delete Job successfully",res.message)
          useToast(res.message,'success');
          const afterRemoveJob = ref(state.allJobs.filter(job => job.id !== id))
          commit("setAllJobs",afterRemoveJob.value);
        }
        else{
          console.log("Error delete Job");
          useToast(res.message);
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
