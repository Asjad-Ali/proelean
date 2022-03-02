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
                           <!-- <p class="mb-2">463 Services available</p> -->
                           <!-- <div class="sorting d-flex align-items-center">
                              <p>Sortby</p>
                              <select class="custom-select custom-select-sm border-0 shadow-sm ml-2">
                                 <option>Best Selling</option>
                                 <option>Recommended</option>
                                 <option>Newest Arrivals</option>
                              </select>
                           </div> -->
                        </div>
                        <h3 v-if="$route.params.slug">Services In {{ $route.params.slug }}</h3>
                     </div>
                  </div>
                  <div class="row">
                     <div
                        class="service-col col-md-4 d-flex flex-column align-self-stretch"
                        v-for="service in $store.getters.getServices"
                        :key="service.id"
                     >  
                        <ServiceSection :service="service" />
                     </div>
                     <Loader v-if="$store.getters.getLoadingStatus==='LOADING'"/>
                     <div
                        class="container"
                        v-if="!$store.getters.getServices.length && $store.getters.getLoadingStatus==='COMPLETED'" 
                     >
                     <div class="d-flex justify-content-center align-item-center">
                        No service found against {{ $route.params.slug }}
                     </div>
                     </div>
                  </div>
                  <PaginationSection v-if="$store.getters.getCurrentPage > 1" />
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
import Loader from '@/components/loadingComponent.vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { computed, onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';

export default {
   components: {
      ServiceNavSection,
      ServiceSection,
      ServiceFilterSection,
      PaginationSection,
      Loader,
   },
   setup() {
      const store = useStore();
      const route = useRoute();

      onBeforeRouteUpdate((to, from) => {
         if(to.params.slug !== from.params.slug) {
            store.dispatch('searchServices',`search?q=${ to.params.slug ? to.params.slug : ''}`)
            store.dispatch('setPage',1);
         }
      })
      onMounted(store.dispatch('searchServices',`search?q=${ route.params.slug ? route.params.slug : ''}`))
      return {
         isNextPage: computed(()=>store.getters.getNextPage)
      }
   }
}
</script>
