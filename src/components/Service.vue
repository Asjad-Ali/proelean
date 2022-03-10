<template>
<div>
  <div v-if="service">
      <div class="card h-100">
        <router-link :to="{name:'gigDetail', params:{id:service.id}}">
          <img class="img-fluid" :src="imgURL+'/'+service.service_media[0].media"  />
        </router-link>
        <div class="inner-slider">
          <div class="inner-wrapper d-flex flex-column align-content-between">
            <div class="d-flex align-items-center">
              <span class="seller-image">
                <img
                  class="img-fluid"
                  :src="`${imgURL}/${service.service_user ? service.service_user.image : '/assets/images/avator.png'}`"
                  alt="img"
                />
              </span>
              <span class="seller-name">
                {{
                  service.service_user.username
                }}

                <!-- <span class="level hint--top level-one-seller">
                  Level 1 Seller
                </span> -->
              </span>
            </div>
            <h3 style="overflow: hidden; height: 3rem;">
              <!-- {{ service.s_description.substr(0, 125) }} -->
              {{service.s_description.substr(0, 75)}}{{service.s_description.length > 20 ? '...' : ''}}
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
              <div class="dropdown">
                <a class="dropdown-toggle" href="#" id="dropdownMenuLink" data-bs-toggle="dropdown">
                  <i class="material-icons">list</i>
                </a>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <li class="dropdown-item"><router-link :to="{name:'gigDetail', params:{id:service.id}}">Open</router-link></li>
                  <li class="dropdown-item"><router-link :to="{name:'UpdateService', params:{id:service.id}}">Edit</router-link></li>
                  <span @click="getServiceId(service.id)">
                  <li class="dropdown-item"><a aria-hidden="true"
                      data-toggle="modal"
                      class="cursor-pointer"
                      data-target="#exampleModalCenter">Delete</a></li>
                  </span>
                </ul>
              </div>
              <a
              :class="{'disable': service.service_user.id === $store.getters.getAuthUser.id}"
              @click="handleWishlist(service.id)" >
                  <i class="fa fa-spinner fa-spin" v-if="loader==service.id"></i>
                  <i v-else  class="fa fa-heart cursor-pointer" :class="{ redIcon : service.favourite}"
                  :disabled="loader===service.id"   aria-hidden="true"></i>
              </a>
              <div class="price">
                <a href="#">
                  Starting At <span> ${{ service.price }}</span>
                </a>
              </div>
            </div>
          </div>

              <div class="col-2">
            <div
              class="modal fade"
              id="exampleModalCenter"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div
                class="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div class="modal-content">
                  <div
                    class="modal-header d-flex justify-content-center"
                  >
                    <h5
                      class="modal-title"
                      id="exampleModalLongTitle"
                    >
                      Delete Service
                    </h5>
                  </div>
                  <div class="modal-body text-center">
                    Are you sure you want to delete the service?
                  </div>
                  <div
                    class="modal-footer d-flex justify-content-center"
                  >
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      No
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger"
                      data-dismiss="modal"
                      @click="deleteService()"
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
  </div>
  <div v-else>
    <h4>No Service Available</h4>
  </div>
</div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, ref, toRef } from 'vue';
import { useRoute } from 'vue-router';
export default {
  props: {
    service: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    const store = useStore()
    const route = useRoute();

    const serviceId = ref("");

    const getServiceId = (id) => {
      serviceId.value = id;
    };
    const deleteService = () => {
      store.dispatch('deleteService', props.service.id)
    }

    function handleWishlist (id) {
      let payload = {
        'service_id': id,
        'type': route.name === 'Gigs' ? 'gigs' : 'offered'
      }
      store.dispatch('wishlist',payload)
    }
    return {
      getServiceId,
      deleteService,
      handleWishlist,
      loader: computed(() => store.getters.getRegisterStatus),
      imgURL: process.env.VUE_APP_URL,
      serviceId: toRef(serviceId.value)
    };
  },
};
</script>


<style scoped>
.inner-slider {
 margin-bottom:0px !important;
}
.redIcon{
  color: red !important;
}
.disable{
visibility: hidden
}
.dropdown-toggle::after {
    display:none;
}

.card{
  margin-bottom: 0px;
}
</style>