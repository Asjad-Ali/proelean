<template>
  <div class="py-3">
    <div class="container">
        <div class="mb-3">
          <div class="d-flex mb-2 align-items-center border-bottom">
            <h3 >Favourite Services</h3>
          </div>
        </div>
        <div class="row g-4 recommended d-flex flex-wrap justify-content-start" v-if="favouriteServices">
          <Loader v-if="$store.getters.getLoadingStatus === 'LOADING'" />
          <div
            class="col-6 col-md-4 mb-3 col-xxl-3 service-list-section"
            v-for="favouriteService in favouriteServices"
            :key="favouriteService.id"
            v-else
          >
            {{ Service }}
            <div>
              <Service :service="favouriteService" />
            </div>
          </div>
        </div>
        <div v-else class="container text-center py-5">
          <h3>No Any Service Available</h3>
        </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import Loader from "../../components/loadingComponent.vue";
import Service from "@/components/Service.vue";

export default {
  components: { Loader, Service },
  setup() {
    const store = useStore();
    onMounted(() => {
      store.dispatch("allWishlistServices");
    });
    return {
      favouriteServices: computed(() => store.getters.getWishlistServices),
    };
  },
};
</script>

<style>
</style>