<template>
<router-view />
</template>

<script>
import { onMounted } from '@vue/runtime-core';
import store from '../store';
export default {
  setup() {
    onMounted(() => {
      store.dispatch("showAllJobs");
      store.dispatch("showBuyerRequests");
    });
  },
};
</script>

<style>
</style>