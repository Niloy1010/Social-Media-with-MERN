import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
import styles from "./navbar.module.css";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { getCurrentProfile } from "../../actions/profileActions";
import { getCurrentUser } from "../../actions/authActions";
import isEmpty from "../../validation/is-empty";
import NotificationsActiveOutlinedIcon from "@material-ui/icons/NotificationsActiveOutlined";
import logo from "../../img/Logo.png";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { withRouter } from "react-router-dom";

import { getProfileByHandle } from "../../actions/profileActions";
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: null,
    };
  }
  handleProfileChange = () => {
    this.props.clearCurrentProfile();
    this.props.getCurrentProfile();
  };

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  };
  static getDerivedStateFromProps(props, state) {
    return state;
  }
  componentDidMount() {
    this.props.getCurrentUser();
  }

  render() {
    const { profile } = this.props;

    const handle = profile?.profile?.handle;
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <div className={`${styles.myNavbar} pt-2 pb-2 mb-5`}>
        <div className={`${styles.logo} pl-2`}>
          <img src={logo} height="50px" width="auto" />
        </div>
        <Link to="/posts" className={styles.item}>
          <HomeOutlinedIcon />
        </Link>

        <Link
          className={styles.item}
          to={`/profile/${handle}`}
          onClick={this.handleProfileChange}
        >
          <AccountCircleOutlinedIcon />
        </Link>
        <Link to="/notifications" className={styles.item}>
          {user.hasNotification ? (
            <NotificationsActiveOutlinedIcon />
          ) : (
            <NotificationsNoneOutlinedIcon />
          )}
        </Link>

        <div className={styles.search}>
          <span onClick={this.onLogoutClick} className={styles.logout}>
            <ExitToAppIcon /> Logout
          </span>
        </div>
      </div>
    );

    return (
      <div>
        <div>{isAuthenticated ? authLinks : null}</div>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default withRouter(
  connect(mapStateToProps, {
    logoutUser,
    clearCurrentProfile,
    getCurrentProfile,
    getCurrentUser,
    getProfileByHandle,
  })(Navbar)
);
