<template>
  <div class="container-xl">
    <h1 class="app-page-title">Overview</h1>
    <AppCard />
    <AnalyticBoxes />
    <Charts />
    <StatsSection />
    <ActionCards />
  </div>
</template>

<script>
import AppCard from "../../components/Seller/Dashboard/AppCard.vue";
import AnalyticBoxes from "../../components/Seller/Dashboard/AnalyticBoxes.vue";
import Charts from "../../components/Seller/Dashboard/Charts.vue";
import StatsSection from "../../components/Seller/Dashboard/StatsSection.vue";
import ActionCards from "../../components/Seller/Dashboard/ActionCards.vue";

export default {
  components:{ AppCard, AnalyticBoxes, Charts, StatsSection, ActionCards }
}
</script>