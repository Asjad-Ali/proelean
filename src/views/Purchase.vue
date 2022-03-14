<template>
<div class="main-page py-5">
<div class="container">
    <div class="mb-2">
       
        <h1 class="app-page-title">Confirm order and pay</h1>
        <span class="text-muted">please make the payment, after that you can enjoy all the features and benefits.</span>
    </div>
    <div class="row">
        <div class="col-md-8">
            <div class="card p-2 shadow-none" >
                <h6 class="text-uppercase">Payment details</h6>
                <div class="row">
                    <div class="col-md-6">
                        <div class="inputbox mt-3 mr-2"> <input type="number" name="ATM_Number"
                            v-model="formData[0].paymentElements.number"
                            id="ATM_Number" class="form-control" required="required">  <span> Card Number </span> </div>
                    </div>
                    <div class="col-md-6">
                        <div class="d-flex flex-row">
                            <div class="inputbox mt-3 mr-2"> <input type="number"
                            class="form-control"
                            name="cvc"
                            v-model="formData[0].paymentElements.cvc"
                            id="cvc" required="required"> <span>CVC</span> </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="inputbox mt-3 mr-2"> <input type="number" name="expiryMonth"
                            v-model="formData[0].paymentElements.exp_month"
                            id="expiryMonth"
                            class="form-control" required="required"> <span> Card Expiry Month</span> </div>
                    </div>
                    <div class="col-md-6">
                        <div class="d-flex flex-row">
                            <div class="inputbox mt-3 mr-2"> <input type="number" name="expiryYear"
                            v-model="formData[0].paymentElements.exp_year"
                            id="expiryYear" class="form-control" required="required"> <span>Card Expiry Year</span> </div>
                        </div>
                    </div>
                </div>

                <div class="mt-4 mb-4">
                    <h6 class="text-uppercase">Description Section</h6>
                    <div class="row ">
                        <div class="col-md-12">
                            <div class="inputbox mt-3 mr-2"> <textarea type="text"
                            class="form-control"
                            name="description"
                            v-model="formData[1].descriptionData.description"
                            id="description"
                            placeholder="Type description" required="required" /> </div>
                        </div>
                    </div>
                </div>

                <div class="mr-2 mb-1 d-flex justify-content-end"> 
               <button class="btn btn-success px-3" @click="purchaseService()">{{registerStatus == 2 ? 'Loading...' : 'Pay'}}</button> </div>

            </div>
        </div>

        <div class="col-md-4 col-lg-4 right">
            <PackageDetail/>
        </div>
    </div>
</div>
</div>
</template>



<script>
import PackageDetail from "./Buyer/PackageDetail.vue";
import { computed, onBeforeMount, ref } from "vue";
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
  components: { PackageDetail },
  setup() {
    const store = useStore()
    const route = useRoute();
    const payload = {
      id: route.params.id,
      type: "SERVICE_DETAIL",
    };
    
    onBeforeMount(store.dispatch("userSingleService", payload));
   
    const formData = ref([
        { 
            paymentElements: { 
            service_id:payload.id,
            number:4242424242424242,
            exp_month:6,
            exp_year:2022,
            cvc:123,}
        },
        { 
            descriptionData: {
            service_id:payload.id,
            description:'',
            token: ''}
        }
        ]);

    function purchaseService() {
        store.dispatch("purchaseService", formData.value);
        console.log("formdata values: ",formData.value);
    }

    return {
      registerStatus: computed(() => store.getters.getRegisterStatus),
      service: computed(() => store.getters.getSingleService),
      cardSection: computed(() => store.getters.getCardSection),
      formData,
      purchaseService,
    };
  },
};
</script>


<style scoped> 

 .app-page-title {
    font-size: 1.5rem !important;
}

 
 .app-btn-primary {
    background: #15a362;
    color: #fff;
    border-color: #15a362;
    font-weight: 400;
}
.form-control {
    border-bottom: 2px solid #eee !important;
    border: none;
    font-weight: 600
}

.form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color: #8bbafe;
    outline: 0;
    box-shadow: none;
    border-radius: 0px;
    border-bottom: 2px solid #15a362 !important
}

.inputbox {
    position: relative;
    margin-bottom: 20px;
    width: 100%
}

.inputbox span {
    position: absolute;
    top: 7px;
    left: 11px;
    transition: 0.5s
}

.inputbox i {
    position: absolute;
    top: 13px;
    right: 8px;
    transition: 0.5s;
    color: #3F51B5
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0
}

.inputbox input:focus~span {
    transform: translateX(-0px) translateY(-15px);
    font-size: 12px
}

.inputbox input:valid~span {
    transform: translateX(-0px) translateY(-15px);
    font-size: 12px
}
.svg-inline--fa.fa-w-18 {
 
    position: absolute;
    top: 10px;
    margin-left: -8px;
        color: deeppink;
} 
.app-btn-primary:hover {
    color: #fff;
    background: #18ba70;
    border-color: #18ba70;
}
  
 
</style>