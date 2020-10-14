import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux'

class Landing extends Component {

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
          this.props.history.push('/timeline');
        }
      }
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

Landing.propTypes = {
    auth: PropTypes.object.isRequired,

}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Landing);
