import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/authActions';

class Navbar extends Component {

    onLogoutClick= (e) => {
        e.preventDefault();
        this.props.logoutUser();
    }
    render() {

        const {isAuthenticated, user} = this.props.auth;

        const authLinks = (
                    <ul className="navbar-nav">
                        
                        <li className="nav-item">
                            <a href="#" onClick={this.onLogoutClick} className="nav-link">
                                <img src={user.displayPicture} alt={user.name}
                                className="rounded-circle"
                                title="Gravatar Image"
                                style={{width:'25px', marginRight:'5px'}}
                                />
                                Logout
                            </a>
                        </li>
                        </ul>
        );
        const guestLinks = (
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link className="nav-link" to="/register">Sign Up <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                </ul>
            );

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="/">Social Media</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                </nav>
            </div>
        )
    }
}

Navbar.propTypes = {
    logoutUser : PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state)=>({
    auth : state.auth
})

export default connect(mapStateToProps, {logoutUser})(Navbar);