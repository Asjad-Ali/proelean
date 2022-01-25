<template>
   <div class="freelance-projects py-5">
      <div class="container">
         <h2>
            Get Inspired With Projects Made By Our Freelancers
            <a href="#" class="float-right">See More ></a>
         </h2>
         <div class="row freelance-slider">
            <div class="col" v-for="gig in $store.getters.getFeatGigs" :key="gig.id">
               <div class="freelancer">
                  <img :src="getImgUrl(gig)">
                  <div class="freelancer-footer">
                     <img src="assets/images/user/s1.png">
                     <h5>{{ gig.service_user.user_detail.freelancer_title }}
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
      let getImgUrl=(gig)=>{
         return "https://api.proelean.local.com/"+gig.service_media[0].media;
      }
      return {
         getImgUrl
      }
   }
}
</script>

<style>

</style>