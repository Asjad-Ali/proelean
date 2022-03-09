<template>
  <div class="container-xl">
    <div class="row g-3 mb-4 align-items-center justify-content-between">
      <div class="col-auto">
        <h1 class="app-page-title mb-0">Orders</h1>
      </div>
      <div class="col-auto">
        <div class="page-utilities">
          <div
            class="
              row
              g-2
              justify-content-start justify-content-md-end
              align-items-center
            "
          >
            <div class="col-auto">
              <form class="table-search-form row gx-1 align-items-center">
                <div class="col-auto">
                  <input
                    type="text"
                    id="search-orders"
                    name="searchorders"
                    class="form-control search-orders"
                    placeholder="Search"
                  />
                </div>
                <div class="col-auto">
                  <button type="submit" class="btn app-btn-secondary">
                    Search
                  </button>
                </div>
              </form>
            </div>
            <!--//col-->
            <div class="col-auto">
              <select class="form-select w-auto">
                <option selected value="option-1">All</option>
                <option value="option-2">This week</option>
                <option value="option-3">This month</option>
                <option value="option-4">Last 3 months</option>
              </select>
            </div>
            <div class="col-auto">
              <a class="btn app-btn-secondary" href="#">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-download me-1"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"
                  />
                </svg>
                Download CSV
              </a>
            </div>
          </div>
          <!--//row-->
        </div>
        <!--//table-utilities-->
      </div>
      <!--//col-auto-->
    </div>
    <!--//row-->

    <nav
      id="orders-table-tab"
      class="
        orders-table-tab
        app-nav-tabs
        nav
        shadow-sm
        flex-column flex-sm-row
        mb-4
      "
    >
      <a
        class="flex-sm-fill text-sm-center nav-link active"
        id="orders-all-tab"
        data-bs-toggle="tab"
        href="#orders-all"
        role="tab"
        aria-controls="orders-all"
        aria-selected="true"
        @click="showAll()"
        >All</a
      >
      <a
        class="flex-sm-fill text-sm-center nav-link"
        id="orders-paid-tab"
        data-bs-toggle="tab"
        href="#orders-all"
        role="tab"
        aria-controls="orders-paid"
        aria-selected="false"
        @click="showFilter(4)"
        >Completed</a
      >
      <a
        class="flex-sm-fill text-sm-center nav-link"
        id="orders-pending-tab"
        data-bs-toggle="tab"
        href="#orders-all"
        role="tab"
        aria-controls="orders-pending"
        aria-selected="false"
        @click="showFilter(1)"
        >Active</a
      >
      <a
        class="flex-sm-fill text-sm-center nav-link"
        id="orders-pending-tab"
        data-bs-toggle="tab"
        href="#orders-all"
        role="tab"
        aria-controls="orders-pending"
        aria-selected="false"
        @click="showFilter(2)"
        >Delivered</a
      >
      <a
        class="flex-sm-fill text-sm-center nav-link"
        id="orders-pending-tab"
        data-bs-toggle="tab"
        href="#orders-all"
        role="tab"
        aria-controls="orders-pending"
        aria-selected="false"
        @click="showFilter(3)"
        >Revision</a
      >
      <a
        class="flex-sm-fill text-sm-center nav-link"
        id="orders-pending-tab"
        data-bs-toggle="tab"
        href="#orders-all"
        role="tab"
        aria-controls="orders-pending"
        aria-selected="false"
        @click="showFilter(6)"
        >Late</a
      >
      <a
        class="flex-sm-fill text-sm-center nav-link"
        id="orders-cancelled-tab"
        data-bs-toggle="tab"
        href="#orders-all"
        role="tab"
        aria-controls="orders-cancelled"
        aria-selected="false"
        @click="showFilter(5)"
        >Disputed</a
      >
    </nav>

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
        <div v-else class="app-card app-card-orders-table shadow-sm mb-5">
          <div class="app-card-body">
            <div class="table-responsive">
              <div class="m-5 text-center" v-if="!orders.length>0">
                <h4>No Any Orders Available in this Field</h4>
              </div>
              <table v-else class="table app-table-hover mb-0 p-1 text-left">
                <thead>
                  <tr>
                    <th class="cell">User</th>
                    <th class="cell">Order Description</th>
                    <th class="cell">Duration</th>
                    <th class="cell">Post Date</th>
                    <th class="cell">Budget</th>
                    <th class="cell">Status</th>
                    <th class="cell"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(order) in orders" :key="order.id">
                      <td class="text-center cell">
                        <div>
                          <img
                            class="img-fluid bg-info rounded-circle mb-1"
                            style="width: 35px; height: 35px; object-fit:cover;"
                            :src="`${imgURL}/${order.image}`"
                            alt="img"
                          />
                        </div>
                        <div>
                        {{ order.username }}
                        </div>
                      </td>
                    <td class="cell">
                      <span class="truncate"
                        >{{order.description.substr(0,50)}}</span>
                    </td>
                      <td class="cell"><span class="truncate">{{ order.created_at }}</span> </td>
                      <td class="text-center cell"><span class="truncate">{{ order.delivery_time }}</span> </td>
                      <td class="text-center cell"><span class="truncate">${{ order.amount }}</span> </td>
                    <td class="text-center cell">
                      <a href="#"><span class="badge bg-success" v-if="order.status_id == 1">Active</span></a>
                      <a href="#"><span class="badge bg-secondary" v-if="order.status_id == 2">Delivered</span></a>
                      <a href="#"><span class="badge bg-info" v-if="order.status_id == 3">Revision</span></a>
                      <a href="#"><span class="badge bg-primary" v-if="order.status_id == 4">Completed</span></a>
                      <a href="#"><span class="badge bg-danger" v-if="order.status_id == 5">Disputed</span></a>
                      <a href="#"><span class="badge bg-warning" v-if="order.status_id == 6">Late</span></a>
                    </td>
                    <td class="cell">
                      <a class="btn-sm app-btn-secondary" href="#">View</a>
                    </td>
                  </tr>
