// Firebase Cloud Messaging Configuration File.
// Read more at https://firebase.google.com/docs/cloud-messaging/js/client && https://firebase.google.com/docs/cloud-messaging/js/receive

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyBCeFd3J0jW8Wl_fu_TYucWUIJi2W-es8s",
    authDomain: "react-notification-c8881.firebaseapp.com",
    projectId: "react-notification-c8881",
    storageBucket: "react-notification-c8881.appspot.com",
    messagingSenderId: "662370710683",
    appId: "1:662370710683:web:114229c855e9b6b4ec423e",
    measurementId: "G-2CJRRC3DQ3"
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
    // The method getToken(): Promise<string> allows FCM to use the VAPID key credential
    // when sending message requests to different push services
    return getToken(messaging, {
        vapidKey: `BPyDeJsSAqUjzcYY4c7687-diHST8e6xaqxE-8vYZOpgTWz4syOzNP0vCNDxK98ywmkdx17WkuDncPi7EewhTfI` }) //to authorize send requests to supported web push services
        .then((currentToken) => {
            if (currentToken) {
                console.log('current token for client: ', currentToken);

                if (localStorage.getItem('fcmToken') && currentToken !== localStorage.getItem('fcmToken')) {
                    localStorage.setItem('fcmToken', currentToken);

                }

                else if (!localStorage.getItem('fcmToken')) {
                    localStorage.setItem('fcmToken', currentToken);

                }


            } else {
                console.log('No registration token available. Request permission to generate one.');
            }
        })
        .catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
        });
};

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker `messaging.onBackgroundMessage` handler.
export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });


