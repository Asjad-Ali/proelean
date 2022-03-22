<template>
  <div class="container-xl">
    <div class="mb-3">
      <div class="d-flex mb-2 justify-content-between ">
        <div >
        <h1 class="app-page-title mb-0">Buyer Requests</h1>
        </div>
        <div>
        <select class="form-select form-control-sm" aria-label="Default select example"  @change="showFilter" id="requestValue">
          <option :value="req.value" v-for="req in buyerRequestType" :key="req.index">
            {{ req.name }}
          </option>
        </select>
      </div>
      </div>
      <div class="border-bottom my-3"></div>
    </div>
    <div v-if="loader && $store.getters.getBuyerRequestsCurrentPage == 1" class="d-flex justify-content-center s-margin">
      <div class="spinner-border text-primary m-5" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else>
      <div v-if="requests">
        <div
          class="app-card app-card-notification shadow-sm mb-4"
          v-for="request in requests"
          :key="request.id"
        >
          <div class="app-card-header px-4 py-3 d-flex justify-content-between">
            <div class="row g-3 align-items-center">
              <div class="col-12 col-lg-auto text-center text-lg-start">
                <img
                  class="img-fluid rounded-circle mr-2"
                  style="width: 45px; height: 45px; object-fit: cover"
                  :src="`${imgURL}/${request.user.image}`"
                  alt=""
                />
              </div>
              <!--//col-->
              <div class="col-12 col-lg-auto text-lg-start">
                <h4 class="notification-title mb-1">
                  {{ request.user.username }}
                </h4>
                <ul class="notification-meta list-inline mb-0">
                  <li class="list-inline-item"> <i class="mdi mdi-clock"></i> {{ $filters.timeAgo(request.created_at) }}</li>
                  <li class="list-inline-item">|</li>
                  <li class="list-inline-item"> <i class="mdi mdi-file"></i> Document: No Attachment</li>
                </ul>
              </div>
              <!--//col-->
            </div>
            <!--//row-->
            <div>
              <ul class="notification-meta list-inline mb-0">
                <li class="list-inline-item"><b> <i class="mdi mdi-clock"></i> Duration : </b> {{ request.delivery_time }}</li>
                <li class="list-inline-item">|</li>
                <li class="list-inline-item"><b><i class="mdi mdi-database"></i> budget : </b>€{{ request.budget }}</li>
              </ul>
            </div>
          </div>
          <!--//app-card-header-->
          <div class="app-card-body p-4">
            <div class="notification-content">
              {{ request.description }}
            </div>
          </div>
          <!--//app-card-body-->
          <div class="app-card-footer px-4 py-3 text-center">
            <button  style="cursor: default;" type="button"  class="btn app-btn-secondary mx-2 my-1">
              {{ request.total_offers }} Offers Sent
            </button>
            <button
              type="button"
              class="btn app-btn-primary mx-2 my-1"
              :style="{ 'pointer-events': request.is_applied ? 'none' : '' }"
              data-toggle="modal"
              data-target="#sendOfferModal"
              @click.prevent="defineOffer(request.id)"
            >
              {{ request.is_applied ? "Applied" : "Send Offer" }}
            </button>
            <button
              type="button"
              :disabled="getBtnStatus == request.id"
              class="btn btn-success mx-2 my-1"
              @click="deleteJob(request.id)"
            >
              {{ getBtnStatus == request.id ? "Loading..." : "Cancel Offer" }}
            </button>
          </div>
          <!--//app-card-footer-->
         </div>

      </div>

      <div v-else class="container text-center py-5">
        <h2>No Any Request Available Now</h2>
      </div>
    </div>
    <div  class="text-center mt-4" v-if="$store.getters.isBuyerRequestHasNextPage">
      <a @click="loadMore()" class="btn app-btn-secondary" href="#">
      {{loader === 1 ? 'Loading...' : 'Load more Requests'}}</a>
    </div>

         <!---------------------    Modal (Send Offer)     --------------------->
            <div
              class="modal fade"
              id="sendOfferModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="sendOfferModalTitle"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header d-flex justify-content-center">
                    <h5 class="modal-title" id="exampleModalLongTitle">
                      Send Offer
                    </h5>
                  </div>
                  <div class="modal-body text-center">
                    <div class="text-left font">Describe your offer</div>
                    <textarea
                      type="text"
                      class="form-control"
                      name="description"
                      v-model="payload.description"
                      id="description"
                      placeholder="Describe your offer"
                      required
                    />
                    <div class="text-left font mt-2">Total Price</div>
                    <input
                      type="number"
                      class="form-control"
                      name="price"
                      v-model="payload.price"
                      id="price"
                      placeholder="Total Offer(EUR)"
                      required
                    />
                    <div class="text-left font mt-2">Delivery Time</div>
                    <select
                      id="deliveryTime"
                      class="form-control"
                      name="delivery_time"
                      v-model="payload.delivery_time"
                      required
                    >
                      <option selected>Select day</option>
                      <option
                        v-for="day in $store.getters.getDeliveryDays"
                        :value="day"
                        :key="day.index"
                      >
                        {{ day }}
                      </option>
                    </select>

                    <div class="text-left font mt-2">Service</div>
                    <select
                      id="services"
                      class="form-control"
                      name="service"
                      v-model="payload.service_id"
                      required
                    >
                      <option selected disabled>Select Service</option>
                      <option
                        v-for="service in $store.getters.getUserServices"
                        :value="service.id"
                        :key="service.id"
                      >
                        {{ service.s_description }}
                      </option>
                    </select>
                  </div>
                  <div class="modal-footer d-flex justify-content-center">
                    <button
                      type="button"
                      class="btn btn-success"
                      data-dismiss="modal"
                      @click.prevent="sendOffer()"
                    >
                      Send Offer
                    </button>
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          <!----------------------    Modal End     --------------------->
<<<<<<< HEAD
=======
      </div>

      <div v-else class="container text-center py-5">
        <h2>No Any Request Available Now</h2>
      </div>
    </div>
    <div  class="text-center mt-4" v-if="$store.getters.isBuyerRequestHasNextPage">
      <a @click="loadMore()" class="btn app-btn-secondary" href="#">
      {{loader === 1 ? 'Loading...' : 'Load more Requests'}}</a>
    </div>

    <!---------------------    Modal (Send Offer)     --------------------->
    <div
      class="modal fade"
      id="sendOfferModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="sendOfferModalTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header d-flex justify-content-center">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Send Offer
            </h5>
          </div>
          <div class="modal-body text-center">
            <div class="text-left font">Describe your offer</div>
            <textarea
              type="text"
              class="form-control"
              name="description"
              v-model="payload.description"
              id="description"
              placeholder="Describe your offer"
              required
            />
            <div class="text-left font mt-2">Total Price</div>
            <input
              type="number"
              class="form-control"
              name="price"
              v-model="payload.price"
              id="price"
              placeholder="Total Offer(EUR)"
              required
            />
            <div class="text-left font mt-2">Delivery Time</div>
            <select
              id="deliveryTime"
              class="form-control"
              name="delivery_time"
              v-model="payload.delivery_time"
              required
            >
              <option selected>Select day</option>
              <option
                v-for="day in $store.getters.getDeliveryDays"
                :value="day"
                :key="day.index"
              >
                {{ day }}
              </option>
            </select>

            <div class="text-left font mt-2">Service</div>
            <select
              id="services"
              class="form-control"
              name="service"
              v-model="payload.service_id"
              required
            >
              <option selected disabled>Select Service</option>
              <option
                v-for="service in $store.getters.getUserServices"
                :value="service.id"
                :key="service.id"
              >
                {{ service.s_description }}
              </option>
            </select>
          </div>
          <div class="modal-footer d-flex justify-content-center">
            <button
              type="button"
              class="btn btn-success"
              :disabled="getBtnStatus == 2"
              data-dismiss="modal"
              @click.prevent="sendOffer()"
            >
              {{ getBtnStatus == 2 ? "Loading..." : "Send Offer" }}
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    <!----------------------    Modal End     --------------------->
>>>>>>> 4ed0c77ae7afd5d2c3a2043fa9cee764a2fcf8ec
  </div>
