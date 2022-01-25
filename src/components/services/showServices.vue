<template>
  <div class="row" style="">
    <div class="absolute-center" v-if="!$store.getters.getUserServices.length">
      <h5>No services are available for this category</h5>
    </div>
    <div
      class="service-col col-md-4 d-flex flex-column align-self-stretch"
      v-for="service in $store.getters.getUserServices"
      :key="service.id"
    >
      <ServiceGig :service="service" />
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { reactive } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import ServiceGig from "@/components/services/ServiceGig.vue";

export default {
  components: { ServiceGig },
  
  async setup() {
    const store = useStore();
    const route = useRoute();
    const query = reactive(route.query);

    watch(
      () => store.getters.getCategorySlug,
      () => {
        store.dispatch(
          "searchUserServicesByCategoryId",
          store.getters.getCategorySlug
        );
      }
    );

    if ("category" in query) {
      await store.dispatch("searchUserServicesByCategoryId", query.category);
      console.log("Status", store.getters.getUserServicesStatus);
    } else {
      await store.dispatch("searchUserServices", query.q);
    }

    return {};
  },
};
</script>

<style lang="scss" scoped>
.service-col {
  max-height: 500px;
}
.absolute-center {
  position: absolute;
  top: 30%;
  right: 23%;
}
</style>
