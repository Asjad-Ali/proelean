<template>
  <div class="row d-flex justify-content-center my-5">
    <div class="col-md-12">
      <div class="main-card mb-3 card shadow-none">
        <div class="card-body">
          <h5 class="card-title">Timeline</h5>
          <div class="">
            <!-- {{order}} -->
            <div
              v-for="orderTime in timeline"
              :key="orderTime.index"
              class="vertical-timeline-item vertical-timeline-element"
            >
              <div>
                <span class="vertical-timeline-element-icon bounce-in">
                  <i class="badge badge-dot badge-dot-xl badge-success"></i>
                </span>
                <div class="mt-3 bg-light rounded p-2">
                  <!-- <h6 class="timeline-title">Subject</h6> -->
                  <div class="d-flex justify-content-between">
                    <div class="">{{ orderTime.description }}</div>
                    <div class="text-muted">{{ orderTime.created_at }}</div>
                  </div>

                  <!-- dispute order request button-->
                  <div
                    class="d-flex justify-content-start my-2"
                    v-if="
                      orderTime.properties.type === 'ORDER' &&
                      orderTime.properties.value.toLowerCase() === 'disputed'
                    "
                  >
                    <div>
                      <div
                        class="badge bg-danger"
                        @click.prevent="acceptDispute($event)"
                      >
                        Accept
                      </div>
                      <span
                        class="bage bg-primary ml-2"
                        @click.prevent="rejectDispute($event)"
                      >
                        Reject
                      </span>
                    </div>
                  </div>

                  <!-- Extend order request button-->
                  <div
                    class="d-flex justify-content-between my-1"
                    v-if="
                      orderTime.properties.type === 'EXTEND_ORDER'
                    "
                  >
                    <div class="back text-dark mt-1">
                      Seller wants to Extend the order upto {{ orderTime.properties.value }}
                    </div>
                    <div class="mt-1" v-if="$store.getters.isBuyerMode">
                      <div class="badge bg-danger mr-2">
                        Accept
                      </div>
                      <div class="badge bg-primary">
                        Reject
                      </div>
                    </div>
                  </div>

                  <!-- <div class="d-flex justify-content-end">
                                    <button v-if="(order.status_id == 6 && $store.getters.isBuyerMode)" type="button" class="btn btn-light mt-2" >
                                    Accept
                                    </button>
                                    <button v-if="(order.status_id == 6 && $store.getters.isBuyerMode)" type="button" class="btn btn-secondary mt-2 ml-2" >
                                    Reject
                                    </button>
                                </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  components: {},
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const route = useRoute();
    const orderId = route.params.id;

    onMounted(() => {
      console.log("orderNo", props.order.orderNo);
      store.dispatch("timeline", props.order.orderNo || orderId);
    });

    const AcceptOrderCancelRequest = ref({
        order_no: orderId,
        type:null,
        url: "buyer/manage_order",
      });

      function disableButton(event) {
        event.target.innerText = "Loading...";
        event.target.disabled = true;
      }
      function sellerMode(){
          if(!store.getters.isBuyerMode){
            AcceptOrderCancelRequest.value.url="seller/manage_order"
        }
      }

    const acceptDispute = (event) => {
        disableButton(event);
        sellerMode();
        AcceptOrderCancelRequest.value.type = 9;
      store.dispatch("manageOrder", AcceptOrderCancelRequest.value);
    };

    const rejectDispute = (event) => {
        disableButton(event);
        sellerMode();
        AcceptOrderCancelRequest.value.type = 8;
        store.dispatch("manageOrder", AcceptOrderCancelRequest.value);
    }

    return {
      timeline: computed(() => store.getters.getTimeline),
      acceptDispute, rejectDispute

    };
  },
};
</script>

<style scoped>
.card {
  box-shadow: 0 0.46875rem 2.1875rem rgba(4, 9, 20, 0.03),
    0 0.9375rem 1.40625rem rgba(4, 9, 20, 0.03),
    0 0.25rem 0.53125rem rgba(4, 9, 20, 0.05),
    0 0.125rem 0.1875rem rgba(4, 9, 20, 0.03);
  border-width: 0;
  transition: all 0.2s;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(26, 54, 126, 0.125);
  border-radius: 0.25rem;
}

.card-body {
  flex: 1 1 auto;
  padding: 1.25rem;
}

.vertical-timeline {
  width: 100%;
  position: relative;
  padding: 1.5rem 0 1rem;
}

.vertical-timeline::before {
  content: "";
  position: absolute;
  top: 0;
  left: 67px;
  height: 100%;
  width: 4px;
  background: #e9ecef;
  border-radius: 0.25rem;
}

.vertical-timeline-element {
  position: relative;
  margin: 0 0 1rem;
}

.vertical-timeline--animate .vertical-timeline-element-icon.bounce-in {
  visibility: visible;
  animation: cd-bounce-1 0.8s;
}

.vertical-timeline-element-icon {
  position: absolute;
  top: 0;
  left: 60px;
}

.vertical-timeline-element-icon .badge-dot-xl {
  box-shadow: 0 0 0 5px #fff;
}

.badge-dot-xl {
  width: 18px;
  height: 18px;
  position: relative;
}

.badge:empty {
  display: none;
}

.badge-dot-xl::before {
  content: "";
  width: 10px;
  height: 10px;
  border-radius: 0.25rem;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -5px 0 0 -5px;
  background: #fff;
}

.vertical-timeline-element-content {
  position: relative;
  margin-left: 90px;
  font-size: 0.8rem;
}

.vertical-timeline-element-content .timeline-title {
  font-size: 0.8rem;
  text-transform: uppercase;
  margin: 0 0 0.5rem;
  padding: 2px 0 0;
  font-weight: bold;
}

.vertical-timeline-element-content .vertical-timeline-element-date {
  display: block;
  position: absolute;
  left: -90px;
  top: 0;
  padding-right: 10px;
  text-align: right;
  color: #adb5bd;
  font-size: 0.7619rem;
  white-space: nowrap;
}

.vertical-timeline-element-content:after {
  content: "";
  display: table;
  clear: both;
}
</style>