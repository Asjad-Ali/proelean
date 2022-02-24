<template>
   <div class="freelance-projects py-5">
      <div class="container">
         <h2>
            Get Inspired With Projects Made By Our Freelancers
            <a href="#" class="float-right">See More ></a>
         </h2>
         <div class="row freelance-slider" v-if="$store.getters.getFeatGigs.length > 0">
            <div class="col" v-for="gig in $store.getters.getFeatGigs" :key="gig.id">
               <div class="freelancer">
                  <img :src="getImgUrl(gig.service_media[0].media)">
                  <div class="freelancer-footer">
                     <img src="assets/images/user/s1.png">
                     <h5>{{ gig.s_description }}
                        <span>by <i>{{ gig.service_user.username }}</i></span>
                     </h5>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>

export default {
   setup()
   {
      // const imgURL = process.env.VUE_APP_URL
      return {
         getImgUrl : (banner => "https://api.dex.proelean.com/"+banner)
      }
   }
}
</script>

<style>

</style>