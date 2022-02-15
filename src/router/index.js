import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
import BecomeSeller from '../views/Become-Seller.vue'
import Profile from '../views/Profile.vue'
import ManageGig from '../views/Seller/ManageGig.vue'
import ServiceDetail from '../views/ServiceDetail.vue'

import Buyer from '../views/Buyer.vue'
import CreateJob from '../components/buyer/CreateJob.vue'
import Jobs from '../components/buyer/AllJobs.vue'
import AllOrders from '../components/buyer/AllOrders.vue'

import UpdateGig from '../components/seller/UpdateGig.vue'
import CreateGig from '@/components/seller/CreateGig.vue'
import BuyerRequests from '../views/Seller/BuyerRequests.vue'


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
    path: '/seller/manage_gig',
    name: 'ManageGig',
    component: ManageGig
  },
  {
    path: '/seller/buyer_requests',
    name: 'BuyerRequests',
    component: BuyerRequests
  },
  {
    path: '/update_gig/:id',
    name: 'UpdateGig',
    component: UpdateGig
  },
  {
    path: '/seller/create_gig',
    name: 'CreateGig',
    component: CreateGig
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
    path: '/buyer',
    name: 'Buyer',
    component: Buyer,
    children:[
      {
        path: 'create_job',
        name: 'CreateJob',
        component: CreateJob,
      },
      {
        path: 'jobs',
        name: 'Jobs',
        component: Jobs,
      },
      {
        path: 'manage_order',
        name: 'ManageOrder',
        component: AllOrders,
      },
    ]
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
