<template>
  <div class="col-lg-4 right mt-5">
    <div class="">
      <div class="tab-content">
        <div id="basic" class="tab-pane fade show active">
          <h4>Package Detail</h4>
          <hr />
          <div class="header">
            <p>
              {{service.s_description}}
            </p>
            <p>
              {{service.description.substr(0,100)}}{{service.description.length > 100 ? '..' : ''}}
            </p>
            <p>
              {{service.additional_info.substr(0,100)}}{{service.additional_info.length > 100 ? '...' : ''}}
            </p>
          </div>
          <article>
            <div class="d-flex">
              <b class="delivery"
                ><i class="fa fa-clock-o" aria-hidden="true"></i> Delivery: {{service.delivery_time}}
                </b
              >
              <b class="delivery ml-3"
                ><i class="fa fa-refresh" aria-hidden="true"></i> Revision: {{service.revision}}</b
              >
            </div>
          </article>
          <h3 ><b> Price</b><span class="price">${{service.price}}</span></h3>


          <router-link
            :to="{ name: 'Purchase', params: { id: service.id } }"
            class="btn btn-success text-white w-100" v-if="isBuyerMode"
          >
            Continue
          </router-link>

          <router-link
            :to="{ name: 'Chat', params: { id: `${service.service_user.id}` } }"
            class="btn btn-success text-white w-100 mt-3" v-if="isBuyerMode"
          >
            Contact Seller
          </router-link>
        </div>
      </div>
      <!---------------------    Modal End     --------------------->
    </div>
  </div>

</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    return {
      isBuyerMode: computed(() => store.getters.isBuyerMode),
      service: computed(() => store.getters.getSingleService),
    };
  },
};
</script>
 
<style scoped>
.width {
  width: 140px;
}
</style>