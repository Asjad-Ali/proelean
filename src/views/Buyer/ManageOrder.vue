<template>
  <div class="main-page second pt-3">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="d-flex align-items-center justify-content-between mb-3 border-bottom">
            <h3 class="font-weight-bold mb-3">Orders</h3>            
              <select class="form-select form-control-sm" aria-label="Default select example"  @change="showFilter" id="ordersValue">
                <option :value="order.value" v-for="order in OrderSelectionType" :key="order.index">
                  {{ order.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    

        <!-- for mobile screen -->
       <div class="container tab-content osahan-table rounded d-sm-none">
        <div class="tab-pane active" id="active">
          <div v-if="loader" class="d-flex justify-content-center s-margin">
            <div class="spinner-border text-primary m-2" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <div v-else>
          <div v-if="orders.length > 0">
          <div
            v-for="order in orders"
            :key="order.id"
            class="card d-md-none shadow-sm border-primary"
          >
            <div class="card-body">
              <div class="d-flex justify-content-between">
              <span>
                <img
                   class="img-fluid bg-info rounded-circle mr-2"
                   style="width: 35px; height: 35px; object-fit:cover;"
                   :src="`${imgURL}/${order.image}`"
                   alt="user-image"
                  />
                <span> {{ order.username }} </span>
                </span>
                <span class="mt-2">{{ order.created_at }}</span>
              </div>
              <h5 class="card-title bg-light mt-3">{{ order.description }}</h5>
              <span class="text-muted"> <i class="fa fa-clock-o"></i>  Duration: </span> <span> {{ order.delivery_time }}</span>
              <span class="text-muted ml-5"> <i class="fa fa-usd"></i>  Budget: </span> <span> {{ order.amount }}</span>
              <div class="d-flex justify-content-end mt-2">
                <div>
                    <button class="btn btn-sm btn-primary w-100" v-if="order.status_id == 1"> Active </button>
                    <button class="btn btn-sm btn-primary w-100" v-if="order.status_id == 2"> Delivered </button>
                    <button class="btn btn-sm btn-primary w-100" v-if="order.status_id == 3"> Revision </button>
                    <button class="btn btn-sm btn-success w-100" v-if="order.status_id == 4"> Completed </button>
                    <button class="btn btn-sm btn-danger w-100" v-if="order.status_id == 5"> Disputed </button>
                    <button class="btn btn-sm btn-primary w-100" v-if="order.status_id == 6"> Late </button>
                </div>
                <span class="ml-2">
                  <router-link 
                  :to="{name:'OrderDetailsBuyer', params:order}"
                  class="btn btn-light">
                     View 
                  </router-link>
                </span>
              </div>
            </div>
          </div>
          </div>
            <div v-else class="text-center my-5">
              <h4>No More Orders Available</h4>
            </div>
          </div>
        </div>
      </div>



          <!-- For Web Screen -->
          <div  class="tab-content osahan-table rounded d-none d-sm-block container">
                <div v-if="loader" class="d-flex justify-content-center s-margin">
                  <div class="spinner-border text-primary m-2" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
            <div v-else class="tab-pane active" id="active">
                <div v-if="orders.length>0">
                  <div
                  class="table-responsive box-table mt-1 bg-white mb-5" 
                  >
                      <table class="table table-bordered" >
                        <thead>
                          <tr>
                            <th class="text-center">USERNAME</th>
                            <th>ORDER DESCRIPTION</th>
                            <th class="text-center">POSTED DATE</th>
                            <th class="text-center">DURATION</th>
                            <th class="text-center">BUDGET</th>
                            <th class="text-center">STATUS</th>
                            <th class="text-center">DETAILS</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="order in orders" :key="order.id">
                            <td class="text-center">
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
                            <td>
                                <p class="order-proposal-title ml-1">
                                  {{ order.description.substr(0, 50) }}
                                </p>
                            </td>
                            <td class="text-center">{{ order.created_at }}</td>
                            <td class="text-center">{{ order.delivery_time }}</td>
                            <td class="text-center">{{ order.amount }}.0{{ order.currency }}</td>
                            <td class="text-center">
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
                            <td class="text-center">
                               <router-link :to="{name:'OrderDetailsBuyer', params:order}"
                                class="btn btn-light">
                                View 
                              </router-link>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                  </div>
                </div>
                <div v-else class="container tab-content text-center py-5">
                  <h2>No Any Order Available</h2>
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
    const buyerOrderURL = "buyer/orders?status=";
    onMounted(() => {
      store.dispatch("myOrders", buyerOrderURL);
    });
    
    const OrderSelectionType =  [ 
      { value: 0, name:"All" },
      { value: 1, name:"Active" },
      { value: 2, name:"Delivered" },
      { value: 3, name:"Revision" },
      { value: 4, name:"Complete" },
      { value: 5, name:"Dispute" },
      { value: 6, name:"Late" },
    ]

    function showFilter() {
      let value = document.getElementById("ordersValue").value;
      console.log("value", value);
      store.dispatch("myOrders", `${buyerOrderURL}${value}`);
    }

    return {
      imgURL: process.env.VUE_APP_URL,
      orders: computed(() => store.getters.getMyOrders),
      loader: computed(() => store.getters.getLoaderVal),
      showFilter,
      OrderSelectionType,
    };
  },
};
</script>

<style scoped>


.s-margin{
  margin-bottom: 8rem;
  margin-top: 5rem ;
}
.badge {
    display: inline-block;
    padding: 0.35em 0.65em;
    font-size: 0.75em;
    font-weight: 700;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;
}
</style>