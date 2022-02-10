// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyBxlL9xO0l3jPkS42ojfY6eOIYn85Ycq94",
        authDomain: "pro-elean.firebaseapp.com",
        projectId: "pro-elean",
        storageBucket: "pro-elean.appspot.com",
        messagingSenderId: "41257031786",
        appId: "1:41257031786:web:24583168701570a665d213",
        measurementId: "G-FY1RQD7350"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();


messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.data.subject;
    const notificationOptions = {
      body: payload.data.body,
      icon: '/assets/images/logo.svg'
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });
  