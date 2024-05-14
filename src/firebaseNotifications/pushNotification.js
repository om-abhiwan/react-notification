import axios from "axios"
// Firebase Cloud Messaging (FCM) API endpoint and server key
const FCM_ENDPOINT = "https://fcm.googleapis.com/fcm/send";
const FCM_SERVER_KEY =
    "AAAAmjhe9Js:APA91bGw-n3PYwzJGkIGJeRsAcwBzZN0qiB0lI5c0U3EgKM6kqh0p2NiuRl3CR3lpjV4jd00Y2o9_rvl13RGjo7pXsMW0bwUB_GkQ6yekRlN0udCAlbyVttRD4XQrHtiQKG_FpmzjAif";




const pushMessage = async () => {

    try {
        const data = {
            "to": localStorage.getItem('fcmToken'),
            "notification": {
                "body": "Test Notification Body",
                "title": "Test Notification Title",
                "sound": "default"
            }
        };

        const response = await axios.post(FCM_ENDPOINT, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `key=${FCM_SERVER_KEY}`,
            },
        });

        console.log("Notification sent:", response.data);
    } catch (error) {
        console.error("Error sending notification:", error);
    }
};

export { pushMessage };