</template>



<script>
import { computed, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    onBeforeMount(() => {
      store.dispatch("showBuyerRequests");
    });

    const jobId = ref("")
    const payload = ref({
      job_id: "",
      service_id: "",
      description: "",
      price: "",
      delivery_time: "",
    });

    const buyerRequestType =  [ 
      { value: 0, name:"Buyer Request" },
      { value: 1, name:"Sent Offer" },
    ]

    function loadMore(){
      store.dispatch("showBuyerRequests");
    }

    function defineOffer(jobID) {
      payload.value.job_id = jobID;
      store.dispatch("getCountriesLanguage");
      store.dispatch("userServices");
    }

    function sendOffer() {
      store.dispatch("sendOffer", payload.value);
      payload.value = {};
    }

    function showFilter() {
      let value = document.getElementById("requestValue").value;
      console.log(value)
      if(value == 1){
        store.dispatch("showBuyerRequests","sent_offers");
      }else{
        store.dispatch("showBuyerRequests");
      }
    }

    function deleteJob(id) {
      //store.dispatch("deleteBuyerJob", id);
      console.log("delete request id: ", id);
    }

    return {
      requests: computed(() => store.getters.getBuyerRequests),
      buyerRequestType,
      showFilter,
      loader: computed(() => store.getters.getLoaderVal),
      getBtnStatus: computed(() => store.getters.getRegisterStatus),
      imgURL: process.env.VUE_APP_URL,
      payload,
      defineOffer,
      sendOffer,
      deleteJob,
      loadMore,
      jobId,
    };
  },
};
</script>
