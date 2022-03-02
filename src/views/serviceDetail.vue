<template>
  <div class="main-page py-3" v-if="service && service.service_user">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 left">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">
                Library
              </li>
            </ol>
          </nav>

          <h2 class="h2-cutom-font">{{ service.s_description }}</h2>
          <Gallery :serviceMedia="service.service_media" />
          <AboutService :service="service" />
          <div class="profile-card">
            <AboutSeller :service="service" />

            <h3 v-if="service.offered_services.length">
              Other Services I Offer
            </h3>
            <div class="recommended d-flex flex-wrap justify-content-start">
              <Loader
                v-if="
                  $store.getters.getServiceLoader === 'LOADING' &&
                  service.offered_services.length
                "
              />
              <div
                class="col-md-4 mb-3 service-list-section"
                v-for="offeredService in service.offered_services"
                :key="offeredService.id"
                v-else
              >
                <Service :service="offeredService" />
              </div>
            </div>
          </div>
          <Faq />
          <ReviewSection />
        </div>
        <ServiceCard />
      </div>
    </div>

    <TopPicSection />
    <!-- <PeopleViewProfile /> -->
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import Gallery from "@/components/singleService/Gallery.vue";
import AboutService from "@/components/singleService/AboutService.vue";
import AboutSeller from "@/components/singleService/AboutSeller.vue";
import Service from "@/components/Service.vue";
import Faq from "@/components/singleService/Faq.vue";
import ReviewSection from "@/components/profile/SellerReviewsSection.vue";
import ServiceCard from "@/components/singleService/ServiceCard.vue";
// import PeopleViewProfile from '@/components/singleService/PeopleViewProfile.vue';
import TopPicSection from "@/components/home/TopPicSection.vue";

export default {
  name: "gigDetail",
  components: {
    Gallery,
    AboutService,
    AboutSeller,
    Service,
    Faq,
    ReviewSection,
    ServiceCard,
    //  PeopleViewProfile,
    TopPicSection,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const payload = {
      id: route.params.id,
      type: "SERVICE_DETAIL",
    };
    onMounted(() => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      store.dispatch("userSingleService", payload);
    });

    return {
      service: computed(() => store.getters.getSingleService),
      // sellerOfferedServices: computed(() => store.getters.getSellerOfferedServices.filter(service => service.id!=route.params.id).slice(0,3))
    };
  },
};
</script>

<style>
</style>