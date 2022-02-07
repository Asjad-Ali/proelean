import Api from '@/services/API';
import { createToaster } from '@meforma/vue-toaster';

export const state = {
    createJob:[],
    allJobs:[],
    deleteJob:[]
  }

export const getters = {
  getCreateJob : state => state.createJob,
  getAllJobs : state => state.allJobs,
  getDeleteJob : state => state.deleteJob
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
    }
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

      async allJobs({commit}){
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

      
}
