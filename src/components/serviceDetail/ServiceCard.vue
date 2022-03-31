<template>
  <div class="col-lg-4 right">
    <div class="mt-2 d-flex justify-content-end">
      <router-link class="text-primary" :to="{ name: 'UpdateService', params: { id: service.id } }"><u>Edit Service</u></router-link>
    </div>
    <div class="mt-4 ">
      <div class="tab-content">
        <div id="basic" class="tab-pane fade show active">
          <h4>Service Details</h4>
          <hr class="my-2">
          <div class="header text-secondary">
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
              <div class="delivery text-muted"
                ><i class="mdi mdi-clock" aria-hidden="true"></i><b class="mr-2 text-dark"> Delivery Time:  </b> {{ service.delivery_time}}
                </div >
          </article>
          <article>
              <div class="delivery text-muted"
                ><i class="mdi mdi-sync" aria-hidden="true"></i> <b class="mr-2 text-dark"> Revision:  </b> {{ service.revision}}</div
              >
          </article>
          <article>
            <div>
              <div class="delivery text-muted"
                ><i class="mdi mdi-radiobox-blank" aria-hidden="true"></i><b class="mr-2 text-dark"> Category :  </b> {{ service.category.title}}
                </div >
            </div>
            <div>
              <div class="delivery text-muted">
              <i class="mdi mdi-google-circles-extended" aria-hidden="true"></i> <b class="mr-2 text-dark"> Sub Category:  </b> {{service.sub_category.title.substr(0,29)}}{{service.sub_category.title > 29 ? '...' : ''}}</div
              >
            </div>
          </article>
          <article>
            <div>
              <div class="delivery text-muted"
                ><i class="mdi mdi-currency-eur" aria-hidden="true"></i><b class="mr-2 text-dark"> Price :  </b> €{{service.price}}
                </div >
            </div>
          </article>
          <router-link
            :to="{ name: 'Purchase', params: { id: service.id } }"
            class="btn app-btn-primary   w-100" v-if="isBuyerMode"
          >
            Purchase
          </router-link>

          <router-link
            :to="{ name: 'Chat', params: { id: `${service.service_user.id}`}, query: {gig: service.id} }"
            class="btn app-btn-secondary w-100 mt-3" v-if="isBuyerMode"
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
.main-page .right .tab-content p{
  margin: 15px 5px;
}
</style>