<!--                   
                  <tr>
                    <td class="cell">#15345</td>
                    <td class="cell">
                      <span class="truncate">Consectetur adipiscing elit</span>
                    </td>
                    <td class="cell">Dylan Ambrose</td>
                    <td class="cell">
                      <span class="cell-data">16 Oct</span
                      ><span class="note">03:16 AM</span>
                    </td>
                    <td class="cell">
                      <span class="badge bg-warning">Pending</span>
                    </td>
                    <td class="cell">$96.20</td>
                    <td class="cell">
                      <a class="btn-sm app-btn-secondary" href="#">View</a>
                    </td>
                  </tr>
                  <tr>
                    <td class="cell">#15344</td>
                    <td class="cell">
                      <span class="truncate">Pellentesque diam imperdiet</span>
                    </td>
                    <td class="cell">Teresa Holland</td>
                    <td class="cell">
                      <span class="cell-data">16 Oct</span
                      ><span class="note">01:16 AM</span>
                    </td>
                    <td class="cell">
                      <span class="badge bg-success">Paid</span>
                    </td>
                    <td class="cell">$123.00</td>
                    <td class="cell">
                      <a class="btn-sm app-btn-secondary" href="#">View</a>
                    </td>
                  </tr>

                  <tr>
                    <td class="cell">#15343</td>
                    <td class="cell">
                      <span class="truncate"
                        >Vestibulum a accumsan lectus sed mollis ipsum</span
                      >
                    </td>
                    <td class="cell">Jayden Massey</td>
                    <td class="cell">
                      <span class="cell-data">15 Oct</span
                      ><span class="note">8:07 PM</span>
                    </td>
                    <td class="cell">
                      <span class="badge bg-success">Paid</span>
                    </td>
                    <td class="cell">$199.00</td>
                    <td class="cell">
                      <a class="btn-sm app-btn-secondary" href="#">View</a>
                    </td>
                  </tr>

                  <tr>
                    <td class="cell">#15342</td>
                    <td class="cell">
                      <span class="truncate">Justo feugiat neque</span>
                    </td>
                    <td class="cell">Reina Brooks</td>
                    <td class="cell">
                      <span class="cell-data">12 Oct</span
                      ><span class="note">04:23 PM</span>
                    </td>
                    <td class="cell">
                      <span class="badge bg-danger">Cancelled</span>
                    </td>
                    <td class="cell">$59.00</td>
                    <td class="cell">
                      <a class="btn-sm app-btn-secondary" href="#">View</a>
                    </td>
                  </tr>

                  <tr>
                    <td class="cell">#15341</td>
                    <td class="cell">
                      <span class="truncate"
                        >Morbi vulputate lacinia neque et sollicitudin</span
                      >
                    </td>
                    <td class="cell">Raymond Atkins</td>
                    <td class="cell">
                      <span class="cell-data">11 Oct</span
                      ><span class="note">11:18 AM</span>
                    </td>
                    <td class="cell">
                      <span class="badge bg-success">Paid</span>
                    </td>
                    <td class="cell">$678.26</td>
                    <td class="cell">
                      <a class="btn-sm app-btn-secondary" href="#">View</a>
                    </td>
                  </tr> -->
                </tbody>
              </table>
            </div>
            <!--//table-responsive-->
          </div>
          <!--//app-card-body-->
        </div>
     </div>
     </div>

  </div>
</template>

<script>
import { onMounted, computed } from "@vue/runtime-core";
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore()
    onMounted(() => {
      store.dispatch("myOrders");
    })

    function showAll(){
      store.dispatch("myOrders");
    }

    function showFilter(value){
      store.dispatch("showFilteredOrders",value);
    }

    return {
      imgURL: process.env.VUE_APP_URL,
      orders: computed(() => store.getters.myOrders),
      loader: computed(() => store.getters.getLoaderVal),
      showFilter,
      showAll
    };
  },
};
</script>

<style scoped>
.s-margin{
  margin-bottom: 8rem;
  margin-top: 5rem ;
}
</style>