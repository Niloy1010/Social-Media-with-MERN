import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import {logoutUser, setCurrentUser} from './actions/authActions';
import jwt_decode from 'jwt-decode';




import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/authorization/Register';
import Login from './components/authorization/Login';

import Dashboard from './components/dashboard/Dashboard';
import { clearCurrentProfile } from './actions/profileActions';
import PrivateRoute from './components/common/PrivateRoute'
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/not-found/NotFound';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import {getCurrentUser} from './actions/authActions';
import NotificationsComponent from './components/notifications/Notifications';
import { Notifications } from 'react-push-notification';

import Pusher from 'pusher-js';
// Enable pusher logging - don't include this in production
let notificationIcon=0;
var pusher = new Pusher('b0336431ec4d3b049e2c', {
  cluster: 'us2'
});

var channel = pusher.subscribe('notification');

channel.bind('push-notification', function(data) {
  console.log("PUSH");
  store.dispatch(getCurrentUser());
});
//check for token
if(localStorage.jwtToken) {
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now()/ 1000;
  if(decoded.exp < currentTime) {
    console.log(currentTime);
    console.log(decoded.exp);
    //logout
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
    setTimeout(function(){document.location.href = "/login"},500);
  }

}

class App extends Component {
  render() {
    return(
      <div>
        <Notifications />
        <Provider store={store}>
      <Router>     
          <Navbar />      
             <div className="container">
              <Route exact path="/" component={Landing} /> 
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
               <Switch>
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              </Switch>

              <Switch>
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              </Switch>

              
              <Switch>
              <PrivateRoute exact path="/add-experience" component={AddExperience} />
              </Switch>
              <Switch>
              <PrivateRoute exact path="/add-education" component={AddEducation} />
              </Switch>

              <Switch>
              <PrivateRoute exact path="/posts" component={Posts} />
              </Switch>

              <Switch>
              <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>

              <PrivateRoute exact path="/profiles" component={Profiles} />
              
              <PrivateRoute exact path="/profile/:handle" component={Profile} />

              
              <PrivateRoute exact path="/notifications" component={NotificationsComponent} />

              
              <Route exact path="/not-found" component={NotFound} />
            



             </div>
          </Router>

          <Footer />
          </Provider>
      </div>
    )
  }
  
  
}

export default App;
