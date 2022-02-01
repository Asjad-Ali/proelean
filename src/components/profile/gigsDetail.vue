<template>
  <div class="col-lg-8 right">
    <h2>{{ user.username }}</h2>
    <div class="recommended d-flex flex-wrap justify-content-start">
      <div
        class="card  width margin-right"
        v-for="service in $store.getters.getUserServices"
        :key="service.id"
      >
        <a href="#">
          <img
            class="img-fluid"
            :src="
              'https://api.dex.proelean.com/' + service.service_media[0].media
            "
          />
        </a>
        <div class="inner-slider">
          <div class="inner-wrapper d-flex flex-column align-content-between">
            <div class="d-flex align-items-center">
              <span class="seller-image">
                <img
                  class="img-fluid"
                  :src="
                    'https://api.dex.proelean.com/' + service.service_user.image
                  "
                  alt=""
                />
              </span>
              <span class="seller-name">
                <p>{{ service.service_user.username }}</p>

                <span class="level hint--top level-one-seller">
                  Level 1 Seller
                </span>
              </span>
            </div>
            <h3>
              <!-- {{ service.s_description.substr(0, 28) }} -->
              {{service.s_description.substr(0, 28)}} {{service.s_description.length > 28 ? '...' : ''}}
            </h3>
            <div class="content-info">
              <div class="rating-wrapper">
                <span class="gig-rating text-body-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1792 1792"
                    width="15"
                    height="15"
                  >
                    <path
                      fill="currentColor"
                      d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                    ></path>
                  </svg>
                  {{ service.service_rating }}
                  <span>({{ service.total_reviews }})</span>
                </span>
              </div>
            </div>
            <div class="footer">
              <i class="fa fa-heart" aria-hidden="true"></i>
              <div class="price">
                <a href="#">
                  Starting At <span> ${{ service.price }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <ReviewSection />
  </div>
</template>

<script>
import { computed } from "vue";
import store from "../../store";
import ReviewSection from "./reviewSection.vue";

export default {
  components: {
    ReviewSection,
  },
  setup() {
    store.dispatch("userServices");

    return {
      user: computed(() => store.getters.getAuthUser),
    };
  },
};
</script>


<style scoped>
.margin-right {
  margin: 8px;
}

.width{
  width: 225px;
}

</style>