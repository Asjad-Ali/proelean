<template>
  <div class="container-xl">
    <FilterCard/>
    <ProjectCard/>
    <BillingCard/>
    <ProductCard/>
    <NewsCard/>
    <LoadmoreCard/>

  </div>
</template>

<script>
import BillingCard from "../../components/Seller/Notifications/BillingCard.vue";
import ProductCard from "../../components/Seller/Notifications/ProductCard.vue";
import ProjectCard from "../../components/Seller/Notifications/ProjectCard.vue";
import NewsCard from "../../components/Seller/Notifications/NewsCard.vue";
import LoadmoreCard from "../../components/Seller/Notifications/LoadmoreCard.vue";
import FilterCard from "../../components/Seller/Notifications/FilterCard.vue";

export default {
  components:{ BillingCard, ProductCard, ProjectCard, NewsCard, LoadmoreCard, FilterCard }
}
</script>