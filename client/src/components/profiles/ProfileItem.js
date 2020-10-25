import React from 'react';
import {Link} from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
const ProfileItem = (props)=> {
    const {profile} = props;
    console.log(profile);
    console.log(profile.user.displayPicture);
    return (
        <div className="card card-body bg-light mb-3">
            <div className="row">
                <div className="col-4">
                    <img src={profile.user.displayPicture} alt="" className="rounded-circle"/>
                </div>
                <div className="col-md-4 col-8 text-md-left text-center">
                    <h3>{profile.user.name}</h3>
                    <p>
                        {profile.status}<br></br>
                       {isEmpty(profile.experience)? null : 
                       isEmpty(profile.experience.filter((exp)=>(
                           exp.current == true
                       )))
                        ? null : 
                       (<span>Works at {profile.experience.filter((exp)=>(exp.current==true))[0].company}</span>) }
                       
                    </p>
                    <Link to={`/profile/${profile.handle}`} className="btn btn-info">
                        View Profile
                    </Link>
                </div>
                <div className="col-md-4 d-none d-md-block">
                    <h4>Skill Set</h4>
                    <ul className="list-group">
                        {profile.skills.slice(0,4).map((skill,index)=>(
                            <li key={index} className="list-group-item">
                                <i className="fa fa-check pr1" />
                                {skill}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default ProfileItem;
