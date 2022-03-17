<template>
  <!-- Confirmation Modal -->
  <div
    class="modal fade"
    id="exampleModalCenter"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header d-flex justify-content-center">
          <h5 class="modal-title" id="exampleModalLongTitle">Custom Offer</h5>
        </div>
        <div class="modal-body text-center">
            <select
            id="deliveryTime"
            class="form-control"
            name="delivery_time"
            v-model="payload.service_id"
            required
          >
            <option selected>Select service</option>
            <option
              v-for="service in $store.getters.getUserServices"
              :value="service.id"
              :key="service.id"
            >
              {{ service.s_description }}
            </option>
          </select>
          <div class="text-left font">Describe your offer</div>
          <textarea
            type="text"
            class="form-control"
            name="description"
            v-model="payload.description"
            id="description"
            placeholder="Describe your offer"
            required
          />
          <div class="text-left font mt-2">Total Price</div>
          <input
            type="number"
            class="form-control"
            name="price"
            v-model="payload.price"
            id="price"
            placeholder="Total Offer(EUR)"
            required
          />
          <div class="text-left font mt-2">Delivery Time</div>
          <select
            id="deliveryTime"
            class="form-control"
            name="delivery_time"
            v-model="payload.delivery_time"
            required
          >
            <option selected>Select day</option>
            <option
              v-for="day in $store.getters.getDeliveryDays"
              :value="day"
              :key="day.index"
            >
              {{ day }}
            </option>
          </select>
        </div>
        <div class="modal-footer d-flex justify-content-center">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            No
          </button>
          <button
            type="button"
            class="btn btn-danger"
            data-dismiss="modal"
            @click.prevent="deleteService"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
    setup() {
        const store = useStore()
        store.dispatch('userServices');
        store.dispatch('getCountriesLanguage');
        const payload = {
            description: '',
            price: '',
            delivery_time: ''
        }

        return {
            payload
        }
    }
}
</script>

<style>

</style>