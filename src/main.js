import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Toaster from '@meforma/vue-toaster';
import moment from 'moment'


//createApp(App).use(Toaster,{timeout: 4000}).use(store).use(router).mount('#app')

const app = createApp(App)
app.config.globalProperties.$filters = {
    timeAgo(date) {
        return moment(date).fromNow()
    },
}
app.use(router).use(store).use(Toaster,{timeout: 4000})
app.mount('#app')