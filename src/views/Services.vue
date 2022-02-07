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
import Loader from '@/components/loadingComponent.vue';
import { useRoute } from 'vue-router';
import { onBeforeMount, onMounted, onUnmounted, ref, watch } from '@vue/runtime-core';
import { useStore } from 'vuex';

export default {
  components:{
    ServiceNavSection,
    ServiceSection,
    ServiceFilterSection,
    Loader,
  },
  setup() {
      const store = useStore();
      const route = useRoute();
      const scrollComponent = ref(null);
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

      onMounted(() => {
         window.addEventListener("scroll", handleScroll)
      })

      onUnmounted(() => {
         window.removeEventListener("scroll", handleScroll)
      })

      const handleScroll = () => {
         let element = scrollComponent.value;
         console.log(store.getters.getCurrentPage);
         
         if (store.getters.getCurrentPage > 1 && store.getters.getLoadingStatus === 'COMPLETED' && element.getBoundingClientRect().bottom <= window.innerHeight) {
            let page = store.getters.getCurrentPage;
            store.dispatch('handlePagination',`&page=${page}`)
         }
      }

      return {
         scrollComponent
      }
  }
}
</script>
