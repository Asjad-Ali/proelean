import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
import BecomeSeller from '../views/Become-Seller.vue'
import UserProfile from '../views/User/profile.vue'
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
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile,
  
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
  // {
  //   path: '/about',
  //   name: 'About',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
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
