import React from 'react';
import isEmpty from '../../../validation/is-empty';


const ProfileAbout = (props)=> {
    const {profile} = props;

    //Get first name
    const firstName = profile.user.name.trim().split(' ')[0];
   
    const skills = profile.skills.map((skill,index)=> (
        <div key={index} className="p-3">
            <i className="fa fa-check"/>{skill}
        </div>
    ));

    return (
        <div>   
            <div className="row">
                <div className="card card-body bg-light mb-3">
                     <h3 className="text-center text-info">About {firstName}</h3> 
                        <p className="lead">
                            {isEmpty(profile.bio) ? (<span className="text-center d-block">...</span>) : (<span>{profile.bio}</span>)}
                        </p>
                        <hr />
                        <h3 className="text-center text-info"> Skill Set</h3>
                        <div className="row">
                            <div className="d-flex flex-wrap justify-content-center align-items-center">
                                {skills}
                            </div>
                        </div>
                    
                </div>
            </div>
        </div>
    )
}

export default ProfileAbout;
