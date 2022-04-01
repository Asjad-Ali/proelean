import { computed, ref,watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default function useOrder() {

    const store = useStore();
    const route = useRoute();
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth()+1
    const currentYear = currentDate.getFullYear();
    const payload = {
        id: route.params.id,
        type: "SERVICE_DETAIL",
    };


    const payloadOrder = {
        id: route.params.id,
        orderNo: route.params.orderNo,
        type: "object"
      }


    const orderDispute = ref({
        order_no: payloadOrder.orderNo,
        type: 5,
        description: "Please cancel the order",
        url: "seller/manage_order",
      });
  
      const orderDeliver = ref({
        order_no: payloadOrder.orderNo,
        type: 2,
        description: "order delivered",
        delivered_file: "",
        delivery_note: "delivery file proceed",
        url: "seller/manage_order",
      });
  
      const orderComplete = ref({
        order_no: payloadOrder.orderNo,
        type: 4,
        description: "satisfy with your work, the order is complete",
        url: "buyer/manage_order",
      });
  
      const orderRevision = ref({
        order_no: payloadOrder.orderNo,
        type: 3,
        revision_description: "hey seller! do this again",
        url: "buyer/manage_order",
      });
  
      const orderCancel = ref({
        order_no: payloadOrder.orderNo,
        type: 8,
        url: "seller/manage_order",
      });

      const orderLate = ref({
        order_no: payloadOrder.orderNo,
        type: 6,
        description: "Please extend the delivery time",
        url: "seller/manage_order",
      });

      const orderDateExtend = ref({
        order_id: payloadOrder.id,
        extended_delivery_days: "",
      });

      const orderDateExtendError = ref({
        extended_delivery_days: "Extend Date is required",
      });
  

    const formData = ref({
            paymentElements: {
                service_id: payload.id,
                number: 4242424242424242,
                exp_month: 6,
                exp_year: 2026,
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
        description: null,
        number: null,
        exp_month: null,
        exp_year: null,
        cvc: null
    });

    watch(formData.value, (current) => {
        if (!current.descriptionData.description) {
            descriptionErrors.value.description = "Description is required"
        } else if (!current.descriptionData.description.match(descriptionRegex)) {
            descriptionErrors.value.description = "Description's minimum 20 characters"
        } else {
            descriptionErrors.value.description = null
        }

        if (!current.paymentElements.number) {
            console.log("in condition", current.paymentElements.number)
            descriptionErrors.value.number = "Card Number is required"
        } else if (String(current.paymentElements.number).split("").length !== 16) {
            //console.log("Card number",String(current.paymentElements.number).split("").length)
            descriptionErrors.value.number = "Card Number 16 characters"
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
        } else {
            descriptionErrors.value.exp_month = null
        }

        if (!current.paymentElements.exp_year) {
            descriptionErrors.value.exp_year = "expiry year is required"
        }else if (formData.value.paymentElements.exp_month < currentMonth && current.paymentElements.exp_year <= currentYear ) {
          console.log(formData.value.paymentElements.exp_month)
          descriptionErrors.value.exp_month = "Month is not valid"
        } else {
            descriptionErrors.value.exp_year = null
        }
    })

    watch(orderDateExtend.value,(current) => {
      if(!current.extended_delivery_days){
        orderDateExtendError.value.extended_delivery_days = "Extend Date is required"
      }else{
        orderDateExtendError.value.extended_delivery_days = null
      }
    })


    const selectDeliveredFile = (e) => {
        orderDeliver.value.delivered_file = e.target.files[0];
        console.log("order deliverd file: ", orderDeliver.value.delivered_file);
       }


    function order_dispute() {
        console.log("manage order", orderDispute.value);
        store.dispatch("manageOrder", orderDispute.value);
      }
  
      function order_deliver() {
        console.log("manage order", orderDeliver.value);
        store.dispatch("manageOrder", orderDeliver.value);
      }
  
      function order_complete() {
        console.log("manage order", orderComplete.value);
        store.dispatch("manageOrder", orderComplete.value);
      }
  
      function order_revision() {
        console.log("manage order", orderRevision.value);
        store.dispatch("manageOrder", orderRevision.value);
      }
  
      function seller_cancel_request() {
        console.log("manage order", orderCancel.value);
        store.dispatch("manageOrder", orderCancel.value);
      }

      function buyer_cancel_request() {
        orderCancel.value.url = "buyer/manage_order";
        console.log("manage order", orderCancel.value);
        store.dispatch("manageOrder", orderCancel.value);
      }

      function order_late() {
        console.log("manage order", orderLate.value);
        store.dispatch("manageOrder", orderLate.value);
      }

      function order_date_extend() {
        console.log("Order Date Extend: ", orderDateExtend.value);
        store.dispatch("dateExtendOfOrder", orderDateExtend.value);
        orderDateExtend.value.extended_delivery_days = "";
      }
  

    return {
        service: computed(() => store.getters.getSingleService),
        formData,
        payload,
        payloadOrder,
        descriptionRegex,
        descriptionErrors,
        orderDispute,
        order_dispute,
        orderDeliver,
        order_deliver,
        selectDeliveredFile,
        orderComplete,
        order_complete,
        orderRevision,
        order_revision,
        orderCancel,
        buyer_cancel_request,
        seller_cancel_request,
        orderLate,
        order_late,
        orderDateExtend,
        orderDateExtendError,
        order_date_extend
    }

}