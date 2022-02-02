<template>
  <div class="review-section">
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h4 class="m-0">
        Reviews as Seller
        <small
          ><span class="star-rating-s15"></span
          ><span
            ><span
              class="total-rating-out-five header-average-rating"
              data-impression-collected="true"
              >{{ user.user_rating }}</span
            ></span
          ><span
            ><span
              class="total-rating header-total-rating"
              data-impression-collected="true"
              >({{ user.total_reviews }})</span></span
          ></small
        >
      </h4>
      <select class="custom-select custom-select-sm border-0 shadow-sm ml-2">
        <option>Most Relevant</option>
        <option>Most Recent</option>
      </select>
    </div>
    <div class="breakdown">
      <ul class="header-stars">
        <li>
          Seller communication level
          <small>
            <span class="star-rating-s15"></span>
            <span class="total-rating-out-five">{{ user.user_rating }}</span>
          </small>
        </li>
        <li>
          Recommend to a friend
          <small>
            <span class="star-rating-s15"></span>
            <span class="total-rating-out-five">{{ user.user_rating }}</span>
          </small>
        </li>
        <li>
          Service as described
          <small>
            <span class="star-rating-s15"></span>
            <span class="total-rating-out-five">{{ user.user_rating }}</span>
          </small>
        </li>
      </ul>
    </div>
  </div>
  <div class="review-list">
    <ul>
      <li>
        <div class="d-flex">
          <div class="left">
            <span>
              <img
                src="images/user/s9.png"
                class="profile-pict-img img-fluid"
                alt=""
              />
            </span>
          </div>
          <div class="right">
            <h4>
              Askrtosdfgfs
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
                5.0
              </span>
            </h4>
            <div class="country d-flex align-items-center">
              <span>
                <img
                  class="country-flag img-fluid"
                  src="images/flag/india.png"
                />
              </span>
              <div class="country-name font-accent">India</div>
            </div>
            <div class="review-description">
              <p>
                The process was smooth, after providing the required info,
                Pragyesh sent me an outstanding packet of wireframes. Thank you
                a lot!
              </p>
            </div>
            <span class="publish py-3 d-inline-block w-100"
              >Published 4 weeks ago</span
            >
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import store from "../../store";

export default {
  setup() {
    onMounted(
      store.dispatch('sellerReviewsById')
    )
    return {
      user: computed(() => store.getters.getAuthUser),
      review: computed(() => store.getters.getSellerReview),
    };
  },
};
</script>