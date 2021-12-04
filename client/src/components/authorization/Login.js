import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import styles from "./login.module.css";
import logo from "../../img/Logo.png";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      guestEmail: "niloy@niloy.com",
      guestPassword: "Niloyniloy10",
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChangeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSubmitForm = (e) => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData);
  };
  guestLogin = () => {
    const userData = {
      email: "niloy@niloy.com",
      password: "Niloyniloy10*",
    };

    this.props.loginUser(userData);
  };
  render() {
    const { errors } = this.state;
    return (
      <>
        <div className={`row justify-content-around ${styles.signIn}`}>
          <div className={`col-sm-4  text-center mb-5 `}>
            <img
              src={logo}
              alt="Logo"
              height="150px"
              width="150px"
              className="my-5"
            />
            <h5 className={`${styles.text} font-weight-bold`}>
              Engage & Build Relationships
            </h5>

            <button onClick={this.guestLogin}>Log In as Guest</button>
          </div>
          <div className={`${styles.container} col-sm-8 align-right`}>
            <h3>Sign In</h3>
            <p className="lead">
              <i className="fa fa-user"></i> Sign into your Account
            </p>
            <form
              noValidate
              className="form"
              onSubmit={this.onSubmitForm}
              className={styles.contact}
            >
              <TextFieldGroup
                name="email"
                placeholder="Email Address"
                type="email"
                value={this.state.email}
                onChange={this.onChangeInput}
                error={errors.email}
              />

              <TextFieldGroup
                name="password"
                placeholder="Password"
                type="password"
                value={this.state.password}
                onChange={this.onChangeInput}
                error={errors.password}
              />

              <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
              Don't have an account?{" "}
              <Link to="/register" className={"${styles.a}"}>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return { auth: state.auth, errors: state.errors };
};

export default connect(mapStateToProps, { loginUser })(Login);
