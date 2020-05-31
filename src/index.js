import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
      <script>if(!(window.Promise&&[].includes&&Object.assign&&window.Map)){document.write('<script src="https://polyfill.io/v3/polyfill.min.js?features=Array.prototype.flatMap%2CArray.prototype.includes%2Cdefault%2CArray.prototype.flat\n"></scr'+'ipt>')}</script>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
