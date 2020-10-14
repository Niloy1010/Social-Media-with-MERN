import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { loginUser} from '../../actions/authActions';
import classnames from 'classnames';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            email : "",
            password: "",
            errors: {}
        }
    }

    componentDidMount() {
      if(this.props.auth.isAuthenticated) {
        this.props.history.push('/timeline');
      }
    }

    componentWillReceiveProps(nextProps) {

      if(nextProps.auth.isAuthenticated) {
        this.props.history.push('/timeline');
      }
      if(nextProps.errors) {
        this.setState({
          errors: nextProps.errors
        })
      }
    }

    onChangeInput = (e) => {
        console.log(e.target)
        this.setState ({
            [e.target.name] : e.target.value
        })
    }
    onSubmitForm = (e) => {
        e.preventDefault();
        const userData = {
            email : this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData);
    }
    render() {

      const {errors} = this.state;
        return (
    <div>
    <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fa fa-user"></i> Sign into Your Account</p>
      <form noValidate className="form" onSubmit ={this.onSubmitForm}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value = {this.state.email}
            onChange = {this.onChangeInput}
            className = {classnames('form-control form-control-lg', {
              "is-invalid" : errors.email
            })}

            required
          />
            {errors.email ? (<div className="invalid-feedback">*{errors.email}</div>) : null}
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value = {this.state.password}
            onChange = {this.onChangeInput}
            className = {classnames('form-control form-control-lg', {
              "is-invalid" : errors.password
            })}
          />
          
          {errors.password ? (<div className="invalid-feedback">*{errors.password}</div>) : null}
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </div>
        )
    }
}

Login.propTypes = {
  loginUser : PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {auth: state.auth,
  errors: state.errors}
}


export default connect(mapStateToProps, {loginUser})(Login);
