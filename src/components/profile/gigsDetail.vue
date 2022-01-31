<template>
  <div class="col-lg-8 right">
    <h2>{{ user.username }}</h2>
    <div class="recommended">
      {{ $store.getters.getUserServices }}
      <ShowServices :services="$store.getters.getUserServices" />
    </div>
    <ReviewSection />
  </div>
</template>

<script>
import { computed } from "vue";
import store from "../../store";
import ShowServices from "@/components/services/showServices.vue";
import ReviewSection from "./reviewSection.vue";

export default {
  components: {
    ShowServices,
    ReviewSection
  },
  setup() {
    store.dispatch("userServices");

    return {
      user: computed(() => store.getters.getAuthUser),
    };
  },
};
</script>
