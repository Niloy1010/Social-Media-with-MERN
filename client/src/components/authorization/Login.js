import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { loginUser} from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import styles from './login.module.css';

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
        this.props.history.push('/dashboard');
      }
    }

    componentWillReceiveProps(nextProps) {

      if(nextProps.auth.isAuthenticated) {
        this.props.history.push('/dashboard');
      }
      if(nextProps.errors) {
        this.setState({
          errors: nextProps.errors
        })
      }
    }

    onChangeInput = (e) => {
      console.log(e);
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
    <div className={styles.container}>
    <h3>Sign In</h3>
      <p className="lead"><i className="fa fa-user"></i> Sign into your Account</p>
      <form noValidate className="form" onSubmit ={this.onSubmitForm} className={styles.contact}>

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
        Don't have an account? <Link to="/register" className= {'${styles.a}'} >Sign Up</Link>
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
