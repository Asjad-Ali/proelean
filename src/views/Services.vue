<template>
  <div>
    <ServiceNavSection />    

    <section class="py-5 p-list-two">
         <div class="container">
            <div class="row">

              <ServiceFilterSection />

               <div class="col-lg-9 view_slider recommended">
                  <div class="row">
                     <div class="col-lg-12">
                        <div class="sorting-div d-flex align-items-center justify-content-between">
                           <p class="mb-2">463 Services available</p>
                           <div class="sorting d-flex align-items-center">
                              <p>Sortby</p>
                              <select class="custom-select custom-select-sm border-0 shadow-sm ml-2">
                                 <option>Best Selling</option>
                                 <option>Recommended</option>
                                 <option>Newest Arrivals</option>
                              </select>
                           </div>
                        </div>
                        <h3>Services In {{ $route.query.q }}</h3>
                     </div>
                  </div>
                  <NotFoundSection v-if="!$store.getters.getServices.length" />
                  <div class="row">
                     <div
                           class="service-col col-md-4 d-flex flex-column align-self-stretch"
                           v-for="service in $store.getters.getServices"
                           :key="service.id"
                     >  
                        <ServiceSection :service="service" />
                     </div>
                     <Loader v-if="$store.getters.getLoadingStatus==='LOADING'"/>

                     <PaginationSection />
                  </div>
               </div>
            </div>
         </div>
   </section>

  </div>
</template>

<script>
import ServiceNavSection from '@/components/services/ServiceNavSection.vue';
import ServiceSection from '@/components/services/ServiceSection.vue';
import PaginationSection from '@/components/services/ServicePagination.vue';
import ServiceFilterSection from '@/components/services/ServiceFilterSection';
import NotFoundSection from '@/components/services/ServiceNotFoundSection.vue';
import Loader from '@/components/loadingComponent.vue';
import { useRoute } from 'vue-router';
import { onBeforeMount, ref, watch } from '@vue/runtime-core';
import { useStore } from 'vuex';

export default {
  components:{
    ServiceNavSection,
    ServiceSection,
    ServiceFilterSection,
    PaginationSection,
    NotFoundSection,
    Loader,
  },
  setup() {
      const store = useStore();
      const route = useRoute();
      const params = ref(route.query.category)

      watch(params.value, function(){
         console.log(params.value);
      })

      onBeforeMount(() => {
         if('q' in route.query) {
            store.dispatch('searchServices',`search?q=${route.query.q}`)
         } else {
            store.dispatch('searchServices',`categories/${route.query.category}/services`)
         }
      })
  }
}
</script>
