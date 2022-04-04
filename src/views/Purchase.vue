<template>
  <div class="main-page py-2">
    <div class="container-xl">
      <div>
        <h1 class="app-page-title">Confirm order and pay</h1>
      </div>
      <div class="border-bottom my-2"></div>
      <div class="row">
        <div class="col-md-7 col-lg-8">
          <div class="card p-4 shadow-none border">
            <h6 class="text-uppercase">Payment details</h6>
            <div class="border-bottom my-2"></div>
            <div class="row mb-2">
              <div class="col-md-6">
                <div class="position-relative">
                  <label>
                    Card Number <span class="text-danger">*</span>
                    <span
                      class="text-danger ml-1"
                      v-show="descriptionErrors.number"
                    >
                      {{ descriptionErrors.number }}
                    </span>
                  </label>
                  <input
                    type="number"
                    name="ATM_Number"
                    v-model="formData.paymentElements.number"
                    maxlength="16"
                    id="ATM_Number"
                    class="form-control input-alignment"
                    required="required"
                  />
                  <div class="position-absolute icons-top">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-credit-card"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"
                      />
                      <path
                        d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="position-relative">
                  <label
                    >CVC<span class="text-danger">*</span>
                    <span
                      class="text-danger ml-1"
                      v-show="descriptionErrors.cvc"
                    >
                      {{ descriptionErrors.cvc }}
                    </span>
                  </label>
                  <input
                    type="number"
                    class="form-control input-alignment"
                    name="cvc"
                    v-model="formData.paymentElements.cvc"
                    id="cvc"
                    maxlength="3"
                    required="required"
                  />
                  <div class="position-absolute icons-top">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-credit-card-2-back"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z"
                      />
                      <path
                        d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-6">
                <div class="position-relative">
                  <label>
                    Card Expiry Month <span class="text-danger">*</span>
                    <span
                      class="text-danger ml-1"
                      v-show="descriptionErrors.exp_month"
                    >
                      {{ descriptionErrors.exp_month }}
                    </span></label
                  >
                  <select
                    name="exp_month"
                    id="exp_month"
                    v-model="formData.paymentElements.exp_month"
                    class="form-control input-alignment"
                  >
                    <option value="" disabled>Select Month</option>
                    <option
                      :value="index+1"
                      v-for="(month, index) in months"
                      :key="month"
                      :selected="index+1 == formData.paymentElements.exp_month"
                    >
                      {{ month.name }}
                    </option>
                  </select>
                  <div class="position-absolute icons-top">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-stopwatch"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z"
                      />
                      <path
                        d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="position-relative">
                  <label
                    >Card Expiry Year <span class="text-danger">*</span>
                    <span
                      class="text-danger ml-1"
                      v-show="descriptionErrors.exp_year"
                    >
                      {{ descriptionErrors.exp_year }}
                    </span>
                  </label>
                  <select
                    name="expiryYear"
                    id="expiryYear"
                    v-model="formData.paymentElements.exp_year"
                    class="form-control input-alignment"
                  >
                    <option value=""  disabled>Select Year</option>
                    <option :value="currentYear+loopYear-1" v-for="loopYear in 8" :key="loopYear.index"
                    :selected="currentYear+loopYear-1 == formData.paymentElements.exp_year"
                    >
                      {{ currentYear + loopYear-1 }}
                    </option>
                  </select>
                  <div class="position-absolute icons-top">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-stopwatch"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z"
                      />
                      <path
                        d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="border-bottom my-2"></div>
            <div class="row mb-3">
              <div class="col-md-12">
                <label for=""
                  >Description <span class="text-danger">*</span>
                  <span
                    class="text-danger ml-1"
                    v-show="descriptionErrors.description"
                  >
                    {{ descriptionErrors.description }}
                  </span>
                </label>
                <textarea
                  type="text"
                  class="form-control"
                  name="description"
                  rows="3"
                  v-model="formData.descriptionData.description"
                  id="description"
                  placeholder="Type description"
                  required="required"
                />
              </div>
            </div>
            <div class="d-flex justify-content-end">
              <button
                class="btn btn-success px-3"
                :disabled="
                  !Object.values(descriptionErrors).every((value) => !value) ||
                  registerStatus == 2
                "
                @click="purchaseService()"
              >
                {{ registerStatus == 2 ? "Loading..." : "Pay" }}
              </button>
            </div>
          </div>
        </div>

        <div class="col-md-5 col-lg-4 right">
          <PackageDetail />
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import PackageDetail from "@/views/Buyer/PackageDetail.vue";
import useOrder from "@/composables/useOrder.js";
//import ServiceCard from "@/components/serviceDetail/ServiceCard.vue";
import { computed, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";

export default {
  components: {
    PackageDetail,
    // ServiceCard
  },
  setup() {
    const store = useStore();
    const currentYear = ref(new Date().getFullYear());
    const loopYear = ref(0);
    const months = ref([
      {name:"January"},
      {name:"February"},
      {name:"March"},
      {name:"April"},
      {name:"May"},
      {name:"June"},
      {name:"July"},
      {name:"August"},
      {name:"September"},
      {name:"October"},
      {name:"November"},
      {name:"December"},
    ]);
    const { formData, descriptionRegex, descriptionErrors, payload } =
      useOrder();

    onBeforeMount(store.dispatch("userSingleService", payload));

    function purchaseService() {
        console.log("formdata values: ", formData.value);
        if(!formData.value.descriptionData.description){
             descriptionErrors.value.description = "Description is required"
        }else {
            store.dispatch("purchaseService", formData.value);
        }
    }

    return {
      registerStatus: computed(() => store.getters.getRegisterStatus),
      formData,
      currentYear,
      loopYear,
      months,
      purchaseService,
      descriptionRegex,
      descriptionErrors,
      payload,
    };
  },
};
</script>


<style scoped>
.app-page-title {
  font-size: 1.5rem !important;
}

.icons-top {
  top: 33px;
  margin-left: 5px;
}

.input-alignment {
  padding-left: 25px;
}
</style>