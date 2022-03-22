<template>
  <div class="main-page second py-3">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="d-flex align-items-center justify-content-between border-bottom">
            <div class="d-flex align-items-center">
              <h4 class="font-weight-bold">Jobs</h4>
            </div>
            <div class="d-flex align-items-center">
            <router-link
              class="btn btn-sm btn-success mr-2 light"
              to="/buyer/create_job"
            >
              Create a new job
            </router-link>
            <div>
              <select class="form-select form-control-sm" aria-label="Default select example"  @change="jobsFilter" id="selectedJob">
              <option :value="job.value" v-for="job in jobsSelectionType" :key="job.index">
                {{ job.name }}
              </option>
            </select>
          </div>
            </div>
          </div>

        </div>
      </div>

      <div class="tab-content osahan-table rounded d-sm-none">
        <div class="tab-pane active" id="active">
          <div v-if="loader" class="d-flex justify-content-center s-margin">
            <div class="spinner-border text-primary m-2" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <div
            v-for="job in jobs"
            :key="job.id"
            class="card d-md-none shadow-sm border-primary "
          >
            <div class="card-body">
              <div class="d-flex justify-content-between">
              <div>{{ job.created_at }}</div>
                <i
                  class="mdi mdi-close text-danger"
                  aria-hidden="true"
                  @click="getJobId(job.id)"
                  data-toggle="modal"
                  data-target="#exampleModalCenterSmall"
                >
                </i>
            </div>
              <h5 class="card-title bg-light">{{ job.description }}</h5>
              <span class="text-muted"> <i class="mdi mdi-clock"></i>  Duration: </span> <span> {{ job.delivery_time }}</span>
              <span class="text-muted ml-5"> <i class="mdi mdi-currency-eur"></i>  Budget: </span> <span> {{ job.budget }}</span>
              <div class="d-flex justify-content-end ">
                <button
                        type="button"
                        class="btn btn-primary mt-2"
                >
                  Total Offers: {{ job.total_offers }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!---------------------    Modal     --------------------->
      <div
        class="modal fade"
        id="exampleModalCenterSmall"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterSmall"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered"
          role="document"
        >
          <div class="modal-content">
            <div
              class="modal-header d-flex justify-content-center"
            >
              <h5 class="modal-title" id="exampleModalLongTitle">
                Delete Job
              </h5>
            </div>
            <div class="modal-body text-center">
              Are you sure you want to delete the job?
            </div>
            <div
              class="modal-footer d-flex justify-content-center"
            >
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                No
              </button>
              
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                @click="deleteJob()"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
      <!---------------------    Modal End     --------------------->

    </div>


    <div class="tab-content d-none d-sm-block osahan-table container rounded px-3">
      <div class="tab-pane active" id="active">
        <div v-if="loader" class="d-flex justify-content-center l-margin">
          <div class="spinner-border text-primary m-2" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <div v-else>
          <div
            v-if="jobs.length > 0"
            class="table-responsive box-table mt-3 bg-white"
          >
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th class="text-center">JOB DESCRIPTION</th>
                  <th class="text-center">POSTED DATE</th>
                  <th class="text-center">DURATION</th>
                  <th class="text-center">BUDGET</th>
                  <th class="text-center">OFFERS</th>
                  <th class="text-center">ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="job in jobs" :key="job.id">
                  <td>
                      <p class="order-proposal-title ml-2">
                        {{ job.description.substr(0,50) }}
                      </p>
                  </td>
                  <td class="text-center">{{ job.created_at }}</td>
                  <td class="text-center">{{ job.delivery_time }}</td>
                  <td class="text-center">${{ job.budget }}</td>
                  <td class="text-center">
                    <button class="btn btn-sm btn-primary">
                      {{ job.total_offers }}
                    </button>
                  </td>
                  <td class="text-center">
                    <!---------------------    Button trigger modal    -------------------->
                    <button
                      type="button"
                      @click="getJobId(job.id)"
                      class="btn btn-danger"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
            <div v-else class="container text-center py-5">
            <h2>No Any Job Available</h2>
          </div>
        </div>
      </div>
    </div>
        <!---------------------    Modal     --------------------->
    <div
      class="modal fade"
      id="exampleModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-centered"
        role="document"
      >
        <div class="modal-content">
          <div
            class="modal-header d-flex justify-content-center"
          >
            <h5 class="modal-title" id="exampleModalLongTitle">
              Delete Job
            </h5>
          </div>
          <div class="modal-body text-center">
            Are you sure you want to delete the job?
          </div>
          <div
            class="modal-footer d-flex justify-content-center"
          >
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              No
            </button>
            <button
              type="button"
              class="btn btn-danger"
              data-dismiss="modal"
              @click="deleteJob()"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
    <!---------------------    Modal End     --------------------->

  </div>
</template>


<script>
import { onMounted, computed, ref } from "@vue/runtime-core";
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore()
    onMounted(store.dispatch("showAllJobs",'all'));

    const jobsSelectionType =  [ 
      { value: 0, name:"All" },
      { value: 1, name:"Active" },
      { value: 2, name:"Pending" },
    ]

    function jobsFilter() {
      let value = document.getElementById("selectedJob").value;
      if(value == 0){
        store.dispatch(store.dispatch("showAllJobs",'all'))
      }else if(value == 1){
        store.dispatch("showAllJobs",'active')
      }else{
        store.dispatch("showAllJobs",'pending')
      }
    }

    const jobId = ref("");
    const getJobId = (id) => {
      jobId.value = id;
      console.log(jobId.value)
    };

    function deleteJob() {
      store.dispatch("deleteAJob", jobId.value);
      console.log("delete job id: ", jobId.value);
    }
    return {
      jobs: computed(() => store.getters.getAllJobs),
      loader: computed(() => store.getters.getLoaderVal),
      deleteJob,
      getJobId,
      jobId,
      jobsSelectionType,
      jobsFilter
    };
  },
};
</script>


<style scoped>
.loader {
  display: block;
}
.spinner-border {
  width: 4rem;
  height: 4rem;
}
.l-margin{
  margin-bottom: 10rem;
  margin-top: 8rem ;
}
.s-margin{
  margin-bottom: 8rem;
  margin-top: 5rem ;
}

</style>