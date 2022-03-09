<template>
  <div class="container-xl">
    <div class="row g-3 mb-4 align-items-center justify-content-between">
      <div class="col-auto">
        <h1 class="app-page-title mb-0">My Services</h1>
      </div>
      <div class="col-auto">
        <div class="page-utilities">
          <div
            class="
              row
              g-2
              justify-content-start justify-content-md-end
              align-items-center
            "
          >
            <!--//col-->
            <div class="col-auto">
              <router-link
                class="btn app-btn-primary"
                to="/dashboard/create-gig"
                ><svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-upload me-2"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"
                  /></svg
                >Create Service</router-link
              >
            </div>
          </div>
          <!--//row-->
        </div>
        <!--//table-utilities-->
      </div>
      <!--//col-auto-->
    </div>
    <!--//row-->

    <div class="row g-4 recommended d-flex flex-wrap justify-content-start">
      <Loader v-if="$store.getters.getLoadingStatus === 'LOADING'" />
      <div
        class="col-6 col-md-4 mb-3 col-xxl-3 service-list-section"
        v-for="service in userServices"
        :key="service.id"
        v-else
      >
        <Service :service="service" />
      </div>
    </div>
  </div>
</template>


<script>
import { useStore } from "vuex";
import { onMounted, computed } from "vue";
import Service from "@/components/Service.vue";
import Loader from "@/components/loadingComponent.vue";
export default {
  components: { Service, Loader },
  setup() {
    const store = useStore();
    onMounted(store.dispatch("userServices", ""));

    return {
      user: computed(() => store.getters.getAuthUser),
      userServices: computed(() => store.getters.getUserServices),
    };
  },
};
</script>