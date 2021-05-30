import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { AppContainer } from "./AppContainer";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

global.store = store;

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
