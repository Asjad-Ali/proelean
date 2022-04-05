<template>
   <h3 id="aboutSeller">About The Seller</h3>
      <div class="user-profile-image d-flex">
         <label class="profile-pict" for="profile_image">
         <img
            :src="`${imgURL}/${service.service_user.image}`"
            class="profile-pict-img img-fluid object" alt="img">
         </label>
         <div class="right">
            <div class="profile-name">
               <span class="user-status">
               <a class="seller-link">{{service.service_user.username}}</a>
               </span>
               <div class="seller-level">{{service.s_description}} </div>
            </div>
            <div class="user-info">
               <span class="user-info-rating d-flex align-items-center">
                  <div class="star-rating-s15-wrapper">
                     <span class="rate-10">
                     <i class="fa fa-star" aria-hidden="true"   v-for="star in service.service_user.user_rating" :key="star" ></i>
                     </span>
                   
                  </div>
                  <span class="total-rating-out-five">{{service.service_user.user_rating}}</span>
                  <span class="total-rating">({{service.service_user.total_reviews}})</span>
               </span>
               <router-link   :to="{ name: 'Chat', params: { id: `${service.service_user.id}` } }" class="btn btn-success">
                  Contact Me
               </router-link>
            </div>
         </div>
      </div>
      <div class="stats-desc">
         <ul class="user-stats">
            <li>From<strong>India</strong></li>
            <li>Member since<strong>{{user.created_at}}</strong></li>
         </ul>
         <article class="seller-desc">
            <div>User Description</div>
            <div class="inner">{{user.description}}</div>
         </article>
      </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {
   props: {
      service: {
         type: Object,
         required: true
      }
   },
   setup(){
      const store = useStore()
      return {
        user: computed(() => store.getters.getAuthUser),
        imgURL: process.env.VUE_APP_URL
      }
   }
}
</script>

<style scoped>
.object{
   object-fit: cover;
}
</style>