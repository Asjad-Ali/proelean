<template>
  <div class="main-page second py-5">
    <div class="container">
      <div class="row">
        <PersonalDetail />
        <GigsDetail />
      </div>
    </div>
  </div>
</template>

<script>
import PersonalDetail from '@/components/profile/personalDetail.vue';
import GigsDetail from '@/components/profile/gigsDetail.vue';
import { useStore } from 'vuex';

export default {
  components:{
    PersonalDetail,
    GigsDetail
  },
  setup() {
    const store = useStore();
    store.dispatch("userServices");
  },
};
</script>

<style>
</style>