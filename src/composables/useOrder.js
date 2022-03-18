import { computed, ref,watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default function useOrder() {

    const store = useStore();
    const route = useRoute();
    const payload = {
        id: route.params.id,
        type: "SERVICE_DETAIL",
    };

    const order = {
      id: route.params.id,
      orderNo: route.params.orderNo,
      username: route.params.username,
      description: route.params.description,
      currency: route.params.currency,
      amount: route.params.amount,
      deliveryDate: route.params.end_date,
      duration: route.params.delivery_time,
      image: route.params.image,
      revision: route.params.revision,
      status_id: route.params.status_id,
      delivery_note: route.params.delivery_note,
      created_at: route.params.created_at,
      type: "object",
    };

    const formData = ref({
            paymentElements: {
                service_id: payload.id,
                number: 4242424242424242,
                exp_month: 6,
                exp_year: 2022,
                cvc: 123,
            },
            descriptionData: {
                service_id: payload.id,
                description: '',
                token: ''
            }
    });


    const descriptionRegex = /^[a-zA-Z.,":/; ]{20,300}$/;
    const descriptionErrors = ref({
        description: 'Description is required',
        number: null,
        exp_month: null,
        exp_year: null,
        cvc: null
    });

    watch(formData.value, (current) => {
        if (!current.descriptionData.description) {
            console.log("in condition", current.descriptionData.description)
            descriptionErrors.value.description = "Description is required"
        } else if (!current.descriptionData.description.match(descriptionRegex)) {
            descriptionErrors.value.description = "Description's length must be minimum 20 characters"
        } else {
            descriptionErrors.value.description = null
        }

        if (!current.paymentElements.number) {
            console.log("in condition", current.paymentElements.number)
            descriptionErrors.value.number = "Card Number is required"
        } else if (String(current.paymentElements.number).split("").length !== 16) {
            //console.log("Card number",String(current.paymentElements.number).split("").length)
            descriptionErrors.value.number = "Card Number length must be 16 characters"
        } else {
            descriptionErrors.value.number = null
        }

        if (!current.paymentElements.cvc) {
            console.log("in condition", current.paymentElements.cvc)
            descriptionErrors.value.cvc = "CVC is required"
        } else if (String(current.paymentElements.cvc).split("").length !== 3) {
            descriptionErrors.value.cvc = "CVC length must be 3 characters"
        } else {
            descriptionErrors.value.cvc = null
        }

        if (!current.paymentElements.exp_month) {
            console.log("in condition", current.paymentElements.exp_month)
            descriptionErrors.value.exp_month = "expiry month is required"
        } else if (String(current.paymentElements.exp_month).split("").length > 2) {
            descriptionErrors.value.exp_month = "expiry month should be maximum 2 characters"
        } else {
            descriptionErrors.value.exp_month = null
        }

        if (!current.paymentElements.exp_year) {
            console.log("in condition", current.paymentElements.exp_year)
            descriptionErrors.value.exp_year = "expiry year is required"
        } else if (String(current.paymentElements.exp_year).split("").length > 4) {
            descriptionErrors.value.exp_year = "expiry year should be maximum 4 characters"
        } else {
            descriptionErrors.value.exp_year = null
        }
    })

    return {
        service: computed(() => store.getters.getSingleService),
        formData,
        payload,
        order,
        descriptionRegex,
        descriptionErrors
    }

}