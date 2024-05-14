import logo from './logo.svg';
import './App.css';
import { ToastContainer, Zoom } from "react-toastify";
import Notification from "./firebaseNotifications/Notification";
import { pushMessage } from './firebaseNotifications/pushNotification';
import { useEffect, useState } from 'react';




function App() {

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     pushMessage();
  //   }, 10000); // 5000 milliseconds = 5 seconds

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  const [copyMessage, setCopyMessage] = useState('');

  const myFunction = () => {
    const fcmKey = document.getElementById('fcmKey').innerText;
    navigator.clipboard.writeText(fcmKey)
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






  return (


    <>
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
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>

          <p>FCM KEY :- <span id='fcmKey'>{localStorage.getItem('fcmToken')}</span>  </p>
          <button onClick={myFunction}>Copy text</button>
          <p>{copyMessage && <p>{copyMessage}</p>}</p>

        </header>
      </div>




    </>



  );
}

export default App;
