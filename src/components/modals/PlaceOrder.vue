<template>
  <!---------------------     Modal    ---------------------->
  <div
    class="modal fade"
    id="placeorder"
    data-backdrop="static"
    data-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Purchase Service</h5>
        </div>
        <div class="modal-body text-center">
          <div class="text-left font">
            ATM Number
            <span class="ml-2 text-danger">{{ payloadErrorBag.number }}</span>
          </div>
          <input
            type="number"
            class="form-control"
            name="ATM_Number"
            v-model="payload.number"
            id="ATM_Number"
            placeholder="Enter 16 characters of your ATM Number "
            required
          />
          <div class="text-left font mt-2">
            Card Expiry Month
            <span class="ml-2 text-danger">{{
              payloadErrorBag.exp_month
            }}</span>
          </div>
          <input
            type="number"
            class="form-control"
            name="expiryMonth"
            v-model="payload.exp_month"
            id="expiryMonth"
            placeholder="Enter Card Expiry Month"
            required
          />
          <div class="text-left font mt-2">
            Card Expiry Year
            <span class="ml-2 text-danger">{{ payloadErrorBag.exp_year }}</span>
          </div>
          <input
            type="number"
            class="form-control"
            name="expiryYear"
            v-model="payload.exp_year"
            id="expiryYear"
            placeholder="Enter Card Expiry Year"
            required
          />
          <div class="text-left font mt-2">
            CVC
            <span class="ml-2 text-danger">{{ payloadErrorBag.cvc }}</span>
          </div>
          <input
            type="number"
            class="form-control"
            name="cvc"
            v-model="payload.cvc"
            id="cvc"
            placeholder="Enter CVC"
            required
          />
        </div>
        <div class="modal-footer d-flex justify-content-center">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-danger"
            data-dismiss="modal"
            @click="handleCustomerDetail($event, offerId)"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  </div>
  <!---------------------    Modal End     --------------------->
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { watch } from "@vue/runtime-core";
export default {
  props: {
    offerId: {
      required: true,
      type: String,
    },
  },
  setup() {
    const store = useStore();
    const d = new Date();

    const payload = ref({
      number: 4242424242424242,
      exp_month: 2,
      exp_year: 2022,
      cvc: 123,
    });

    const payloadErrorBag = ref({
      number: "",
      exp_month: "",
      exp_year: "",
      cvc: "",
    });

    watch(payload.value, (value) => {
      if (!value.number) {
        payloadErrorBag.value.number = "please enter a valid card number";
      }
      if (value.number.toString().length < 16) {
        payloadErrorBag.value.number = "card number must contain 16 digits";
      } else {
        payloadErrorBag.value.number = "";
      }

      if (!value.exp_month) {
        payloadErrorBag.value.exp_month = "please enter a valid expiry month";
      }
      if (value.exp_month < d.getMonth()) {
        payloadErrorBag.value.exp_year = "please enter a valid expiry month";
      } else {
        payloadErrorBag.value.exp_month = "";
      }

      if (!value.exp_year) {
        payloadErrorBag.value.exp_year = "please enter a valid expiry year";
      }
      if (value.exp_year < d.getFullYear()) {
        payloadErrorBag.value.exp_year = "please enter a valid expiry year";
      } else {
        payloadErrorBag.value.exp_year = "";
      }

      if (!value.cvc || value.cvc.toString().length < 3) {
        payloadErrorBag.value.cvc = "please enter a valid cvc";
      } else {
        payloadErrorBag.value.cvc = "";
      }
    });

    const handleCustomerDetail = (e, offerID) => {
      e.preventDefault();
     
      store
        .dispatch("purchaseJobOfferedService", [payload.value, offerID])
        .then(() => {
          
        });
    };
    return {
      payload,
      payloadErrorBag,
      handleCustomerDetail,
    };
  },
};
</script>
