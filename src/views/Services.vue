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
                     
                  <ServiceSection v-for="service in $store.getters.getServices" :key="service.id" :service="service" />

                  <Loader v-if="$store.getters.getLoadingStatus==='LOADING'"/>

                  <servicePagination />
                  
               </div>
            </div>
         </div>
   </section>

  </div>
</template>

<script>
import ServiceNavSection from '@/components/services/ServiceNavSection.vue';
import ServiceSection from '@/components/services/ServiceSection.vue';
import ServiceFilterSection from '@/components/services/ServiceFilterSection';
import ServicePagination from '@/components/services/ServicePagination';
import Loader from '@/components/loadingComponent.vue';

export default {
  components:{
    ServiceNavSection,
    ServiceSection,
    ServiceFilterSection,
    ServicePagination,
    Loader,
  },
  setup() {

  }
}
</script>
