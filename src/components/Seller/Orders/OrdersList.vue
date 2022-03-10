<template>
  <div class="container-xl">
    <div class="row g-3 mb-3 align-items-center justify-content-between">
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
    <div class="border-bottom mb-3"></div>

    <nav
      id="orders-table-tab"
      class="
        orders-table-tab
        app-nav-tabs
        nav
        shadow-sm
        flex-column flex-sm-row
        mb-2
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
        @click="showFilter(0)"
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
              <div class="m-5 text-center" v-if="!orders.length > 0">
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
                  <tr v-for="order in orders" :key="order.id">
                    <td class="text-center cell">
                      <div>
                        <img
                          class="img-fluid bg-info rounded-circle mb-1"
                          style="width: 35px; height: 35px; object-fit: cover"
                          :src="`${imgURL}/${order.image}`"
                          alt="img"
                        />
                      </div>
                      <div>
                        {{ order.username }}
                      </div>
                    </td>
                    <td class="cell">
                      <span class="truncate">{{
                        order.description.substr(0, 50)
                      }}</span>
                    </td>
                    <td class="cell">
                      <span class="truncate">{{ order.created_at }}</span>
                    </td>
                    <td class="text-center cell">
                      <span class="truncate">{{ order.delivery_time }}</span>
                    </td>
                    <td class="text-center cell">
                      <span class="truncate">${{ order.amount }}</span>
                    </td>
                    <td class="text-center cell">
                      <a
                        ><span
                          class="badge bg-success"
                          v-if="order.status_id == 1"
                          >Active</span
                        ></a
                      >
                      <a
                        ><span
                          class="badge bg-secondary"
                          v-if="order.status_id == 2"
                          >Delivered</span
                        ></a
                      >
                      <a
                        ><span class="badge bg-info" v-if="order.status_id == 3"
                          >Revision</span
                        ></a
                      >
                      <a
                        ><span
                          class="badge bg-primary"
                          v-if="order.status_id == 4"
                          >Completed</span
                        ></a
                      >
                      <a
                        ><span
                          class="badge bg-danger"
                          v-if="order.status_id == 5"
                          >Disputed</span
                        ></a
                      >
                      <a
                        ><span
                          class="badge bg-warning"
                          v-if="order.status_id == 6"
                          >Late</span
                        ></a
                      >
                    </td>
                    <td class="cell">
                      <!-- Button trigger modal -->
                      <button
                        type="button"
                        class="btn btn-light"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        @click="getOrderNumber(order.orderNo)"
                      >
                        View
                      </button>

                      <!-- Modal -->
                      <div
                        class="modal fade"
                        id="exampleModal"
                        tabindex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog modal-dialog-centered">
                          <div class="modal-content" v-if="!orderSection">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">
                                Order Detail
                              </h5>
                            </div>
                            <div class="modal-body d-flex flex-column">
                              <div class="row">
                                <div class="col-2 text-dark">Order</div>
                                <div class="col-10">{{ order.orderNo }}</div>
                              </div>
                              <div class="row">
                                <div class="col-2 text-dark">Description</div>
                                <div class="col-10">
                                  {{ order.description }}
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-2 text-dark">Seller</div>
                                <div class="col-10">{{ order.username }}</div>
                              </div>
                              <div class="row">
                                <div class="col-2 text-dark">Price</div>
                                <div class="col-10">{{ order.amount }}</div>
                              </div>
                              <div class="row">
                                <div class="col-2 text-dark">Revisions</div>
                                <div class="col-10">{{ order.revision }}</div>
                              </div>
                              <div class="row">
                                <div class="col-2 text-dark">Duration</div>
                                <div class="col-10">
                                  {{ order.delivery_time }}
                                </div>
                              </div>
                            </div>
                            <div class="modal-footer">
                              <button
                                type="button"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                v-if="order.status_id == 1"
                                class="btn btn-danger"
                                @click="submitOrder()"
                              >
                                Dispute Order
                              </button>
                            </div>
                          </div>

                          <div class="modal-content" v-else>
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">
                                Order Detail
                              </h5>
                            </div>
                            <div class="modal-body">
                              <textarea
                                type="text"
                                class="form-control"
                                name="description"
                                v-model="orderType.description"
                                id="description"
                                placeholder="Type description"
                                required
                              />
                            </div>
                            <div class="modal-footer">
                              <button
                                type="button"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                v-if="order.status_id == 1"
                                class="btn btn-danger"
                                data-bs-dismiss="modal"
                                @click="manage_Order()"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- Modal End -->
                    </td>
                  </tr>
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
import { onMounted, computed, ref } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const sellerOrderURL = "seller/orders?status=";
    onMounted(() => {
      store.dispatch("myOrders", sellerOrderURL);
    });
    const orderSection = ref(false);
    const orderType = ref({
      order_no: "",
      type: 5,
      description: "i want to cancel the order",
      url: "seller/manage_order",
    });

    const singleOrder = ref({});
    const getOrderNumber = (number) => {
      orderType.value.order_no = number;
      singleOrder.value = store.getters.myOrders.filter(
        (order) => order.orderNo === number
      );
      console.log("order no", singleOrder.value);
    };

    function showFilter(value) {
      store.dispatch("myOrders", `${sellerOrderURL}${value}`);
    }
    function submitOrder() {
      orderSection.value = true;
    }
    function manage_Order() {
      console.log("manage order", orderType.value);
      store.dispatch("manageOrder", orderType.value);
    }

    return {
      imgURL: process.env.VUE_APP_URL,
      orders: computed(() => store.getters.myOrders),
      loader: computed(() => store.getters.getLoaderVal),
      showFilter,
      orderType,
      getOrderNumber,
      manage_Order,
      singleOrder,
      orderSection,
      submitOrder,
    };
  },
};
</script>

<style scoped>
.s-margin {
  margin-bottom: 8rem;
  margin-top: 5rem;
}
</style>