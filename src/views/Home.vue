<template>
  <div>
   <HeroSection />
    <SocialSection />
    <BoostBussiness />
    <ExploreMarket />
    <ProjectByFreelancer />
    <Quotation />
    <FindServices />
  </div>
</template>

<script>
import HeroSection from '@/components/home/HeroSection.vue';
import SocialSection from '@/components/home/SocialListSection.vue';
import BoostBussiness from '@/components/home/BoostBussinessSection.vue';
import ExploreMarket from '@/components/home/ExploreMarketSection.vue';
import ProjectByFreelancer from '@/components/home/ProjectByFreelancerSection.vue';
// import Quotation from '@/components/home/QuotationSection.vue';
import FindServices from '@/components/home/FindServicesSection.vue';

export default {
  name: 'Home',
  components: {
    HeroSection,
    SocialSection,
    BoostBussiness,
    ExploreMarket,
    ProjectByFreelancer,
    // Quotation,
    FindServices
  },
}
</script>
