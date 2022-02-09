<template>
  <div class="main-page second py-5">
    <div class="container">
      <div class="row">
        <PersonalDetails />
        <GigsDetail />
      </div>
    </div>
  </div>
</template>

<script>
import PersonalDetails from '@/components/profile/PersonalDetails.vue';
import GigsDetail from '@/components/profile/ServiceListSection.vue';
import { useStore } from 'vuex';

export default {
  components:{
    PersonalDetails,
    GigsDetail,
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