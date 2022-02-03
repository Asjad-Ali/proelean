<template>
  <div class="main-page second py-5">
    <div class="container">
      <div class="row">
        <PersonalDetails />
        <GigsDetail />
      </div>
      <ReviewPagination />
    </div>
  </div>
</template>

<script>
import PersonalDetails from '@/components/profile/PersonalDetails.vue';
import GigsDetail from '@/components/profile/GigsDetail.vue';
import ReviewPagination from '@/components/profile/ReviewPagination.vue';
import { useStore } from 'vuex';

export default {
  components:{
    PersonalDetails,
    GigsDetail,
    ReviewPagination
  },
  setup() {
    const store = useStore();
    store.dispatch("userServices");
  },
};
</script>

<style scoped>
.container{
  max-width: 1200px;
}
</style>