import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'



import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/authorization/Register';
import Login from './components/authorization/Login';

class App extends Component {
  render() {
    return(
      <div>
      <Router>     
          <Navbar />      
             <div className="container">
              <Route exact path="/" component={Landing} /> 
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
             </div>
          </Router>

          <Footer />
      </div>
    )
  }
  
  
}

export default App;
