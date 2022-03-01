<template>
  <div class="main-page py-3" v-if="service && service.service_user">
         <div class="container">
            <div class="row">
               <div class="col-lg-8 left">
                       <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Library</li>
                        </ol>
                     </nav>
   
                    <h2 class="h2-cutom-font"> {{ service.s_description }}  </h2>
                    <Gallery :serviceMedia="service.service_media" />
                    <AboutService :service="service" />
                  <div class="profile-card">
                    <AboutSeller :service="service" />

                   <h3>Other Services I Offer</h3>
                   <div class="recommended d-flex flex-wrap justify-content-start">
                    <ServiceList :services="otherServices" />
                   </div>

                  </div>
                  <Faq />
                  <ReviewSection />
               </div>
               <ServiceCard />
            </div>
         </div>
         <PeopleViewProfile />
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
import ServiceList from '@/components/profile/ServiceListSection.vue';
import Faq from '../components/singleService/Faq.vue';
import ReviewSection from "@/components/profile/SellerReviewsSection.vue";
import ServiceCard from '../components/singleService/ServiceCard.vue';
import PeopleViewProfile from '../components/singleService/PeopleViewProfile.vue';

export default{
    name:"gigDetail",
    components: {
    Gallery,
    AboutService,
    AboutSeller,
    ServiceList,
    Faq,
    ReviewSection,
    ServiceCard,
    PeopleViewProfile,
},
    setup() {
    const store = useStore()
    const route = useRoute();
    const payload = {
       "id": route.params.id,
       "type": ""
    }
    onMounted(() => {
      store.dispatch("userSingleService",payload);
      // store.dispatch("userServices",'');

    })

    return {
        service: computed(()=>store.getters.getSingleService),
        otherServices: computed(() => store.getters.getUserOtherServices)
    }
}
}
</script>

<style>

</style>../components/singleService/PeopleViewProfile.vue