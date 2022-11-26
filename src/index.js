import React from "react";
import ReactDOM from "react-dom";

/* redux */
import { Provider } from "react-redux";
import store from "./store";

/* components */
import App from "./App";
import reportWebVitals from "./reportWebVitals";

/* styling */
import "./index.css";
import "./bootstrap.min.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
