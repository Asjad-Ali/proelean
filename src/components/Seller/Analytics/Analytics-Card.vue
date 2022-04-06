<template>
  <div class="row g-4 mb-4">
    <div class="col-6 col-lg-4 mb-4">
      <div class="app-card app-card-stat shadow-sm h-100">
        <div class="app-card-body p-3 p-lg-4">
          <h4 class="stats-type mb-1">Current Balance</h4>
          <div class="stats-figure">€{{ earningDetails.current_balance }}</div>
        </div>
        <!--//app-card-body-->
        <a class="app-card-link-mask" href="#"></a>
      </div>
      <!--//app-card-->
    </div>
    <!--//col-->
    <div class="col-6 col-lg-4 mb-4">
      <div class="app-card app-card-stat shadow-sm h-100">
        <div class="app-card-body p-3 p-lg-4">
          <h4 class="stats-type mb-1">Earning This Week</h4>
          <div class="stats-figure">€{{ earningDetails.weekly_earning }}</div>
        </div>
        <!--//app-card-body-->
        <a class="app-card-link-mask" href="#"></a>
      </div>
      <!--//app-card-->
    </div>
    <!--//col-->
    <div class="col-6 col-lg-4 mb-4">
      <div class="app-card app-card-stat shadow-sm h-100">
        <div class="app-card-body p-3 p-lg-4">
          <h4 class="stats-type mb-1">Earning This Month</h4>
          <div class="stats-figure">€{{ earningDetails.monthly_earning }}</div>
        </div>
        <!--//app-card-body-->
        <a class="app-card-link-mask" href="#"></a>
      </div>
      <!--//app-card-->
    </div>
    <!--//col-->
    <div class="col-6 col-lg-4 mb-4">
      <div class="app-card app-card-stat shadow-sm h-100">
        <div class="app-card-body p-3 p-lg-4">
          <h4 class="stats-type mb-1">Active Orders</h4>
<<<<<<< HEAD
          <div class="stats-figure">{{ analytics.active_orders }}</div>
=======
          <div class="stats-figure">{{analytic.active_orders}} (€{{ analytic.active_orders_balance }})</div>
>>>>>>> 250c278e952485d716ccacf9433cd6e134db1f99
        </div>
        <!--//app-card-body-->
        <a class="app-card-link-mask" href="#"></a>
      </div>
      <!--//app-card-->
    </div>
    <!--//col-->
    <div class="col-6 col-lg-4 mb-4">
      <div class="app-card app-card-stat shadow-sm h-100">
        <div class="app-card-body p-3 p-lg-4">
          <h4 class="stats-type mb-1">Earning This Year</h4>
          <div class="stats-figure">€{{ earningDetails.year_earning }}</div>
        </div>
        <!--//app-card-body-->
        <a class="app-card-link-mask" href="#"></a>
      </div>
      <!--//app-card-->
    </div>
    <!--//col-->
    <div class="col-6 col-lg-4 mb-4">
      <div class="app-card app-card-stat shadow-sm h-100">
        <div class="app-card-body p-3 p-lg-4">
          <h4 class="stats-type mb-1">Total Earning</h4>
          <div class="stats-figure">
<<<<<<< HEAD
            €{{ earningDetails.total_earning }}
=======
            {{analytic.cancelled_orders}} (€{{ analytic.cancelled_orders_balance }})
>>>>>>> 250c278e952485d716ccacf9433cd6e134db1f99
          </div>
        </div>
        <!--//app-card-body-->
        <a class="app-card-link-mask" href="#"></a>
      </div>
      <!--//app-card-->
    </div>
    <!--//col-->
  </div>

  <!-- <div class="row">
    <div class="col-12 col-lg-12 ">
      <div class="app-card app-card-chart h-100 shadow-sm">
        <div class="app-card-header p-3">
          <div class="row justify-content-between align-items-center">
            <div class="col-auto">
              <h4 class="app-card-title">Bar Chart Example</h4>
            </div>
        
            <div class="col-auto">
              <div class="card-header-action">
                <a href="charts.html">More charts</a>
              </div>
          
            </div>
        
          </div>
       
        </div>
    
        <div class="app-card-body p-3 p-lg-4">
          <div class="mb-3 d-flex">
            <select
              class="form-select form-select-sm ms-auto d-inline-flex w-auto"
            >
              <option value="1" selected>This week</option>
              <option value="2">Today</option>
              <option value="3">This Month</option>
              <option value="3">This Year</option>
            </select>
          </div>
          <div class="chart-container">
            <canvas id="canvas-barchart"></canvas>
          </div>
        </div>
      
      </div>
      
    </div>
</div> -->
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    return {
      earningDetails: computed(() => store.getters.getSellerEarningDetails),
      analytics: computed(() => store.getters.getSellerEarning),
    };
  },
};
</script>

<style>
</style>