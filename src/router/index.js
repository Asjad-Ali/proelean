import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Auth/Login.vue'
import Register from '@/views/Auth/Register.vue'
import Forgot from '@/views/Auth/Forgot.vue'
import BecomeSeller from '@/views/Become-Seller.vue'
import Profile from '@/views/Profile.vue'
import About from '@/views/About.vue'
import Purchase from '@/views/Purchase.vue'

import CreateJob from '@/views/Buyer/CreateJob.vue'
import Jobs from '@/views/Buyer/AllJobs.vue'

import BuyerServiceDetail from '@/views/Buyer/BuyerServiceDetail.vue'
import ManageOrder from '@/views/Buyer/AllOrders.vue'


import BuyerAccount from '@/views/Seller/Account.vue'
import BuyerEditProfile from '@/views/Seller/EditProfile.vue'
import SellerOrders from '@/views/Seller/Orders.vue'


import ManageService from '@/views/Seller/ManageService.vue'
import FavouriteService from '@/views/Seller/FavouriteService.vue'


import sellerRoutes from './seller.js'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/seller-orders',
    name: 'SellerOrders',
    component: SellerOrders,
  },

  {
    path: '/buyer-account',
    name: 'BuyerAccount',
    component: BuyerAccount,
  },
  {
    path: '/buyer/edit-profile',
    name: 'BuyerEditProfile',
    component: BuyerEditProfile,
  },
  {
    path: '/gig-detail/:id',
    name: 'BuyerServiceDetail',
    component: BuyerServiceDetail,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/forgot',
    name: 'Forgot',
    component: Forgot
  },

  {
    path: '/become_seller',
    name: 'BecomeSeller',
    component: BecomeSeller,
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/About',
    name: 'About',
    component: About,
  },

  {
    path: '/seller/manage_service',
    name: 'ManageService',
    component: ManageService
  },
  {
    path: '/seller/favourite_service',
    name: 'FavouriteService',
    component: FavouriteService
  },

  {
    path: '/buyer/create_job',
    name: 'CreateJob',
    component: CreateJob,
  },
  {
    path: '/buyer/manage_order',
    name: 'ManageOrder',
    component: ManageOrder,
  },
  {
    path: '/buyer/jobs',
    name: 'Jobs',
    component: Jobs,
  },
  {
    path: '/gigs/:slug?',
    name: 'Gigs',
    component: () => import(/* webpackChunkName: "services" */'@/views/Services.vue'),
  },
  {
    path: '/purchase/:id',
    name: 'Purchase',
    component: Purchase,
  },
  {
    path: '/chat/:id?',
    name: 'Chat',
    component: () => import(/* webpackChunkName: "chat" */'@/views/Chat.vue'),
  },
  ...sellerRoutes
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


router.beforeEach((to, from, next) => {  
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  
  var isAuthenticated = localStorage.getItem('PROELEAN_TOKEN') ? true : false;
  if (['/login', '/register', '/forgot'].includes(to.path) || isAuthenticated) {
    next(); // allow to enter route
  } else {
    next('/login'); // go to '/login';
  }
})


export default router
