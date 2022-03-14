<template>
  <div class="col-lg-4 right">
    <div class="">
      <div class="tab-content">
        <div id="basic" class="tab-pane fade show active">
          <h4>Package Detail</h4>
          <hr />
          <div class="header">
            <h3>
              <b class="title">10 Screens</b><span class="price">$8,029</span>
            </h3>
            <p>
              I will design rough sketches for upto 5 Screens of your
              website/Mobile app.
            </p>
          </div>
          <article>
            <div class="d-flex">
              <b class="delivery"
                ><i class="fa fa-clock-o" aria-hidden="true"></i> 3 Days
                Delivery</b
              >
              <b class="delivery ml-3"
                ><i class="fa fa-refresh" aria-hidden="true"></i> 1 Revision</b
              >
            </div>
            <ul class="features">
              <li class="feature included">
                <i class="fa fa-check" aria-hidden="true"></i>Source File
              </li>
              <li class="feature included">
                <i class="fa fa-check" aria-hidden="true"></i>Commercial Use
              </li>
              <li class="feature">
                <i class="fa fa-check" aria-hidden="true"></i>Interactive Mockup
              </li>
              <li class="feature included">
                <i class="fa fa-check" aria-hidden="true"></i>10 Pages
              </li>
            </ul>
          </article>

          <router-link
            :to="{ name: 'Purchase', params: { id: service.id } }"
            class="btn btn-success text-white w-100"
          >
            Continue
          </router-link>
          <router-link
            :to="`/chat/${service.service_user.id}`"
            class="btn btn-success text-white w-100 mt-3"
          >
            Contact Seller
          </router-link>
        </div>
      </div>
      <!---------------------    Modal End     --------------------->
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    return {
      service: computed(() => store.getters.getSingleService),
    };
  },
};
</script>
 
<style scoped>
.width {
  width: 140px;
}
</style>