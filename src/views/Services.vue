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
                        <h3 v-if="$route.params.slug || category">Services In {{ category + ' ' + $route.params.slug }}</h3>
                     </div>
                  </div>
                  <div class="row">
                     <Loader v-if="$store.getters.getLoadingStatus==='LOADING'"/>
                     <div
                        class="service-col col-md-4 d-flex flex-column align-self-stretch"
                        v-for="service in $store.getters.getServices"
                        :key="service.id"
                        v-else
                     >  
                        <Service :service="service" />
                     </div>

                     <div
                        class="container"
                        v-if="!$store.getters.getServices.length && $store.getters.getLoadingStatus==='COMPLETED'" 
                     >
                     <div class="d-flex justify-content-center align-item-center">
                        No service found against {{ $route.params.slug  || category }}
                     </div>
                     </div>
                  </div>
                  <PaginationSection v-if="$store.getters.getServices.length && $store.getters.getPages.last_page > 1" />
               </div>
            </div>
         </div> 
   </section>

  </div>
</template>

<script>
import ServiceNavSection from '@/components/services/ServiceNavSection.vue';
import Service from '@/components/Service.vue';
import PaginationSection from '@/components/services/ServicePagination.vue';
import ServiceFilterSection from '@/components/services/ServiceFilterSection';
import Loader from '@/components/loadingComponent.vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { computed, onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';

export default {
   components: {
      ServiceNavSection,
      Service,
      ServiceFilterSection,
      PaginationSection,
      Loader,
   },
   setup() {
      const store = useStore();
      const route = useRoute();
      const params = new URLSearchParams(window.location.search)
      const category = params.has('category') ? params.get('category') : '';

      onBeforeRouteUpdate((to, from) => {
         if(to.params.slug !== from.params.slug) {
            store.dispatch('searchServices',`search?q=${ to.params.slug ? to.params.slug : ''}&category=${category}`)
            store.dispatch('setPage',1);
         }
      })
      onMounted(store.dispatch('searchServices',`search?q=${ route.params.slug ? route.params.slug : ''}&category=${category}`))
      return {
         isNextPage: computed(()=>store.getters.getNextPage),
         category
      }
   }
}
</script>
