<template>
  <nav class="navbar navbar-expand-lg navbar-light topbar static-top shadow-sm bg-white osahan-nav-top px-0">
    <div class="container-fluid">
       <!-- Sidebar Toggle (Topbar) -->
       <a class="navbar-brand"><router-link to="/"><img src="/assets/images/Pro-eLean-.png" alt=""> </router-link></a>
       <!-- Topbar Search -->
       <form @submit.prevent="handleSearch" class="d-none d-sm-inline-block form-inline mr-auto my-2 my-md-0 mw-100 navbar-search">
          <div class="input-group">
             <input type="text" v-model="keywords" class="form-control bg-white small" placeholder="Find Services..." aria-label="Search" aria-describedby="basic-addon2">
             <div class="input-group-append">
                <button class="btn btn-success" @click.prevent="handleSearch" type="button">
                <i class="fa fa-search fa-sm"></i>
                </button>
             </div>
          </div>
       </form>
       <!-- Topbar Navbar -->
       <ul class="navbar-nav align-items-center ml-auto">
          <li class="nav-item dropdown no-arrow no-caret mr-3 dropdown-notifications d-sm-none">
             <a class="btn btn-icon btn-transparent-dark dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
             <i class="fa fa-search fa-fw"></i>
             </a>
             <!-- Dropdown - Messages -->
             <div class="dropdown-menu dropdown-menu-right p-3 shadow-sm animated--grow-in" aria-labelledby="searchDropdown">
                <form class="form-inline mr-auto w-100 navbar-search">
                   <div class="input-group">
                      <input type="text"  class="form-control bg-light border-0 small" placeholder="Find Services..." aria-label="Search" aria-describedby="basic-addon2">
                      <div class="input-group-append">
                         <button class="btn btn-primary"  type="button">
                         <i class="fa fa-search fa-sm"></i>
                         </button>
                      </div>
                   </div>
                </form>
             </div>
          </li>

      <ul class="navbar-nav align-items-center ml-auto" v-if="$store.state.isLoggedIn">

         <li class="nav-item dropdown no-arrow no-caret dropdown-user mx-2 d-none d-sm-block">
            <a class="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownUserImage" href="javascript:void(0);" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               Buyer
            </a>
               <div class="dropdown-menu dropdown-menu-right border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownUserImage">                     

                  <div>
                     <router-link class="dropdown-item" to="/buyer/create_job">Create Job</router-link>
                  </div>
                  <div>
                     <router-link class="dropdown-item" to="/buyer/jobs">Manage Job</router-link>
                  </div>
                  <div>
                     <router-link class="dropdown-item" to="/buyer/manage_order">Manage Order</router-link>
                  </div>

               </div>
            </li> 

               <li  class="nav-item dropdown no-arrow no-caret dropdown-user mx-2 d-none d-sm-block"
                  v-if="userInfo.isFreelancer"
               >
               <a class="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownUserImage" href="javascript:void(0);" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                     Seller 
               </a>
               <div class="dropdown-menu dropdown-menu-right border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownUserImage">
                  <div>
                     <router-link class="dropdown-item" to="/seller/manage_service">Manage services </router-link>
                  </div>
                  <div>
                     <router-link class="dropdown-item" to="/seller/buyer_requests">Buyer Requests</router-link>
                  </div>
               </div>
              </li> 

          <!-- @if(isset($user) && !is_null($user)) -->
          <li class="nav-item dropdown no-arrow no-caret mr-3 dropdown-notifications">
             <a class="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownAlerts" href="javascript:void(0);" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell">
                   <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                   <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
             </a>
             <div class="dropdown-menu dropdown-menu-right border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownAlerts">
                <h6 class="dropdown-header dropdown-notifications-header">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell mr-2">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                   </svg>
                   Alerts Center
                </h6>
                <a class="dropdown-item dropdown-notifications-item" href="#!" v-for="notification in userNotification" :key="notification.index">
                     <div class="dropdown-notifications-item-icon bg-warning">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-activity">
                         <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                      </svg>
                   </div>
                   <div class="dropdown-notifications-item-content" >
                      <div class="dropdown-notifications-item-content-text">{{ notification.name }}</div>
                      <div>{{ notification.body }}</div>
                      <div class="dropdown-notifications-item-content-details">{{ $filters.timeAgo( notification.created_at ) }}</div>
                   </div>
                </a>
                <a class="dropdown-item dropdown-notifications-footer" href="alerts.html">View All Alerts</a>
             </div>
          </li>
          <li class="nav-item dropdown no-arrow no-caret mr-3 dropdown-notifications">
             <a class="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownMessages" href="javascript:void(0);" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail">
                   <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                   <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
             </a>
             <div class="dropdown-menu dropdown-menu-right border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownMessages">
                <h6 class="dropdown-header dropdown-notifications-header">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail mr-2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                   </svg>
                   Message Center
                </h6>
                <a class="dropdown-item dropdown-notifications-item" href="#!">
                   <img class="dropdown-notifications-item-img" src="assets/images/user/s7.png">
                   <div class="dropdown-notifications-item-content">
                      <div class="dropdown-notifications-item-content-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                      <div class="dropdown-notifications-item-content-details">Emily Fowler · 58m</div>
                   </div>
                </a>
                <a class="dropdown-item dropdown-notifications-item" href="#!">
                   <img class="dropdown-notifications-item-img" src="assets/images/user/s8.png">
                   <div class="dropdown-notifications-item-content">
                      <div class="dropdown-notifications-item-content-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                      <div class="dropdown-notifications-item-content-details">Diane Chambers · 2d</div>
                   </div>
                </a>
                <a class="dropdown-item dropdown-notifications-footer" href="messages.html">Read All Messages</a>
             </div>
          </li>
          <li class="nav-item dropdown no-arrow no-caret dropdown-user">
             <a class="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownUserImage" href="javascript:void(0);" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
                <img
                  :src="'https://api.dex.proelean.com/' + user.image"
                  class="dropdown-user-img img-full"
                  alt="profile_img"
                /> </a>
             <div class="dropdown-menu dropdown-menu-right border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownUserImage">
                <h6 class="dropdown-header d-flex align-items-center">
                   <img
                  :src="'https://api.dex.proelean.com/' + user.image"
                  class="dropdown-user-img img-full"
                  alt="profile_img"
                />
                   <div class="dropdown-user-details">
                      <div class="dropdown-user-details-name">{{ userInfo.username  }}</div>
                      <div class="dropdown-user-details-email">{{ userInfo.email  }}</div>
                   </div>
                </h6>
                <div class="dropdown-divider"></div>
                <router-link class="dropdown-item" to="/profile">
                   <div class="dropdown-item-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings">
                         <circle cx="12" cy="12" r="3"></circle>
                         <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                      </svg>
                   </div>
                   Account
                </router-link>

                  <div class="d-sm-none">
                     <router-link class="dropdown-item" to="/buyer/jobs">Manage Job</router-link>
                  </div>
                  <div class="d-sm-none">
                     <router-link class="dropdown-item" to="/buyer/manage_order">Manage Order</router-link>
                  </div>
                  <div v-if="userInfo.isFreelancer">
                    <div class="d-sm-none">
                       <router-link class="dropdown-item" to="/seller/manage_service">Manage services </router-link>
                    </div>
                    <div class="d-sm-none">
                       <router-link class="dropdown-item" to="/seller/buyer_requests">Buyer Requests</router-link>
                    </div>
                  </div>
              
                <button class="dropdown-item" @click="handleLogout">
                   <div class="dropdown-item-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out">
                         <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                         <polyline points="16 17 21 12 16 7"></polyline>
                         <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                   </div>
                   Logout
                </button>
             </div>
          </li>
      </ul>

      <ul class="navbar-nav align-items-center ml-auto" v-else>
          <!-- @else -->
               <!-- login Button -->
               <li class="nav-item dropdown no-arrow no-caret dropdown-user m-2">
               <router-link class="btn btn-success" to="/login">Login</router-link>
               </li>

               <!-- Signup Button -->
               <li class="nav-item dropdown no-arrow no-caret dropdown-user">
                <router-link class="btn btn-success" to="/register">Register</router-link>
               </li>
          <!-- @endif -->
      </ul>

          <li class="nav-item dropdown no-arrow no-caret dropdown-user mx-2">
                  <a class="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownUserImage" href="javascript:void(0);" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-globe" viewBox="0 0 16 16">
  <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
