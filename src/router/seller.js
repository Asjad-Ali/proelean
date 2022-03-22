import SellerDashboard from '@/views/Seller/Dashboard.vue'
import SellerServices from '@/views/Seller/SellerServices.vue'
import Orders from '@/views/Seller/Orders.vue'
import Notifications from '@/views/Seller/Notifications.vue'
import Account from '@/views/Seller/Account.vue'
import Settings from '@/views/Seller/Settings.vue'
import Analytics from '@/views/Seller/Analytics.vue'
import BuyerRequests from '@/views/Seller/BuyerRequests.vue'
import CreateGig from '@/views/Seller/CreateGig.vue'
import Payments from '@/views/Seller/Payments.vue'
import UpdateService from '@/views/Seller/UpdateService.vue'
import ServiceDetail from '@/views/Seller/ServiceDetail.vue'
import EditProfile from '@/views/Seller/EditProfile.vue'
import ChangePassword from '@/views/Seller/ChangePassword.vue'
import OrderDetails from '@/views/Seller/OrderDetails.vue'


const sellerRoutes = [
    {
        path: '/dashboard',
        name: 'sellerDashboard',
        component: SellerDashboard,
    },

    {
        path: '/dashboard/chat/:id?',
        name: 'SellerChat',
        component: () => import(/* webpackChunkName: "chat" */'@/views/Chat.vue'),
    },

    {
        path: '/seller-dashboard',
        name: 'SellerDashboard',
        component: SellerDashboard,
    },
    {
        path: '/dashboard/order-details/:id',
        name: 'OrderDetails',
        component: OrderDetails,
    },
    {
        path: '/dashboard/sellers-services',
        name: 'SellerServices',
        component: SellerServices,
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
        path: '/dashboard/buyer_requests',
        name: 'BuyerRequests',
        component: BuyerRequests,
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
        path: '/dashboard/orders',
        name: 'Orders',
        component: Orders,
    },
    {
        path: '/dashboard/update_service/:id',
        name: 'UpdateService',
        component: UpdateService
    },
    {
        path: '/dashboard/gig-detail/:id',
        name: 'GigDetail',
        component: ServiceDetail,
    },
    {
        path: '/dashboard/edit-profile',
        name: 'EditProfile',
        component: EditProfile,
    },
    {
        path: '/dashboard/change_password',
        name: 'ChangePassword',
        component: ChangePassword,
    },
];
export default sellerRoutes;