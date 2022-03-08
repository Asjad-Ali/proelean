<template>
  <div class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="d-flex align-items-center pb-2 border-bottom">
            <h3 class="mb-0 p-0">Favourite Services</h3>
            <router-link
              class="btn btn-sm btn-success ml-auto light"
              to="/seller/create_service"
            >
              Create New Service
            </router-link>
          </div>
        </div>
        <div class="row" v-if="favouriteServices">
          <Loader v-if="$store.getters.getLoadingStatus === 'LOADING'" />
          <div
            class="service-col col-md-4 d-flex flex-column align-self-stretch"
            v-for="favouriteService in favouriteServices"
            :key="favouriteService.id"
            v-else
          >
            {{ Service }}
            <div class="row">
              <Service :service="favouriteService" />
            </div>
          </div>
        </div>
        <div v-else class="container text-center py-5">
          <h3>No Any Service Available</h3>
        </div>
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