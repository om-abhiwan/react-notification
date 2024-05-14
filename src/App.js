import React, { useEffect, useState } from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import Notification from './firebaseNotifications/Notification';
import logo from './logo.svg';
import './App.css';

function App() {

  const [copyMessage, setCopyMessage] = useState('');

  const requestNotificationPermission = () => {
    if ('Notification' in window) {
      // Check if the browser supports notifications
      window.Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          console.log("Permission granted for Notification..")
        } else if (permission === "denied") {
          // If permission is denied, display a message on the screen
          console.log("Permission denied for Notification...");
          document.body.insertAdjacentHTML('beforebegin', '<p style="color:red;text-align:center;">Notification permission denied. Please allow notification permission to use this feature.</p>');
        } else {
          // If permission is neither granted nor denied, request permission again
          window.Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
              console.log("Permission granted for Notification..")
            } else if (permission === "denied") {
              // If permission is denied, display a message on the screen
              console.log("Permission denied for Notification...");
              document.body.insertAdjacentHTML('beforebegin', '<p style="color:red; text-align:center;">Notification permission denied. Please allow notification permission to use this feature.</p>');
            }
          });
        }
      });
    } else {
      console.log('No Push API Support!');
    }
  };


  useEffect(() => {
    requestNotificationPermission();
  }, []);


  const myFunction = () => {
    const fcmKey = document.getElementById('fcmKey').innerText;


    navigator.clipboard
      .writeText(fcmKey)
      .then(() => {
        setCopyMessage('Text copied to clipboard!');
        setTimeout(() => {
          setCopyMessage('');
        }, 1000); // Clear the message after 3 seconds
      })
      .catch(err => {
        console.error('Unable to copy text to clipboard:', err);
        setCopyMessage('Failed to copy text to clipboard');
        setTimeout(() => {
          setCopyMessage('');
        }, 3000); // Clear the message after 3 seconds
      });



  };



  const test = () => {
    console.log("Test bhai ")
  }



  return (
    <div className="App">
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Zoom}
        closeButton={false}
      />
      <Notification />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>v.2 <code>src/App.js</code> and save to reload.</p>
        <p>FCM KEY :- <span id="fcmKey">{localStorage.getItem('fcmToken')}</span></p>

        {
          localStorage.getItem("fcmToken") ? <button onClick={myFunction}>Copy text</button> : <button onClick={myFunction} >Enable Location</button>
        }

        {/* <button onClick={myFunction}>Copy text</button> */}



        <p>{copyMessage && <p>{copyMessage}</p>}</p>
      </header>
    </div>
  );
}

export default App;
