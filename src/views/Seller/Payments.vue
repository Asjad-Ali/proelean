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
        <a href="#" class="btn app-btn-secondary my-2 m-md-0">
          <i class="mdi mdi-bank"></i>
          Bank Transfer</a
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
        <div class="app-card app-card-orders-table shadow-sm mb-5">
          <div class="app-card-body">
            <div class="table-responsive">
              <table class="table app-table-hover mb-0 text-left">
                <thead>
                  <tr>
                    <!-- <th class="cell">Sr#</th> -->
                    <!-- <th class="cell">Product</th> -->
                    <th class="cell">Name</th>
                    <th class="cell">Date</th>
                    <th class="cell text-center">Status</th>
                    <th class="cell">Total</th>
                    <th class="cell"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="withdraw in $store.getters.getWithdrawRequest" :key="withdraw.id">
                    <!-- <td class="cell">#15346</td>
                    <td class="cell">
                      <span class="truncate"
                        >Lorem ipsum dolor sit amet eget volutpat erat</span
                      >
                    </td>-->
                    <td class="cell">{{$store.getters.getAuthUser.username}}</td> 
                    <td class="cell">
                      <span>{{withdraw.created_at}}</span><span class="note">2:16 PM</span>
                    </td>
                    <td class="cell text-center">
                      <span class="badge bg-success">{{withdraw.status}}</span>
                    </td>
                    <td class="cell">${{withdraw.price}}</td>
                    <td class="cell">
                      <a class="btn-sm app-btn-secondary" href="#">View</a>
                    </td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
            <!--//table-responsive-->
          </div>
          <!--//app-card-body-->
        </div>
        <!--//app-card-->
        <!-- <nav class="app-pagination">
          <ul class="pagination justify-content-center">
            <li class="page-item disabled">
              <a class="page-link" href="#" tabindex="-1" aria-disabled="true"
                >Previous</a
              >
            </li>
            <li class="page-item active">
              <a class="page-link" href="#">1</a>
            </li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav> -->
        <!--//app-pagination-->
      </div>
      <!--//tab-pane-->

      <div
        class="tab-pane fade"
        id="orders-paid"
        role="tabpanel"
        aria-labelledby="orders-paid-tab"
      >
        <div class="app-card app-card-orders-table mb-5">
          <div class="app-card-body">
            <div class="table-responsive">
              <table class="table app-table-hover mb-0 text-left">
                <thead>
                  <tr>
                    <!-- <th class="cell">Sr#</th> -->
                    <!-- <th class="cell">Product</th> -->
                    <th class="cell">Name</th>
                    <th class="cell">Date</th>
                    <th class="cell text-center">Status</th>
                    <th class="cell">Total</th>
                    <th class="cell"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="withdraw in $store.getters.getWithdrawRequest" :key="withdraw.id">
                    <!-- <td class="cell">#15346</td>
                    <td class="cell">
                      <span class="truncate"
                        >Lorem ipsum dolor sit amet eget volutpat erat</span
                      >
                    </td>-->
                    <td class="cell">{{$store.getters.getAuthUser.username}}</td> 
                    <td class="cell">
                      <span>{{withdraw.created_at}}</span><span class="note">2:16 PM</span>
                    </td>
                    <td class="cell text-center">
                      <span class="badge bg-success">{{withdraw.status}}</span>
                    </td>
                    <td class="cell">${{withdraw.price}}</td>
                    <td class="cell">
                      <a class="btn-sm app-btn-secondary" href="#">View</a>
                    </td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
            <!--//table-responsive-->
          </div>
          <!--//app-card-body-->
        </div>
        <!--//app-card-->
      </div>
      <!--//tab-pane-->
    </div>
    <!--//tab-content-->
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();
    onMounted(store.dispatch("getWithdrawRequest"));
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