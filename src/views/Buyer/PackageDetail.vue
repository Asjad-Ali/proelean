<template>
 <div class="tab-content shadow-none" data-v-0d25e83c="" v-if="service.s_description">
   <div id="basic" class="tab-pane fade show active" data-v-0d25e83c="">
      <h4 data-v-0d25e83c="">Service Details</h4>
      <hr data-v-0d25e83c="">
      <div class="header">
         <p >{{service.s_description}}</p>
            <p>
              {{service.description.substr(0,100)}}{{service.description.length > 100 ? '..' : ''}}
            </p>
            <p>
              {{service.additional_info.substr(0,100)}}{{service.additional_info.length > 100 ? '...' : ''}}
            </p>
      </div>
      <article data-v-0d25e83c="">
         <div class="d-flex text-muted" data-v-0d25e83c="">
            <b class="delivery" data-v-0d25e83c="">
   <i class="mdi mdi-clock" aria-hidden="true"  ></i>
                Delivery Time: {{service.delivery_time}}
            </b>
            <b class="delivery ml-3" data-v-0d25e83c="">
   <i class="mdi mdi-sync" aria-hidden="true" data-v-0d25e83c=""></i>
               <!-- <i class="fa fa-refresh" aria-hidden="true" data-v-0d25e83c=""></i> Font Awesome fontawesome.com --> Revision: {{service.revision}}
            </b>
         </div>
      </article>
               <h3 ><b> Price</b><span class="price">${{service.price}}</span></h3>
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
      service: computed(() => store.getters.getSingleService),
    };
  },
};
</script>

<style>
</style>