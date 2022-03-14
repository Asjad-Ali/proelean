import Api from '@/services/API';
import { ref } from 'vue';
import useToast from '@/composables/useToast.js'

export const state = {
    createJob:[],
    allJobs:[],
    service:{},
    cardStripe:{},
    cardSection: false,
  }

export const getters = {
  getCreateJob : state => state.createJob,
  getAllJobs : state => state.allJobs,
  getService : state => state.service,
  getCardStripe : state => state.cardStripe,
  getCardSection : state => state.cardSection,
}

export const  mutations = {
    setCreateJob(state,job){
        state.createJob=job;
      },
    setAllJobs(state,job){
      state.allJobs=job;
    },
    setService(state,service){
      state.service=service;
    },
    setCardStripe(state,stripe){
      state.cardStripe=stripe;
    },
    setCardSection(state,value){
      state.cardSection=value;
    },
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
        }
        else{
          console.log("Error All Jobs");
        }
        commit('setLoader',0);
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

      async purchaseService({commit,state},payload){

        commit('setRegisterStatus', 2);
        const res = await Api.post('token',payload[0].paymentElements);
        if(res.status === 200){
          commit('setCardSection', true);
          console.log("Service token:",res.token);
          commit("setCardStripe",res.token);
          
          console.log("token",state.cardStripe)
          payload[1].descriptionData.token = state.cardStripe
          const resp = await Api.post('buyer/custom_order',payload[1].descriptionData);
          if(res.status === 200){
            commit("setService",resp.data);
            commit('setRegisterStatus', 3);
            useToast(resp.message,'success');
            window.location.href = "/chat";
          }
          else{
            useToast(resp.message);
            commit('setRegisterStatus', 4);
            console.log("Error Service");
          }
        }
        else{
          console.log("Error Stripe");
        }
      },
      
}
