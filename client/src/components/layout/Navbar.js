import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/authActions';
import {clearCurrentProfile} from '../../actions/profileActions';
import styles from './navbar.module.css';
import MessageIcon from '@material-ui/icons/Message';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home';
import {getCurrentProfile} from '../../actions/profileActions';
import {getCurrentUser} from '../../actions/authActions';
import isEmpty from '../../validation/is-empty';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';


class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handle : null
        }
    }

    onLogoutClick= (e) => {
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();
    }
    static getDerivedStateFromProps(props,state) {
        return state;
    }
    componentDidMount() {
        this.props.getCurrentProfile();
        this.props.getCurrentUser();
        
        
     
    }
    render() {
        const {profile} = this.props;
        
        const handle = profile.profile ? profile.profile.handle : null;
        const {isAuthenticated, user} = this.props.auth;

        const authLinks = (
            <div className={`${styles.myNavbar} pt-2 pb-2 mb-5`}>
            <div className={`${styles.logo}`}>1</div>
        <Link to="/posts" className={styles.item}> <HomeIcon /></Link>
           

            <Link className={styles.item} to={{
                pathname: `/profile/${handle}`,
                state: {
                    profile:this.props.profile,
                    auth: this.props.auth
                }
            }}
            
            ><AccountCircleIcon /></Link>
<Link to="/notifications" className={styles.item}>{user.hasNotification ? <NotificationsActiveIcon /> : <NotificationsIcon />}</Link>
            <div className={styles.item}><GroupIcon /></div>
            <div className={styles.item}><MessageIcon /></div>
            <div className={styles.search}><a href="#" onClick={this.onLogoutClick} className="nav-link">
                                <img src={user.displayPicture} alt={user.name}
                                className="rounded-circle"
                                title="Gravatar Image"
                                style={{width:'30px', marginRight:'5px'}}
                                />
                                Logout
                            </a></div>
            
        </div>
        );
      

        return (
            <div>
                
               
                    <div>
                        {isAuthenticated ? authLinks : null}
                    </div>
            </div>
        )
    }
}

Navbar.propTypes = {
    logoutUser : PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state)=>({
    auth : state.auth,
    profile: state.profile,
})

export default connect(mapStateToProps, {logoutUser,clearCurrentProfile, getCurrentProfile,getCurrentUser})(Navbar);