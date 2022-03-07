<template>
  <div class="container-xl">
    <BuyerRequestCard/>  
    <BuyerRequestCard/>  
    <LoadmoreCard/>
  </div>
</template>

<script>
import BuyerRequestCard from "../../components/Seller/BuyerRequests/BuyerRequestCard.vue";
import LoadmoreCard from "../../components/Seller/Notifications/LoadmoreCard.vue";
 
 

export default {
  components:{ BuyerRequestCard, LoadmoreCard }
}
</script>