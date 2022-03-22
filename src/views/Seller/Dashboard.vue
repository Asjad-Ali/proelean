<template>
  <div class="container-xl">
    <h1 class="app-page-title">Dashboard</h1>
  <!-- <CountDown /> -->
    <AppCard />
  <ActiveOrderFilter/>
    <ActiveOrderCard/>
    <ActiveOrderCard/>
    <ActiveOrderCard/>
    <AnalyticBoxes />
    <Charts v-if="$store.getters.getSellerEarning.analytics" />
    <!-- <StatsSection /> -->
    <ActionCards />
  </div>
</template>

<script>  
import AppCard from "../../components/Seller/Dashboard/AppCard.vue";
import AnalyticBoxes from "../../components/Seller/Dashboard/AnalyticBoxes.vue";
import Charts from "../../components/Seller/Dashboard/Charts.vue";
// import StatsSection from "../../components/Seller/Dashboard/StatsSection.vue";
import ActionCards from "../../components/Seller/Dashboard/ActionCards.vue";
import { useStore } from 'vuex';
import { onMounted } from '@vue/runtime-core';
import ActiveOrderCard from "../../components/Seller/Dashboard/ActiveOrderCard.vue";
import ActiveOrderFilter from "../../components/Seller/Dashboard/ActiveOrderFilter.vue";
// import CountDown from "../../components/Seller/Dashboard/CountDown.vue";

export default {
  components:{ AppCard, AnalyticBoxes, Charts, ActionCards, ActiveOrderCard, ActiveOrderFilter },
  setup() {
    const store = useStore();
    onMounted(store.dispatch('getEarnings'));
  }
}
</script>