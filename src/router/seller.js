import SellerDashboard from '@/views/Seller/Dashboard.vue'
import SellerServices from '@/views/Seller/SellerServices.vue'
import OrdersNew from '@/views/Seller/OrdersNew.vue'
import Notifications from '@/views/Seller/Notifications.vue'
import Account from '@/views/Seller/Account.vue'
import Settings from '@/views/Seller/Settings.vue'
import Analytics from '@/views/Seller/Analytics.vue'
import BuyerRequestsnew from '@/views/Seller/BuyerRequestsnew.vue'
import CreateGig from '@/views/Seller/CreateGig.vue'
import Payments from '@/views/Seller/Payments.vue'
import UpdateService from '@/views/Seller/UpdateService.vue'
import ServiceDetail from '@/views/Seller/ServiceDetail.vue'
import EditProfile from '@/views/Seller/EditProfile.vue'
import ChangePassword from '@/views/Seller/ChangePassword.vue'


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
        path: '/dashboard/BuyerRequestsnew',
        name: 'BuyerRequestsnew',
        component: BuyerRequestsnew,
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