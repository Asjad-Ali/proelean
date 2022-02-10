import { createApp } from 'vue'
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Toaster from '@meforma/vue-toaster';
import moment from 'moment'
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const app = createApp(App)

// Firebase configuration options
const firebaseConfig = {
    apiKey: "AIzaSyBxlL9xO0l3jPkS42ojfY6eOIYn85Ycq94",
    authDomain: "pro-elean.firebaseapp.com",
    projectId: "pro-elean",
    storageBucket: "pro-elean.appspot.com",
    messagingSenderId: "41257031786",
    appId: "1:41257031786:web:24583168701570a665d213",
    measurementId: "G-FY1RQD7350"
};

initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);

const vapidKey = 'BDcOIhQp9-XQGw92MxRQRl0uQkAd9iStad2Gg7fMMby440E6HhxhHmka-882LyUF7jd4S4C3LPVbJh5qmHYGoc8';

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging();
getToken(messaging, { vapidKey: vapidKey }).then((currentToken) => {
    if (currentToken) {
        const prevToken = localStorage.getItem('FCM_TOKEN');
        if(currentToken !== prevToken) {
            // Send the token to your server and update the UI if necessary
            localStorage.setItem('FCM_TOKEN',currentToken)
        }

    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
  });

  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
  });



//createApp(App).use(Toaster,{timeout: 4000}).use(store).use(router).mount('#app')

app.config.globalProperties.$filters = {
    timeAgo(date) {
        return moment(date).fromNow()
    },
}
app.use(router).use(store).use(Toaster,{timeout: 4000})
app.mount('#app')