</svg>
               </a>
               <div class="dropdown-menu dropdown-menu-right border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownUserImage">                     
                  <a class="dropdown-item" href="#">
                     <div class="dropdown-item-icon">
                        
                     </div>
                    English
                  </a>
                  <a class="dropdown-item" href="#">
                     <div class="dropdown-item-icon">
                        
                     </div>
                     Suomalainen
                  </a>
                  <a class="dropdown-item" href="#">
                     <div class="dropdown-item-icon">
                        
                     </div>
                   Türkçe
                  </a>
               </div>
            </li> 
               <!-- languages li end -->
       </ul>
    </div>
 </nav>
</template>

<script>
import Api from "@/services/API";
import { useRouter } from "vue-router";
import { computed, onMounted, ref } from "@vue/runtime-core";
import { useStore } from 'vuex';

export default {
   setup(){
      const store = useStore()
      const router = useRouter();
      const keywords = ref(null);
      const handleLogout = async() => {
         const response = await Api.post("logout");
         if(response.status===200){
            localStorage.removeItem('PROELEAN_TOKEN');
            localStorage.removeItem('userInfo');
            router.go()
         }
      }
      onMounted(() => {
         const isLoggedIn = localStorage.getItem('PROELEAN_TOKEN');
         if(isLoggedIn)
            store.dispatch('getNotification')         
      })

      const handleSearch = () => {
         router.push(`/gigs?q=${keywords.value}`)
         keywords.value=''
      }

      
      return {
         handleLogout,
         handleSearch,
         keywords,
         userInfo: computed( () => store.getters.getAuthUser),
         userNotification: computed( () => store.getters.getUserNotifications),
         user: computed(() => store.getters.getAuthUser),
      }
   }
};
</script>

<style>
</style>
