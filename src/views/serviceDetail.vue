<template>
  <div>
      <serviceDetailNav />
      <serviceDetailSection />
  </div>
</template>

<script>

import serviceDetailNav from '@/components/services/serviceDetailNavSection'
import serviceDetailSection from '@/components/services/serviceDetailSection'

export default {
    components: {
        serviceDetailNav,
        serviceDetailSection
    }
}
</script>

<style>

</style>