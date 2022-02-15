<template>
  <BuyerRequestSection />
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import BuyerRequestSection from "../../components/seller/BuyerRequestSection.vue";
export default {
  components: {
    BuyerRequestSection,
  },
  setup() {
    const store = useStore();
    onMounted(store.dispatch("showBuyerRequests"));

    return {
      requests: computed(() => store.getters.getBuyerRequests),
    };
  },
};
</script>

<style scoped>
</style>