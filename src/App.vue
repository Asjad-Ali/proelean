<template>
  <div>
    <TopNav />
    <div class="d-none d-lg-block">

    <BottomNav v-if="isAuthenticated" />
    </div>
    <router-view/>
    <Footer />
<<<<<<< HEAD
=======
    <div class="d-lg-none">
    <MobileBottomNav />
</div>
>>>>>>> 98d65f2909710927503c0079b414e25c50519244
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