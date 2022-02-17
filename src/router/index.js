import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Auth/Login.vue'
import Register from '@/views/Auth/Register.vue'
import BecomeSeller from '@/views/Become-Seller.vue'
import Profile from '@/views/Profile.vue'
import ServiceDetail from '@/views/ServiceDetail.vue'

import CreateJob from '@/components/buyer/CreateJob.vue'
import Jobs from '@/components/buyer/AllJobs.vue'
import AllOrders from '@/components/buyer/AllOrders.vue'

import CreateService from '@/components/seller/CreateService.vue'
import ManageService from '@/components/seller/ManageService.vue'
import UpdateService from '@/components/seller/UpdateService.vue'
import BuyerRequests from '@/components/seller/BuyerRequestSection.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
    path: '/seller/update_service/:id',
    name: 'UpdateService',
    component: UpdateService
  },
  {
    path: '/seller/buyer_requests',
    name: 'BuyerRequests',
    component: BuyerRequests
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
    path: '/gigs',
    name: 'Gigs',
    component: () => import('../views/Services.vue'),
  },
  {
    path: '/gig-detail/:id',
    name: 'gigDetail',
    component: ServiceDetail,
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import('../views/Chat.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


router.beforeEach((to, from, next) => {  
  var isAuthenticated = localStorage.getItem('PROELEAN_TOKEN') ? true : false;

  if (['/login', '/register', ].includes(to.path) || isAuthenticated) {
    next(); // allow to enter route
  } else {
    next('/login'); // go to '/login';
  }
})


export default router
