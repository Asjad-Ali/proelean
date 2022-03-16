<template>
<div class="main-page py-5">
<div class="container">
    <div class="mb-2">
       
        <h1 class="app-page-title">Confirm order and pay</h1>
       
    </div>
    <div class="row">
        <div class="col-md-8">
            <div class="card p-2 shadow-none border" >
                <h6 class="text-uppercase py-3">Payment details</h6>
                <div class="row">
                    <div class="col-md-6">
                        <div class="inputbox mt-3 mr-2 position-relative"> 
                            <input type="number" name="ATM_Number"
                            v-model="formData.paymentElements.number"
                            id="ATM_Number" class="form-control input-alignment" required="required">  <span> Card Number </span> 
                                    <div class="position-absolute icons-top">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-credit-card" viewBox="0 0 16 16">
                                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/>
                                  <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"/>
                                </svg>
                            </div>
                            <div class="text-danger mt-1" v-show="descriptionErrors.number">
                                  {{ descriptionErrors.number }}
                                </div>
                            </div>
                    
                    </div>
                    <div class="col-md-6">
                        <div class="d-flex flex-row">
                            <div class="inputbox mt-3 mr-2 position-relative"> <input type="number"
                            class="form-control input-alignment"
                            name="cvc"
                            v-model="formData.paymentElements.cvc"
                            id="cvc" required="required"> <span>CVC</span> 
                            <div class="position-absolute icons-top">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-credit-card-2-back" viewBox="0 0 16 16">
                                  <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z"/>
                                  <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z"/>
                                </svg>
                            </div>
                            <div class="text-danger mt-1" v-show="descriptionErrors.cvc">
                                  {{ descriptionErrors.cvc }}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="inputbox mt-3 mr-2 position-relative"> <input type="number" name="expiryMonth"
                            v-model="formData.paymentElements.exp_month"
                            id="expiryMonth"
                            class="form-control input-alignment" required="required"> <span> Card Expiry Month</span> 
                               <div class="position-absolute icons-top">
                               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stopwatch" viewBox="0 0 16 16">
                                <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z"/>
                                <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z"/>
                                </svg>
                            </div>
                            <div class="text-danger mt-1" v-show="descriptionErrors.exp_month">
                                  {{ descriptionErrors.exp_month }}
                                </div>
                            </div>
                    </div>
                    <div class="col-md-6">
                        <div class="d-flex flex-row">
                            <div class="inputbox mt-3 mr-2 position-relative"> <input type="number" name="expiryYear"
                            v-model="formData.paymentElements.exp_year"
                            id="expiryYear" class="form-control input-alignment" required="required"> <span>Card Expiry Year</span>
                               <div class="position-absolute icons-top">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stopwatch" viewBox="0 0 16 16">
                                <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z"/>
                                <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z"/>
                                </svg>
                            </div>
                            <div class="text-danger mt-1" v-show="descriptionErrors.exp_year">
                                  {{ descriptionErrors.exp_year }}
                                </div>
                             </div>
                        </div>
                    </div>
                </div>

                <div class="mt-4 mb-4">
                    <h6 class="text-uppercase">Description Section</h6>
                    <div class="row ">
                        <div class="col-md-12">
                            <div class="inputbox mt-3 mr-2"> 
                                <textarea type="text"
                                class="form-control input-alignment"
                                name="description"
                                v-model="formData.descriptionData.description"
                                id="description"
                                placeholder="Type description" required="required" />
                                <div class="text-danger mt-1" v-show="descriptionErrors.description">
                                  {{ descriptionErrors.description }}
                                </div>
                             </div>
                        </div>
                    </div>
                </div>

                <div class="mr-2 mb-1 d-flex justify-content-end">
                <!-- <router-link
                  :to="{ name: 'Chat', params: { id: `${service.service_user.id}` } }"
                > -->
                <button class="btn btn-success px-3" :disabled="!Object.values(descriptionErrors).every((value) => !value) || registerStatus == 2"
                @click="purchaseService()">{{registerStatus == 2 ? 'Loading...' : 'Pay'}}</button>
                <!-- </router-link> -->
                </div>
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
import PackageDetail from "@/views/Buyer/PackageDetail.vue";
import useOrder from '@/composables/useOrder.js'
//import ServiceCard from "@/components/serviceDetail/ServiceCard.vue";
import { computed, onBeforeMount } from "vue";
import { useStore } from 'vuex';

export default {
  components: { 
    PackageDetail,
    // ServiceCard 
    },
  setup() {
    const store = useStore()
    const { formData,
          descriptionRegex,
          descriptionErrors,
          payload } = useOrder();
    
    onBeforeMount(store.dispatch("userSingleService", payload));
   
    function purchaseService() {
        store.dispatch("purchaseService", formData.value)
        console.log("formdata values: ",formData.value);
    }

    return {
      registerStatus: computed(() => store.getters.getRegisterStatus),
      formData,
      purchaseService,
      descriptionRegex,
      descriptionErrors,
      payload
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
    left: 30px;
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
 .icons-top{
     top:6px;
     margin-right: 10px;
 } 
 .icons-top svg{
     color: #0000F8;
  
 } 

 .input-alignment{
     padding-left: 30px;
 }
 
</style>