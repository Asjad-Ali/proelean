<template>
  <div class="container-xl">
    <div class="row">
      <div class="col-md-3 col-12">
        <h1 class="app-page-title mb-1" data-v-d1f2b3da="">Payments</h1>
      </div>
      <div class="col-md-4 col-8">
        <input
          type="text"
          id="search-orders"
          name="searchorders"
          class="form-control search-orders"
          placeholder="Search"
          data-v-d1f2b3da=""
        />
      </div>
      <div class="col-md-2 col-4">
        <select class="form-select" data-v-d1f2b3da="">
          <option selected="" value="option-1" data-v-d1f2b3da="">All</option>
          <option value="option-2" data-v-d1f2b3da="">This week</option>
          <option value="option-3" data-v-d1f2b3da="">This month</option>
          <option value="option-4" data-v-d1f2b3da="">Last 3 months</option>
        </select>
      </div>
      <div class="col-md-3 col-12 text-right">
        <router-link to="/dashboard/bank-attachment" class="btn app-btn-secondary my-2 m-md-0">
          <i class="mdi mdi-bank"></i>
          Bank Transfer</router-link
        >
      </div>
    </div>
    <div class="border-bottom my-3"></div>
    <!--//row-->
    <div class="tab-content" id="orders-table-tab-content">
      <div
        class="tab-pane fade show active"
        id="orders-all"
        role="tabpanel"
        aria-labelledby="orders-all-tab"
      >
        <div v-if="loader" class="d-flex justify-content-center s-margin">
          <div class="spinner-border text-primary m-2" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <div class="app-card app-card-orders-table shadow-sm mb-5" v-else>
          <div class="app-card-body">
            <div class="table-responsive">
              <table class="table app-table-hover mb-0 text-left">
                <thead>
                  <tr>
                    <th class="cell">Name</th>
                    <th class="cell">Date</th>
                    <th class="cell text-center">Status</th>
                    <th class="cell">Total</th>
                    <th class="cell"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(withdraw,index) in $store.getters.getWithdrawRequest"
                    :key="index"
                  >
                    <td class="cell">
                      {{ $store.getters.getAuthUser.username }}
                    </td>
                    <td class="cell">
                      <span>{{ withdraw.created_at }}</span
                      ><span class="note">2:16 PM</span>
                    </td>
                    <td class="cell text-center">
                      <span class="badge bg-success">{{
                        withdraw.status
                      }}</span>
                    </td>
                    <td class="cell">${{ withdraw.amount }}</td>
                    <td class="cell">
                      <a class="btn-sm app-btn-secondary" href="#">View</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    onMounted(store.dispatch("getWithdrawRequest"));

    return {
      loader: computed(() =>
        store.getters.getPaymentLoadingStatus === "LOADING" ? true : false
      ),
    };
  },
};
</script>

<style scoped>
.s-margin {
  margin-bottom: 8rem;
  margin-top: 5rem;
}
.form-control {
  padding: 18px 10px !important;
}
</style>