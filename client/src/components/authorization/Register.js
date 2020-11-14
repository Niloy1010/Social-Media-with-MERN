import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import { registerUser} from '../../actions/authActions';
import {withRouter} from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import styles from './register.module.css';

class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            cpassword: "",
            errors: {}
        }
    }

    componentDidMount() {
      if(this.props.auth.isAuthenticated) {
        this.props.history.push('/dashboard');
      }
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.errors) {
        this.setState({
          errors: nextProps.errors
        })
      }
    }

    onChangeInput = (e)=> {
        console.log(e.target);
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    onSubmitForm = (e) => {
        e.preventDefault();
        console.log(e);
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            cpassword: this.state.cpassword
        }
        this.props.registerUser(newUser, this.props.history);
        
    }



    render() {
      const {errors} = this.state;


    return (
    <div className={styles.container}>
      <h3>Sign Up</h3>
      <p className="lead"><i className="fa fa-user"></i> Create Your Account</p>
      <form noValidate className="form" onSubmit={this.onSubmitForm}>
        <TextFieldGroup
        name="name"
        placeholder="Enter name"
        value={this.state.name}
        onChange={this.onChangeInput}
        error={errors.name}
        
        />

        <TextFieldGroup
        name="email"
        type="email"
        placeholder="Enter Email"
        value={this.state.email}
        onChange={this.onChangeInput}
        error={errors.email}
        info = "This site uses gravatar for profile picture"
        
        />

        <TextFieldGroup
        name="password"
        type="password"
        placeholder="Password"
        value={this.state.password}
        onChange={this.onChangeInput}
        error={errors.password}
        
        />

        <TextFieldGroup
        name="cpassword"
        type="password"
        placeholder="Confirm Password"
        value={this.state.cpassword}
        onChange={this.onChangeInput}
        error={errors.cpassword}
        
        />

        <input 
        type="submit" 
        className="btn btn-primary" 
        value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
        )
    }
};

Register.propTypes = {
  registerUser : PropTypes.func.isRequired,
  auth : PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {registerUser})(withRouter(Register));
