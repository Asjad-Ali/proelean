<template>
  <div class="col-lg-4 right mt-5">
    <div class="">
      <div class="tab-content">
        <div id="basic" class="tab-pane fade show active">
          <h4>Service Details</h4>
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
              <div class="delivery"
                ><i class="mdi mdi-clock" aria-hidden="true"></i><b class="mr-2"> Delivery Time:  </b> {{ service.delivery_time}}
                </div >
              <div class="delivery ml-3"
                ><i class="mdi mdi-sync" aria-hidden="true"></i> <b class="mr-2"> Revision:  </b> {{ service.revision}}</div
              >
            </div>
          </article>
          <article>
            <div>
              <div class="delivery"
                ><i class="mdi mdi-radiobox-blank" aria-hidden="true"></i><b class="mr-2"> Category :  </b> {{ service.category.title}}
                </div >
            </div>
            <div>
              <div class="delivery">
              <i class="mdi mdi-google-circles-extended" aria-hidden="true"></i> <b class="mr-2"> Sub Category:  </b> {{ service.sub_category.title}}</div
              >
            </div>
          </article>
          <article>
            <div>
              <div class="delivery"
                ><i class="mdi mdi-currency-eur" aria-hidden="true"></i><b class="mr-2"> Price :  </b> €{{service.price}}
                </div >
            </div>
          </article>
          <router-link
            :to="{ name: 'Purchase', params: { id: service.id } }"
            class="btn btn-success text-white w-100" v-if="isBuyerMode"
          >
            Purchase
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