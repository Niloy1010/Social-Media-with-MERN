import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Landing extends Component {
    render() {
        return (
            <div>
                <section className="">
                    <div className="dark-overlay">
                        <div className="landing-inner">
                        <h1 className="x-large">Social Media</h1>
                        <p className="lead">
                            A social Media Platform for Conestoga Students
                        </p>
                        <div className="buttons">
                            <Link to="/register" className="btn btn-primary">Sign Up</Link>
                            <Link to="/login" className="btn btn-light">Login</Link>
                        </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
export default Landing;
