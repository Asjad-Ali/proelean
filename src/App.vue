<template>
  <div>
    <TopNav />
    <BottomNav  />
    <router-view/>
    <Footer />
  </div>
</template>


<script>
import TopNav from './components/layouts/TopNav.vue';
import BottomNav from './components/layouts/BottomNav.vue';
import Footer from './components/layouts/Footer.vue';
export default {
  name: "App",
  components:{
    TopNav,
    BottomNav,
    Footer
  }
}
</script>

<style lang="scss">
.cursor-pointer{
  cursor: pointer;
}
</style>