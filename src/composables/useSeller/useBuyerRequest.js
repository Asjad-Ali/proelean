import { ref } from "vue";
import { useStore } from "vuex";

export default function useBuyerRequest(){
    const store = useStore();

    const requestType = ref ({
      status:'',
      current_page:1,
    })
    console.log("Object",requestType.value)

    const jobId = ref("");
    const payload = ref({
        job_id: "",
        service_id: "",
        description: "",
        price: "",
        delivery_time: "",
    });

    const buyerRequestType = [
        { value: 0, name: "Buyer Request" },
        { value: 1, name: "Sent Offer" },
    ];

    function defineOffer(jobID) {
        payload.value.job_id = jobID;
    }
    function sendOffer() {
        store.dispatch("sendOffer", payload.value);
        payload.value = {};
    }
    
    function showFilter() {
        let value = document.getElementById("requestValue").value;
        if (value == 1) {
          requestType.value.status = "sent_offers"
          requestType.value.current_page = 1
          loadOtherRequest(requestType.value.current_page)
        }
        else {
          requestType.value.status = ''
          requestType.value.current_page = 1
          loadOtherRequest(requestType.value.current_page)
        }
    }

    function deleteJob(id) {
        store.dispatch("deleteBuyerJob", id);
        console.log("delete request id: ", id);
    }

    const loadOtherRequest = (page) => {
      requestType.value.current_page = page
      store.dispatch("showBuyerRequests",requestType.value);
    }

    const previous = () => {
      requestType.value.current_page = requestType.value.current_page-1
      loadOtherRequest(requestType.value.current_page)
    }

    const next = () => {
      requestType.value.current_page = requestType.value.current_page+1
      loadOtherRequest(requestType.value.current_page)
    }
    
    return{
        requestType,
        previous,
        next,
        buyerRequestType,
        showFilter,
        payload,
        loadOtherRequest,
        defineOffer,
        sendOffer,
        deleteJob,
        jobId,
    }
}