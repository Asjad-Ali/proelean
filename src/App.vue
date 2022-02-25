<template>
  <div>
    <TopNav />
    <BottomNav v-if="isAuthenticated" />
    <router-view/>
    <Footer />
    <MobileBottomNav />

  </div>
</template>


<script>
import TopNav from './components/layouts/TopNav.vue';
import BottomNav from './components/layouts/BottomNav.vue';
import Footer from './components/layouts/Footer.vue';
import MobileBottomNav from './components/layouts/MobileBottomNav.vue';
export default {
  name: "App",
  components:{
    TopNav,
    BottomNav,
    Footer,
    MobileBottomNav
  },
  setup() {
    
    return {
      isAuthenticated: localStorage.getItem("PROELEAN_TOKEN"),
    }


  }
}
</script>

<style lang="scss">
.cursor-pointer{
  cursor: pointer;
}
.gig-img-outer {
    height: 200px;
    width: 100%;
}

.img-full{
  height: 100%;
  width: 100%;
  overflow: hidden;
  object-fit: cover;
}

</style>