<template>
  <div class="main-page second py-5">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="d-flex align-items-center mb-3 pb-3 border-bottom">
            <h2 class="mb-0 p-0">Orders</h2>
            <router-link
              class="btn btn-sm btn-success ml-auto light"
              to="/create_job"
            >
              Place New Order
            </router-link>
          </div>

          <div
            class="
              tab-content
              osahan-table
              bg-white
              rounded
              shadow-sm
              px-3
              pt-1
            "
          >
            <div class="tab-pane active" id="active">
              <div class="table-responsive box-table mt-3">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>USERNAME</th>
                      <th>ORDER DESCRIPTION</th>
                      <th>POSTED DATE</th>
                      <th>DURATION</th>
                      <th>BUDGET</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="order in orders"
                      :key="order.buyer_id"
                    >
                      <td>
                        {{ order.username }}
                      </td>
                      <td>
                        <a href="#" class="make-black">
                          <p class="order-proposal-title">
                            {{ order.description }}
                          </p>
                        </a>
                      </td>
                      <td>{{ order.created_at }}</td>
                      <td>{{ order.delivery_time }}</td>
                      <td>{{ order.amount }}.0{{ order.currency }}</td>
                      <td> <button class="btn btn-sm btn-success"> Active </button> </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from '@vue/runtime-core'
import store from '../../store'
export default {
    setup(){
        onMounted(
            store.dispatch('showAllOrders')
        )
        // function deleteJob(id){
        // store.dispatch("deleteAJob",id);
        // }
      return {
      orders: computed(() => store.getters.getAllOrders),
      //deleteJob
    };
    }

}
</script>

<style>
</style>