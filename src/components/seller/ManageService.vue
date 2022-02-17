<template>
  <div class="main-page second py-5">
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

        <div class="tab-pane d-md-none active" id="active">
          <div v-if="loader" class="text-center loader">
            <div class="spinner-border  text-primary m-2" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        <div v-for="service in services" :key="service.id"
        class="card d-md-none shadow-sm border-primary  p-2">
          <div class="container">
            <div class="text-center">
              <img
                :src="
                  service.service_media.length &&
                  service.service_media[0].media
                    ? `https://api.dex.proelean.com/${service.service_media[0].media}`
                    : `/assets/images/sample-gig.png`"
                class="img-fluid rounded-start mb-2"
                alt="..."
              />
            </div>
            <div class="row ">
                <div class="col-12">
                  <h5 class="card-title">{{service.s_description}}</h5>
                </div>
                <div class="col-12">
                  <p class="card-text">
                  {{service.description}}
                </p>
                </div>
            </div>
            <div class="row my-2">
                  <div class="col-3">
                    <strong class="text-muted">Rating: {{service.service_rating}}</strong>
                  </div>
                  <div class="col-3">
                    <strong class="text-muted">Clicks: {{service.total_clicks}}</strong>
                  </div>
                  <div class="col-3">
                    <strong class="text-muted">Orders: {{service.total_orders}}</strong>
                  </div>
              </div>
            <div class="row">
              <div class="col-8">
                <strong>Price $100</strong>
              </div>
              <div class="col-2">
                  <router-link class="dropdown-item" :to="{name:'UpdateService', params:{id:service.id}}">
                  <i
                    class="fa fa-pencil-square-o mb-2 cursor-pointer"
                    style="font-size: 15px"
                    aria-hidden="true"
                  >
                  </i>
                  </router-link>
              </div>
              <div class="col-2">
                  <i
                    aria-hidden="true"
                    style="font-size: 17px"
                    @click.prevent="getServiceId(service.id)"
                    class="fa fa-trash cursor-pointer text-danger mt-1"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                  >
                  </i>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>




      <div v-if="services" class="tab-content d-none d-md-block osahan-table container rounded px-3">
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
                  <tr
                    v-for="service in services"
                    :key="service.id"
                  >
                    <td>
                      <img
                        style="height: 120px; width: 220px"
                        class="img-thumbnail"
                        :src="
                          service.service_media.length &&
                          service.service_media[0].media
                            ? `https://api.dex.proelean.com/${service.service_media[0].media}`
                            : `/assets/images/sample-gig.png`"
                      />
                    </td>
                    <td class="ps-1">
                      <div>
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
                            Ratings {{ service.service_rating }}
                          </div>
                          <div class="col-lg-2 col-sm-4">
                            Clicks {{ service.total_clicks }}
                          </div>
                          <div class="col-lg-2 col-sm-4">
                            Orders {{ service.total_orders }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style="text-align: center">
                      {{ service.delivery_time }}
                    </td>
                    <td style="text-align: center">${{ service.price }}</td>
                    <td style="text-align: center">
                      <div>
                        <router-link class="dropdown-item" :to="{name:'UpdateService', params:{id:service.id}}">
                        <i
                          class="fa fa-pencil-square-o mb-2 cursor-pointer"
                          style="font-size: 15px"
                          aria-hidden="true"
                        >
                        </i>
                        </router-link>
                      </div>
                      <div>
                        <i
                          aria-hidden="true"
                          style="font-size: 17px"
                          @click.prevent="getServiceId(service.id)"
                          class="fa fa-trash cursor-pointer text-danger"
                          data-toggle="modal"
                          data-target="#exampleModalCenter"
                        >
                        </i>
                      </div>

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
                              <h5
                                class="modal-title"
                                id="exampleModalLongTitle"
                              >
                                Delete Service
                              </h5>
                            </div>
                            <div class="modal-body text-center">
                              Are you sure you want to delete the service?
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
                                @click="deleteService()"
                              >
                                Yes
                              </button>
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

        <div v-if="!services" class="container text-center py-5">
        <h2>No Any Service Available</h2>
      </div>
    </div>
</template>

<script>
import { computed, onMounted, ref } from "@vue/runtime-core";
import store from "../../store";
export default {
  setup() {
    const serviceId = ref("");
    const getServiceId = (id) => {
      serviceId.value = id;
    };

    onMounted(() => {
      store.dispatch("userServices", "");
    });


    function deleteService() {
      store.dispatch('deleteService',serviceId.value)
      console.log("delete service id: ", serviceId.value);
    }
    return {
      jobs: computed(() => store.getters.getAllJobs),
      loader: computed(() => store.getters.getSellerLoader),
      services: computed(() => store.getters.getUserServices),
      deleteService,
      getServiceId,
      serviceId,
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
.table td {
  padding: 5px;
}
</style>