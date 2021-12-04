import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProfileHeader from "./profile-header/ProfileHeader";
import ProfileAbout from "./profile-about/ProfileAbout";
import ProfileCreds from "./profile-creds/ProfileCreds";
import Spinner from "../common/Spinner";
import { connect } from "react-redux";
import { getProfileByHandle } from "../../actions/profileActions";

import ProfileLeft from "./profile-left-handler/ProfileLeft";
import ProfileRight from "./profile-right-handler/ProfileRight";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // static getDerivedStateFromProps(nextProps,prevState){

  //     if(nextProps.profile.profile === null && nextProps.profile.loading) {
  //         nextProps.history.push('/not-found');

  //     }
  //     return null;
  // }

  // componentWillReceiveProps(nextProps) {
  //     console.log("not found check");
  //     if(nextProps.profile.profile === null && nextProps.profile.loading) {
  //         this.props.history.push('/not-found');
  //     }
  // }

  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }
  render() {
    const { profiles, loading, profile } = this.props.profile;
    const { auth } = this.props;
    let profileContent;
    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div className="mt-4">
          <div className="row">
            <div className="col-lg-4">
              <ProfileLeft profile={profile} auth={auth} />
            </div>
            <div className="col-lg-8">
              <ProfileRight profile={profile} auth={auth} />
            </div>
          </div>
        </div>
      );
    }
    return <div className="profile">{profileContent}</div>;
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { getProfileByHandle })(Profile);
