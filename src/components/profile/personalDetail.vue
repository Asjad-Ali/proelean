<template>
  <div class="col-lg-4 left">
    <div class="profile_info">
      <div class="seller-card">
        <div>
          <div class="user-online-indicator is-online" data-user-id="1152855">
            <i class="fa fa-circle"></i>online
          </div>
        </div>
  
        <div class="user-profile-info">
          <div>
            <div class="user-profile-image">
              <label class="user-pict">
                <img
                  :src="'https://api.dex.proelean.com/' + user.image"
                  class="img-fluid img-thumbnail"
                  alt="profile_img"
                />
              </label>
            </div>
          </div>
          <div class="user-profile-label">
            <div class="username-line">
              <a href="#" class="seller-link">{{ user.username }}</a>
            </div>
            <div class="oneliner-wrapper">
              <small class="oneliner"> Web Developer </small>
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
                    {{ user.user_rating }}
                    <span>({{ user.total_reviews }})</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="buttons-wrapper">
          <a
            href="#"
            class="
              btn-lrg-standard btn-contact-me
              js-contact-me js-open-popup-join
            "
            >Contact Me</a
          >
          <div class="btn-lrg-standard btn-white btn-custom-order">
            Get a Quote
          </div>
        </div>
        <div class="user-stats-desc">
          <ul class="user-stats">
            <li class="location">
              From<strong>
                {{ user.address }}
              </strong>
            </li>
            <li class="member-since">
              Member since<strong>
                {{ user.created_at }}
                </strong>
            </li>
            <li class="response-time">
              Avg. Response Time<strong>2 hours</strong>
            </li>
            <li class="recent-delivery">
              Recent Delivery<strong>{{user.recent_delivery.substr(0, 16)}}{{user.recent_delivery.length > 16 ? '..' : ''}}
              </strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="seller-profile">
      <div class="description">
        <h3>Description</h3>
        <p>{{ user.description }}</p>
      </div>
      <div class="languages">
        <h3>Languages</h3>
        <ul>
          <li>
            {{ user.user_languages }}
            <span>Fluent</span>
          </li>
          
        </ul>
      </div>
      <div class="linked-accounts">
        <h3>Linked Accounts</h3>
        <ul>
          <li class="platform social-account facebook">
            <i
              class="platform-icon facebook hint--top"
              aria-hidden="true"
              data-hint="facebook"
            ></i
            ><span class="text">facebook</span>
          </li>
          <li class="platform social-account google">
            <i
              class="platform-icon google hint--top"
              aria-hidden="true"
              data-hint="google"
            ></i
            ><span class="text">google</span>
          </li>
        </ul>
      </div>
      <div class="skills">
        <h3>Skills</h3>
        <ul>
          <li>
            <!-- {{ ( user.user_skills }} -->
            {{ ( user.user_skills.length == 0) ? '' : user.user_skills }}
          </li>
        </ul>
      </div>
      <div class="education-list list">
        <h3>Education</h3>
        <ul>
          <li>
            <p>B.A. - communication studies</p>
            <p>Clayton State University, United States, Graduated 2006</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>



<script>
import { computed } from "vue";
import store from "../../store";

export default {
  setup() {
    return {
      user: computed(() => store.getters.getAuthUser),
    };
  },
};
</script>

