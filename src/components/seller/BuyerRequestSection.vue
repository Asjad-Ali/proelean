<template>
  <div class="container pt-3">
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div
          v-for="request in requests"
          :key="request.id"
        >
        <!-- {{ request.id }} -->
          <div class="card">
            <h5 class="card-header bg-white">
              <div class="d-flex align-items-end">
                  <img
                    class="img-fluid bg-info rounded-circle mr-2" style="width:55px;height:55px;"
                    :src="
                      'https://api.dex.proelean.com/' + request.user.image
                    "
                    alt=""
                  />
                  <div class="row d-flex flex-column">
                    <div class="col">

                      <span class="seller-name">
                        <p> {{ request.user.username }} </p>
                      </span>
                      <div style="font-size:12px;"> {{ request.created_at }} </div> 
                    </div>
                  </div>
                </div>
              </h5>
            <div class="card-body">
              <p class="card-text bg-light">
                {{ request.description }}
              </p>
              <div class='d-flex justify-content-start flex-column my-1'>
                <div class='mb-2'> Duration: {{ request.delivery_time }} </div>
                <div class='mb-2'> budget: {{ request.budget }}$ </div>
                <div class='mb-2'> Document: No Attachment </div>
              </div>
              <div class='d-flex justify-content-end'>
                <a href="#" class="btn btn-dark">{{ request.total_offers }} Offers Sent</a>
                <a href="#" class="btn btn-primary ml-2" :style="{'pointer-events': request.is_applied ? 'none':''}">{{ request.is_applied ? 'Applied' : 'Send Offer'}}</a>
                <a href="#" class="btn btn-success ml-2">Cancel Offer</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import store from "../../store";
export default {
  setup() {
    return {
      requests: computed(() => store.getters.getBuyerRequests)
    };
  },
};
</script>

<style>
</style>