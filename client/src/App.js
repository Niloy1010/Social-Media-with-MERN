import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/authorization/Register";
import Login from "./components/authorization/Login";

import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/common/PrivateRoute";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import NotFound from "./components/not-found/NotFound";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import { getCurrentUser } from "./actions/authActions";
import NotificationsComponent from "./components/notifications/Notifications";
import { Notifications } from "react-push-notification";

import { connect } from "react-redux";
// Enable pusher logging - don't include this in production

class App extends Component {
  render() {
    return (
      <div>
        <Notifications />

        <Router>
          {this.props.profile.profile?.user || this.props.profile.profiles ? (
            <Navbar />
          ) : null}
          <div className="container">
            <Route exact path="/" component={Register} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
            </Switch>

            <Switch>
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
            </Switch>

            <Switch>
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
            </Switch>

            <Switch>
              <PrivateRoute exact path="/posts" component={Posts} />
            </Switch>

            <Switch>
              <PrivateRoute exact path="/post/:id" component={Post} />
            </Switch>

            <PrivateRoute exact path="/profiles" component={Profiles} />

            <PrivateRoute exact path="/profile/:handle" component={Profile} />

            <PrivateRoute
              exact
              path="/notifications"
              component={NotificationsComponent}
            />

            <Route exact path="/not-found" component={NotFound} />
          </div>
        </Router>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps)(App);
