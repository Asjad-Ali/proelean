<template>
  <div class="main-page second py-5">
    <div class="container-fluid">
      <div class="row">
        <PersonalDetails />
        <div class="col-lg-8 right">
          <div class="recommended d-flex flex-wrap justify-content-start">

            <div
              class="col-md-4 mb-3 service-list-section"
              v-for="service in userServices"
              :key="service.id"
              >
              <Loader v-if="$store.loadingStatus==='LOADING'" />
              <ServiceList :service="service" v-else />
            </div>
          </div>
          <ServicePagination v-if="$store.state.servicesHasNextPage !== ''" />

          <ReviewSection />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PersonalDetails from '@/components/profile/PersonalDetails.vue';
import ServiceList from '@/components/Service.vue';
import ReviewSection from "@/components/profile/SellerReviewsSection.vue";
import ServicePagination from '@/components/profile/ServicePagination.vue';
import Loader from '@/components/loadingComponent.vue';
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  components:{
    PersonalDetails,
    ServiceList,
    ReviewSection,
    ServicePagination,
    Loader
  },
  setup() {
    const store = useStore();
    onMounted(store.dispatch("userServices",''));
    

    return {
      user: computed(() => store.getters.getAuthUser),
      userServices: computed(() => store.getters.getUserServices)
    };
  }

};
</script>

<style scoped>
.container{
  max-width: 1200px;
}
</style>