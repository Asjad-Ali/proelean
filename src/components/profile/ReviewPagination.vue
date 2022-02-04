<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination d-flex justify-content-center">
      <li class="page-item">
        <a class="page-link" @click="prev()" href="#"> Previous</a>
      </li>
      <li class="page-item"><a class="page-link" @click="empty()" href="#">1</a></li>
      <li class="page-item"><a class="page-link" @click="next()" href="#">2</a></li>
      <li class="page-item"><a class="page-link" @click="next()" href="#">3</a></li>
      <li class="page-item"><a class="page-link" @click="next()" href="#">4</a></li>
      <li class="page-item"><a class="page-link" @click="next()" href="#">5</a></li>
      <li class="page-item">
        <a class="page-link" @click="next()" href="#"> Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { computed } from "vue";
import store from "../../store";

export default {
  setup() {
    function next(){
        store.dispatch("sellerReviewsById","next");
    }
    function prev(){
        store.dispatch("sellerReviewsById","prev");
    }
    
    function empty(){
        store.dispatch("sellerReviewsById","");
    }
    return {
      review: computed(() => store.getters.getSellerReview),
      next,prev,empty
    };
  },
};
</script>

<style scoped>

</style>