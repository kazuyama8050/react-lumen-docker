import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import All from './All';
import App from './App';
// import Form from './Form';
import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// ReactDOM.render(
//   <React.StrictMode>
//     <Form />
//   </React.StrictMode>,
//   document.getElementById('form')
// );
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('all')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
