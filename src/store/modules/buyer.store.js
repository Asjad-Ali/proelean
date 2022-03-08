import Api from '@/services/API';
import { ref } from 'vue';
import useToast from '@/composables/useToast.js'
//import { loadStripe } from '@stripe/stripe-js'

export const state = {
    createJob:[],
    allJobs:[],
    allOrders:[],
    service:{},
    loader: null
  }

export const getters = {
  getCreateJob : state => state.createJob,
  getAllJobs : state => state.allJobs,
  getService : state => state.service,
  getLoaderVal : state => state.loader,
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
    setService(state,service){
      state.service=service;
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

      async purchaseService({commit},payload){

        const res = await Api.post('token',payload);
        if(res.status === 200){
          console.log("Service",res.data)
          console.log("Service token:",res.token)
          // const token = res.token;
          commit("setService",res.data);
          useToast('You purchased the service','success');
        }
        else{
          useToast(res.message);
          console.log("Error Service");
        }
      },

      
}
