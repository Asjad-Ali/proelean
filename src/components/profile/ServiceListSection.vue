<template>
    <div
      class="col-md-4"
      v-for="service in $store.getters.getUserServices"
      :key="service.id"
    >
    <router-link :to="{name:'gigDetail', params:{id:service.id}}" >
        <img
          class="img-fluid"
          :src="(service.service_media.length && service.service_media[0].media) ? `https://api.dex.proelean.com/${service.service_media[0].media}` : `/assets/images/sample-gig.png`" />
      </router-link>
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
            <a id="navbarDropdownUserImage" href="javascript:void(0);" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
              <i class="fa fa-ellipsis-h"  aria-hidden="true"></i></a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownUserImage">
                <div >
                  <a class="dropdown-item" @click.prevent="deleteGig(service.id)" href="#">Delete</a>
                </div>
            </div>
            <div class="price">
              <a href="#">
                Starting At <span> ${{ service.price }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

</script>