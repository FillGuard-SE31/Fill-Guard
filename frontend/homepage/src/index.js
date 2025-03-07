// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";
// import "bootstrap/dist/css/bootstrap.min.css";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );

// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const paypalOptions = {
  "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID || "sb",
  currency: "USD",
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider options={paypalOptions}>
        <BrowserRouter>
          <App />
          <ToastContainer />
        </BrowserRouter>
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
