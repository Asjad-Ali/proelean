import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
import BecomeSeller from '../views/Become-Seller.vue'
import Profile from '../views/Profile.vue'
import ManageGig from '../views/Seller/ManageGig.vue'
import ServiceDetail from '../views/ServiceDetail.vue'
import ManageJob from '../views/Buyer/ManageJob.vue'
import CreateJob from '../components/manageJob/CreateJob.vue'
import ManageOrder from '../views/Buyer/ManageOrder.vue'
import UpdateGig from '../components/seller/UpdateGig.vue'
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
    path: '/buyer/create_job',
    name: 'CreateJob',
    component: CreateJob,
  },
  {
    path: '/buyer/manage_job',
    name: 'ManageJob',
    component: ManageJob,
  },
  {
    path: '/buyer/manage_order',
    name: 'ManageOrder',
    component: ManageOrder,
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
