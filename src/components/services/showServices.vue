<template>
  <div class="row" style="">
    <div class="absolute-center" v-if="!services.length">
      <h5>No services are available for this category</h5>
    </div>
    <div
      class="service-col col-md-4 d-flex flex-column align-self-stretch"
      v-for="service in services"
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
  props: { 
    services:{
      type: Array,
      required: true 
    }
  },
  
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
      await store.dispatch("searchServicesByCategoryId", query.category);
      console.log("Status", store.getters.getUserServicesStatus);
    } else {
      await store.dispatch("searchServices", query.q);
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
