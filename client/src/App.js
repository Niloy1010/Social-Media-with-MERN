import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
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
    //logout
    store.dispatch(logoutUser);
    window.location.href('/login');
  }

}


class App extends Component {
  render() {
    return(
      <div>
        <Provider store={store}>
      <Router>     
          <Navbar />      
             <div className="container">
              <Route exact path="/" component={Landing} /> 
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
             </div>
          </Router>

          <Footer />
          </Provider>
      </div>
    )
  }
  
  
}

export default App;
