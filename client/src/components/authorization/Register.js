import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import classnames from 'classnames'

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
        axios
        .post('/api/users/register', newUser)
        .then(res => console.log(res.data))
        .catch(err=> {
          console.log(err.response.data)
          this.setState({
            errors: err.response.data
          })
        });
    }



    render() {
      const {errors} = this.state;

    return (
    <div>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fa fa-user"></i> Create Your Account</p>
      <form noValidate className="form" onSubmit={this.onSubmitForm}>
        <div className="form-group">
          <input 
          type="text" 
          placeholder="Name" 
          name="name"
          value = {this.state.name}
          onChange = {this.onChangeInput}
          className = {classnames('form-control form-control-lg', {
            "is-invalid" : errors.name
          })}
          required />
          {errors.name ? (<div className="invalid-feedback">*{errors.name}</div>) : null}
        </div>
        <div className="form-group">
          <input 
          type="email" 
          placeholder="Email Address" 
          name="email"
          className = {classnames('form-control form-control-lg', {
            "is-invalid" : errors.email
          })}
          
          value = {this.state.email}
          onChange = {this.onChangeInput}
          required/>
          
          {errors.email ? (<div className="invalid-feedback">*{errors.email}</div>) : null}
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value = {this.state.password}
            onChange = {this.onChangeInput}
            className = {classnames('form-control form-control-lg', {
              "is-invalid" : errors.password
            })}
          />
          
          {errors.password ? (<div className="invalid-feedback">*{errors.password}</div>) : null}
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="cpassword"
            minLength="6"
            value = {this.state.cpassword}
            onChange = {this.onChangeInput}
            className = {classnames('form-control form-control-lg', {
              "is-invalid" : errors.cpassword
            })}
          />
          
          {errors.cpassword ? (<div className="invalid-feedback">*{errors.cpassword}</div>) : null}
        </div>
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
}


export default Register;
