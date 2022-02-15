<template>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="d-flex align-items-center mb-3 pb-3 border-bottom">
            <h2 class="mb-0 p-0">Services</h2>
            <router-link
              class="btn btn-sm btn-success ml-auto light"
              to="/seller/create_service"
            >
              Create New Service
            </router-link>
          </div>
        </div>
        </div>
        </div>
  <!-- <div class="main-page second py-5">

    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="d-flex align-items-center mb-3 pb-3 border-bottom">
            <h2 class="mb-0 p-0">Services</h2>
            <router-link
              class="btn btn-sm btn-success ml-auto light"
              to="/seller/create_service"
            >
              Create New Service
            </router-link>
          </div>

          <div
            class="
              tab-content
              osahan-table
              rounded
              px-3
            "
          >
            <div class="tab-pane active" id="active">
                <div v-if="loader" class="text-center loader vh-100">
                  <div class="spinner-border text-primary m-2" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
                <div v-else>
                  <div class="table-responsive box-table mt-3 bg-white">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>THUMBNAIL</th>
                          <th>SERVICE DESCRIPTION</th>
                          <th>DURATION</th>
                          <th>BUDGET</th>
                          <th>ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="service in $store.getters.getUserServices" :key="service.id">
                          <td>
                            <img style="height:120px; width:220px"  class="img-thumbnail" 
                              :src="(service.service_media.length && service.service_media[0].media) ? 
                              `https://api.dex.proelean.com/${service.service_media[0].media}` : 
                              `/assets/images/sample-gig.png`" />
                          </td>
                          <td>
                            <div >
                              <div class="row">
                                <div class="col col-12">
                                  <p class="order-proposal-title">
                                  {{ service.s_description }}
                                  </p>
                                </div>
                                <div class="col col-12">
                                  <p class="order-proposal-title">
                                  {{ service.description }}
                                  </p>
                                </div>
                              </div>
                                <div class="row">
                                <div class="col-lg-2 col-sm-4">
                                Ratings  {{ service.service_rating }}
                                </div>
                                <div class="col-lg-2 col-sm-4">
                                Clicks  {{ service.total_clicks }}
                                </div>
                                <div class="col-lg-2 col-sm-4">
                                Orders  {{ service.total_orders }}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td style="text-align: center;">{{ service.delivery_time }}</td>
                          <td >${{ service.price }}</td>
                          <td style="text-align: center;">
                            <button type="button"  class="btn btn-success mb-1 w-75" >
                              Edit
                            </button>                           
                            <button type="button" @click="getJobId(service.id)" class="btn btn-danger w-75" data-toggle="modal" data-target="#exampleModalCenter">
                              Delete
                            </button>

                            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                              <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                  <div class="modal-header d-flex justify-content-center">
                                    <h5 class="modal-title" id="exampleModalLongTitle">Delete Job</h5> 
                                  </div>
                                  <div class="modal-body text-center">
                                    Are you sure you want to delete the service?
                                  </div>
                                  <div class="modal-footer d-flex justify-content-center">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                                    <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deleteJob()">Yes</button>
                                  </div>
                                </div>
                              </div>
                            </div>

                          </td>
                        </tr>
                      </tbody>
                    </table>              
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
import { computed, onMounted, ref } from "@vue/runtime-core";
import store from "../../store";
export default {
  setup() {
    
    const jobId = ref('');
    const getJobId = (id) => {
      jobId.value = id
    };

    onMounted(() => {
      store.dispatch("userServices",'');
    });

    function deleteJob() {
      store.dispatch("deleteAJob", jobId.value);
      console.log("delete service id: ",jobId.value)
    }
    return {
      jobs: computed(() => store.getters.getAllJobs),
      loader: computed(() => store.getters.getLoaderVal),
      deleteJob,
      getJobId,
      jobId
    };
  },
};
</script>

<style scoped>
.loader{
  display: block;
}
.spinner-border{
  width: 4rem;
  height: 4rem;
}
</style>