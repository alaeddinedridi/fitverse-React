import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider >
        <BrowserRouter>
          <App />
        </BrowserRouter>
     </PayPalScriptProvider>
     </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

