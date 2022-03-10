import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Auth/Login.vue'
import Register from '@/views/Auth/Register.vue'
import Forgot from '@/views/Auth/Forgot.vue'
import BecomeSeller from '@/views/Become-Seller.vue'
import Profile from '@/views/Profile.vue'
import ServiceDetail from '@/views/ServiceDetail.vue'

import CreateJob from '@/views/Buyer/CreateJob.vue'
import Jobs from '@/views/Buyer/AllJobs.vue'
import AllOrders from '@/views/Buyer/AllOrders.vue'

import CreateService from '@/views/Seller/CreateService.vue'
import ManageService from '@/views/Seller/ManageService.vue'
import UpdateService from '@/views/Seller/UpdateService.vue'
import BuyerRequests from '@/views/Seller/BuyerRequestSection.vue'
import FavouriteService from '@/views/Seller/FavouriteService.vue'


// import SellerOldDashboard from '@/components/SellerDashboard.vue'
import SellerDashboard from '@/views/Seller/Dashboard.vue'
import SellerGigs from '@/views/Seller/Gigs.vue'
import SellerOrders from '@/views/Seller/Orders.vue'
import SellersGigs from '@/views/Seller/Gigs.vue'
import OrdersNew from '@/views/Seller/OrdersNew.vue'
import Notifications from '@/views/Seller/Notifications.vue'
import Account from '@/views/Seller/Account.vue'
import Settings from '@/views/Seller/Settings.vue'
import Analytics from '@/views/Seller/Analytics.vue'
import BuyerRequestsnew from '@/views/Seller/BuyerRequestsnew.vue'
import CreateGig from '@/views/Seller/CreateGig.vue'
import Payments from '@/views/Seller/Payments.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/dashboard/sellers-gigs',
    name: 'SellersGigs',
    component: SellersGigs,
  },
  {
    path: '/dashboard/payments',
    name: 'Payments',
    component: Payments,
  },
  {
    path: '/dashboard/create-gig',
    name: 'CreateGig',
    component: CreateGig,
  },
  {
    path: '/dashboard/BuyerRequestsnew',
    name: 'BuyerRequestsnew',
    component:BuyerRequestsnew,
  },
  {
    path: '/dashboard/analytics',
    name: 'Analytics',
    component: Analytics,
  },

  {
    path: '/dashboard/settings',
    name: 'Settings',
    component: Settings,
  },
  {
    path: '/dashboard/account',
    name: 'Account',
    component: Account,
  },
  {
    path: '/dashboard/notifications',
    name: 'Notifications',
    component: Notifications,
  },
  {
    path: '/dashboard/orders-new',
    name: 'OrdersNew',
    component: OrdersNew,
  },
  {
    path: '/seller-orders',
    name: 'SellerOrders',
    component: SellerOrders,
  },

  {
    path: '/dashboard',
    name: 'sellerDashboard',
    component: SellerDashboard,
  },
 
  {
    path: '/dashboard/chat',
    name: 'SellerChat',
    component: () => import(/* webpackChunkName: "chat" */'@/views/Chat.vue'),
  },

  {
    path: '/seller-dashboard',
    name: 'SellerDashboard',
    component: SellerDashboard,
  },
  {
    path: '/seller-gigs',
    name: 'SellerGigs',
    component: SellerGigs,
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
    path: '/seller/create_service',
    name: 'CreateService',
    component: CreateService
  },
  {
    path: '/seller/manage_service',
    name: 'ManageService',
    component: ManageService
  },
  {
    path: '/dashboard/update_service/:id',
    name: 'UpdateService',
    component: UpdateService
  },
  {
    path: '/seller/buyer_requests',
    name: 'BuyerRequests',
    component: BuyerRequests
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
    path: '/buyer/jobs',
    name: 'Jobs',
    component: Jobs,
  },
  {
    path: '/buyer/manage_order',
    name: 'ManageOrder',
    component: AllOrders,
  },

  {
    path: '/gigs/:slug?',
    name: 'Gigs',
    component: () => import(/* webpackChunkName: "services" */'@/views/Services.vue'),
  },
  {
    path: '/gig-detail/:id',
    name: 'gigDetail',
    component: ServiceDetail,
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import(/* webpackChunkName: "chat" */'@/views/Chat.vue'),
  },
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
