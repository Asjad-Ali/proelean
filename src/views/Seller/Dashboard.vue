<template>
  <div class="container-xl" v-if="orders">
    <h1 class="app-page-title">Dashboard</h1>
    <!-- <CountDown /> -->
    <AppCard class="marginBottom" />

    <ActiveOrderCard v-if="orders.length > 0" class="margin" :orders="orders" />
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
import { useStore } from "vuex";
import { computed, onBeforeMount } from "@vue/runtime-core";
import ActiveOrderCard from "../../components/Seller/Dashboard/ActiveOrderCard.vue";
//import ActiveOrderFilter from "../../components/Seller/Dashboard/ActiveOrderFilter.vue";
// import CountDown from "../../components/Seller/Dashboard/CountDown.vue";

export default {
  components: { AppCard, AnalyticBoxes, Charts, ActionCards, ActiveOrderCard },
  setup() {
    const store = useStore();
    //const orders = ref([]);
    const sellerOrderURL = "seller/orders?status=";
    onBeforeMount(() => {
      store.dispatch("getEarnings");
      store.dispatch("myOrders", sellerOrderURL);
      //console.log("helo",orders.value)
    });
    return {
      /////   Active Orders
      orders: computed(() =>
        store.getters.getMyOrders.filter((order) => order.status_id == 1)
      ),
    };
  },
};
</script>

<style scoped>
</style>