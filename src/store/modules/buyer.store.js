import Api from '@/services/API';
import { ref } from 'vue';
import useToast from '@/composables/useToast.js'

export const state = {
    createJob:[],
    allJobs:[],
    service:{},
    cardStripe:{},
    loader: null,
    cardSection: false,
    orderType:{}
  }

export const getters = {
  getCreateJob : state => state.createJob,
  getAllJobs : state => state.allJobs,
  getService : state => state.service,
  getCardStripe : state => state.cardStripe,
  getLoaderStatus : state => state.loader,
  getCardSection : state => state.cardSection,
  getOrderType : state => state.orderType
}

export const  mutations = {
    setCreateJob(state,job){
        state.createJob=job;
      },
    setAllJobs(state,job){
      state.allJobs=job;
    },
    setOrderType(state,order){
      state.orderType=order;
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

      async manageOrder({commit},payload){
        const res = await Api.post('buyer/manage_order',payload);
        if(res.status === 200){
          console.log("Type of Order:",res.data);
          commit("setOrderType",res.data);
        }
        else{
          console.log("Error Order Type");
        }
      },

      async ATM_CardDetail({commit},payload){

        const res = await Api.post('token',payload);
        if(res.status === 200){
          commit('setCardSection', true);
          console.log("Service token:",res.token);
          commit("setCardStripe",res.token);
        }
        else{
          console.log("Error Stripe");
        }
      },

      async purchaseService({commit,state},payload){
        console.log("token",state.cardStripe)
        payload.token = state.cardStripe
        const res = await Api.post('buyer/custom_order',payload);
        if(res.status === 201){
          commit("setService",res.data);
          useToast(res.message,'success');
        }
        else{
          useToast(res.message);
          console.log("Error Service");
        }
      },


      
}
