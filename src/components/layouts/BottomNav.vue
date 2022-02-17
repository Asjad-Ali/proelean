<template>
   <nav class="navbar navbar-expand-lg navbar-light bg-white osahan-nav-mid px-0 border-top shadow-sm">
    <div class="container-fluid">
       <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
       <span class="navbar-toggler-icon"></span>
       </button>
       <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav">
            
             <li class="nav-item" v-for="category in $store.getters.getCategories" :key="category.id">
                <router-link @click="$store.commit('setCategorySlug',category.id)" class="nav-link" :to="'/gigs?category='+category.id">{{ category.title }}</router-link>
             </li>       
          </ul>
       </div>
       <ul class="navbar-nav ml-auto" v-if="!$store.state.isSeller || !$store.state.isLoggedIn">
            <li class="nav-item">
                <router-link class="btn btn-success" to="/become_seller">
                <i class="fa fa-fw fa-trophy"></i>
                <span>Become A Seller</span>
                </router-link>
            </li>
       </ul>
    </div>
 </nav>
</template>

<script>
import { useStore } from 'vuex';
import { onBeforeMount } from 'vue'

export default {
   setup() {
      const store = useStore();

      onBeforeMount(() => {
         if(! store.getters.getCategories.length) {
            store.dispatch("getHomeList");
         }

      });
   }
}
</script>

<style>

</style>