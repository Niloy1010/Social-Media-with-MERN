import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Login extends Component {

    constructor() {
        super();
        this.state = {
            email : "",
            password: ""
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
        const user = {
            email : this.state.email,
            password: this.state.password
        }
        console.log(user);
    }
    render() {
        return (
    <div>
    <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fa fa-user"></i> Sign into Your Account</p>
      <form className="form" onSubmit ={this.onSubmitForm}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value = {this.state.email}
            onChange = {this.onChangeInput}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value = {this.state.password}
            onChange = {this.onChangeInput}
          />
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


export default Login;
