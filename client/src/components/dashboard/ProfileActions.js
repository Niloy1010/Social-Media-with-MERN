import React from 'react'
import {Link} from 'react-router-dom'

const ProfileActions = ()=> {
    return (
        <div className="btn-group mb-4" role="group">
        <Link to="/edit-profile" className="btn btn-light"
          ><i className="fa fa-user-circle text-primary"></i> Edit Profile</Link>
        <Link to="/add-experience" className="btn btn-light"
          ><i className="fa fa-black-tie text-primary"></i> Add Experience</Link>
        <Link to="/add-education" className="btn btn-light"
          ><i className="fa fa-graduation-cap text-primary"></i> Add Education</Link>
      </div>
    )
}
export default ProfileActions;
