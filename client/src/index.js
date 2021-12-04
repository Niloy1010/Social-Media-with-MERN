import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import Pusher from "pusher-js";
import store from "./store";
import { clearCurrentProfile } from "./actions/profileActions";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import setAuthToken from "./utils/setAuthToken";
import { logoutUser, setCurrentUser } from "./actions/authActions";
import jwt_decode from "jwt-decode";
import { getCurrentUser } from "./actions/authActions";
let notificationIcon = 0;
var pusher = new Pusher("b0336431ec4d3b049e2c", {
  cluster: "us2",
});

var channel = pusher.subscribe("notification");

channel.bind("push-notification", function (data) {
  store.dispatch(getCurrentUser());
});
//check for token
if (localStorage.jwtToken) {
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
    setTimeout(function () {
      document.location.href = "/login";
    }, 500);
  }
}
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
