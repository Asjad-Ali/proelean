<template>
  <div>
    <ServiceNavSection />
    <Suspense>
      <template #default>
        <GigsList />
      </template>
      <template #fallback>
        <div>Loading Services using suspense</div>
      </template>
    </Suspense>

  </div>
</template>

<script>
import ServiceNavSection from '@/components/services/serviceListNav.vue';
import { defineAsyncComponent } from '@vue/runtime-core';

const GigsList=defineAsyncComponent({
   loader:() => import('@/components/services/serviceListSection.vue'),
   delay: 400,
   suspensible: false
})

export default {
  components:{
    ServiceNavSection,
    GigsList
  },
}
</script>
