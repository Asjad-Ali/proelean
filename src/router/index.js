import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
import BecomeSeller from '../views/Become-Seller.vue'
import Profile from '../views/User/profile.vue'
import createGig from '../views/Seller/CreateGig.vue'
//import Gigs from '../views/gigs-list.vue'


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
    path: '/createGig',
    name: 'createGig',
    component: createGig
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
    path: '/seller_gigs',
    name: 'sellerGigs',
    component: () => import('../views/gigs-list.vue'),
   
  },
  {
    path: '/gigs',
    name: 'Gigs',
    component: () => import('../views/serviceList.vue'),
   
  },
  {
    path: '/gig-detail',
    name: 'gigDetail',
    component: () => import('../views/serviceDetail.vue'),
    
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


router.beforeEach((to, from, next) => {  
  var isAuthenticated = false;
  if (localStorage.getItem('PROELEAN_TOKEN'))
    isAuthenticated = true;
  else
    isAuthenticated = false;

  if (['/login', '/register', ].includes(to.path) || isAuthenticated) {
    next(); // allow to enter route
  } else {
    next('/login'); // go to '/login';
  }
})


export default router
