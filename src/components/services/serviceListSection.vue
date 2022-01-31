<template>
   <section class="py-5 p-list-two">
         <div class="container">
            <div class="row">
                  <serviceFilter />

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
                  
                        <ShowServices :services="$store.getters.getServices"/>
                   

                  <servicePagination />
                  
               </div>
            </div>
         </div>
   </section>
</template>

<script>
import serviceFilter from '@/components/services/serviceFilter';
import servicePagination from '@/components/services/servicePagination';


import ShowServices from '@/components/services/showServices.vue';

export default {
   components:{
      ShowServices,
      serviceFilter,
      servicePagination,
   },
};

</script>

<style>

</style>