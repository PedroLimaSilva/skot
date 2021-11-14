/* eslint-disable no-extend-native */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

String.prototype.splice = function(index, count, add) {
  if (index < 0) {
      index += this.length;
      if (index < 0)
          index = 0;
  }
  return this.slice(0, index) + (add || "") + this.slice(index + count);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
