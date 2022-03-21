<template>
  <footer class="bg-white">
        <div class="container">
           <div class="d-flex justify-content-between margin-left">
              <div class="footer-list">
                 <h4>Categories</h4>
                 <ul class="list" v-if="$store.state.isLoggedIn">
                    <li  v-for="(category,index) in $store.getters.getCategories" :key="category.id" v-show="index < 6">
                       <router-link :to="'/gigs/'+category.slug" >{{category.title}}</router-link>
                     </li>
                 </ul>
                 <ul v-else>
                    <li><a href="#"> Graphic & Design </a></li>
                    <li><a href="#"> Digital Marketing </a></li>
                    <li><a href="#"> Writing & translation </a></li>
                    <li><a href="#"> Video Animation </a></li>
                    <li><a href="#"> Music & Audio </a></li>
                    <li><a href="#"> Programming & Tech </a></li>
                 </ul>
              </div>
              <div class="footer-list">
                 <h4>About</h4>
                 <ul class="list">
                    <li><a href="#">Careers</a></li>
                    <li><a href="about">About</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Terms of Service</a></li>
                    <li><a href="#">Intellectual Property Claims</a></li>
                 </ul>
              </div>
              <div class="footer-list">
                 <h4>Support</h4>
                 <ul class="list">
                    <li><a href="#" >Help &amp; Support</a></li>
                    <li><a href="#">Trust &amp; Safety</a></li>
                    <li><a href="#" >Selling on ProeLean
                       </a>
                    </li>
                    <li><a href="#">Buying on ProeLean
                       </a>
                    </li>
                 </ul>
              </div>
              <!-- <div class="footer-list">
                 <h4>Community</h4>
                 <ul class="list">
                    <li><a href="#">Events</a></li>
                    <li><a href="#">Community Standards</a></li>
                    <li><a href="#">Affiliates</a></li>
                    <li><a href="#">Invite a Friend</a></li>
                    <li><a href="#">Become a Seller</a></li>
                 </ul>
              </div> -->
           </div>
           <div class="copyright mb-5 mb-lg-0">
              <div class="logo">
                 <router-link to="/">
                 <img src="/assets/images/Pro-eLean-.png">
                 </router-link>
              </div>
              <p>© Copyright 2022 Proelean. All Rights Reserved
              </p>
              <ul class="social">
                 <li>
                    <a href="https://www.facebook.com/proelean" target="_blank"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                 </li>
                 <!-- <li>
                    <a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                 </li> -->
                 <!-- <li>
                    <a href="#"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
                 </li> -->
                 <!-- <li>
                    <a href="#"><i class="fa fa-pinterest-p" aria-hidden="true"></i></a>
                 </li> -->
                 <li>
                    <a href="https://www.instagram.com/proelean/" target="_blank"><i class="fa fa-instagram" aria-hidden="true"></i></a>
                 </li>
              </ul>
           </div>
        </div>
     </footer>
</template>

<script>
export default {

}
</script>

<style scoped>
.margin-left{
   margin-left: 175px;
}
</style>