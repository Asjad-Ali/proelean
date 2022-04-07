<template>
     <!---------------------     Modal    ---------------------->
            <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Purchase Service</h5> 
                    </div>
                    <div class="modal-body text-center">      
                        <!-- <div class="text-left font ">Description</div> -->
                        <!-- <textarea
                        type="text"
                        class="form-control"
                        name="description"
                        v-model="paymentElements.description"
                        id="description"
                        placeholder="Describe your request"
                        required
                        /> -->
                        <div class="text-left font">ATM Number</div>
                        <input
                        type="number"
                        class="form-control"
                        name="ATM_Number"
                        v-model="payload.number"
                        id="ATM_Number"
                        placeholder="Enter 16 characters of your ATM Number "
                        required
                        />
                        <div class="text-left font mt-2">Card Expiry Month</div>
                        <input
                        type="number"
                        class="form-control"
                        name="expiryMonth"
                        v-model="payload.exp_month"
                        id="expiryMonth"
                        placeholder="Enter Card Expiry Month"
                        required
                        />
                        <div class="text-left font mt-2">Card Expiry Year</div>
                        <input
                        type="number"
                        class="form-control"
                        name="expiryYear"
                        v-model="payload.exp_year"
                        id="expiryYear"
                        placeholder="Enter Card Expiry Year"
                        required
                        />
                        <div class="text-left font mt-2">CVC</div>
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
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal" @click="handleCustomerDetail">Continue</button>
                    </div>
                </div>
            </div>
            </div>
            <!---------------------    Modal End     --------------------->
</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
export default {
    setup() {

        const store = useStore();

        const payload = ref({
            number: 4242424242424242,
            exp_month: 2,
            exp_year: 2023,
            cvc: 123
        })

        const handleCustomerDetail = (e) => {
            e.preventDefault();
            document.getElementById('accept_offer').innerText = "Loading...";
            store.dispatch('purchaseOfferedService',payload.value).then(()=>{
                document.getElementById('accept_offer').innerText = "Offer accepted";
            })
        }
        return {
            payload,
            handleCustomerDetail
        }
    }
}
</script>
