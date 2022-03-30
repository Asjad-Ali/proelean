<template>
  <div class="container-xl">
    <h1 class="app-page-title">Analytics</h1>
    <div class="border-bottom my-3"></div>
    <AnalyticsCard />
    <Charts v-if="$store.getters.getSellerEarning.analytics" />
  </div>
</template>

<script>
import Charts from "@/components/Seller/Dashboard/Charts.vue";
import AnalyticsCard from "@/components/Seller/Analytics/Analytics-Card.vue";

export default {
  components: { AnalyticsCard, Charts },
};
</script>