import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import ProfileHeader from './profile-header/ProfileHeader'
import ProfileAbout from './profile-about/ProfileAbout'
import ProfileCreds from './profile-creds/ProfileCreds'
import ProfileGithub from './profile-github/ProfileGithub';
import Spinner from '../common/Spinner';
import {connect} from 'react-redux';
import {getProfileByHandle} from '../../actions/profileActions';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static getDerivedStateFromProps(nextProps,prevState){
        
        if(nextProps.profile.profile === null && nextProps.profile.loading) {
            nextProps.history.push('/not-found');
         
        }
        return null;
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log("not found check");
    //     if(nextProps.profile.profile === null && nextProps.profile.loading) {
    //         this.props.history.push('/not-found');
    //     }
    // }

    componentDidMount() {
        console.log(this.props.match.params.handle);
        if(this.props.match.params.handle) {
            
        this.props.getProfileByHandle(this.props.match.params.handle);
        }
    }
    render() { 
        
    
        const {profile,loading} = this.props.profile;
        let profileContent ; 
        if(profile === null || loading) {
            profileContent = <Spinner />
        }
        else{
            profileContent = (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/profiles" className="btn btn-light mb-3 float-left">
                                Back to Profiles
                            </Link> 
                        </div>
                        <div className="col-md-6"></div>
                    </div>

                    <ProfileHeader profile={profile} />
                    <ProfileAbout profile={profile} />
                    <ProfileCreds education={profile.education} experience={profile.experience} />
                </div>
            )
        }
        return (
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {profileContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfileByHandle: PropTypes.func.isRequired
}

const mapStateToProps = (state) => (
   { 
       profile: state.profile
    }
)
export default connect(mapStateToProps,{getProfileByHandle})(Profile);
