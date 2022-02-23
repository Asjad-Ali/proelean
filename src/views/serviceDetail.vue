<template>
  <div class="main-page py-3" v-if="service && service.service_user">
         <div class="container">
            <div class="row">
               <div class="col-lg-8 left">
                   <Nav />
   
                    <h2 class="h2-cutom-font"> {{ service.s_description }}  </h2>
                    <Gallery :serviceMedia="service.service_media" />
                    <AboutService :service="service" />
                  <div class="profile-card">
                    <AboutSeller :service="service" />
                   
                  <Recommendation />                  
                  </div>
                  <Faq />
                  <Reviews />
               </div>
               <ServiceCard />
            </div>
         </div>
         <PeopleViewdProfile />
      </div>
</template>

<script>

import { computed } from '@vue/runtime-core';
import { onMounted } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Gallery from '../components/singleService/Gallery.vue';
import AboutService from '../components/singleService/AboutService.vue';
import AboutSeller from '../components/singleService/AboutSeller.vue';
import Recommendation from '../components/singleService/Recommendation.vue';
import Faq from '../components/singleService/Faq.vue';
import Reviews from '../components/singleService/Reviews.vue';
import ServiceCard from '../components/singleService/ServiceCard.vue';
import PeopleViewdProfile from '../components/singleService/PeopleViewdProfile.vue';
import Nav from '../components/singleService/Nav.vue';

export default{
    name:"gigDetail",
    components: {
    Gallery,
    AboutService,
    AboutSeller,
    Recommendation,
    Faq,
    Reviews,
    ServiceCard,
    PeopleViewdProfile,
    Nav
},
    setup() {
    const store = useStore()
    const route = useRoute();
    const payload = {
       "id": route.params.id,
       "type": ""
    }
    onMounted(store.dispatch("userSingleService",payload))

    return {
        service: computed(()=>store.getters.getSingleService),
    }
}
}
</script>

<style>

</style>