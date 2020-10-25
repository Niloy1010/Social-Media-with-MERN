import React from 'react'
import isEmpty from '../../../validation/is-empty';

 const ProfileHeader = (props) => {
    const {profile} = props;
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card card-body bg-info text-white mb-3">
                    <div className="row">
                        <div className="col-4 col-md-3 m-auto">
                            <img src={profile.user.displayPicture} alt="" className="rounded-circle"/>
                        </div>
                    </div>
                    <div className="text-center">
                        <h1 className="display-4 text-center">{profile.user.name}</h1>
                        <p className="lead text-center">{profile.status}</p>
                        <p>
                            {isEmpty(profile.experience) ? null :
                            isEmpty(profile.experience.filter(exp => exp.current === true))?
                            null:
                            (<span>Currently working at {profile.experience.filter(exp => exp.current === true)[0].company}&nbsp;
                            as  {profile.experience.filter(exp => exp.current === true)[0].title}
                            </span>)
                            }
                        </p>  
                        <p>
                            {isEmpty(profile.social && profile.social.facebook) ? null :
                            (<a href={profile.social.facebook} className="text-white p-2" target="_blank">
                            <i className="fa fa-facebook fa-2x"></i>
                            </a>)
                            }
                              {isEmpty(profile.social && profile.social.instagram) ? null :
                            (<a href={profile.social.instagram} className="text-white p-2" target="_blank">
                            <i className="fa fa-instagram fa-2x"></i>
                            </a>)
                            }
                              {isEmpty(profile.social && profile.social.linkedin) ? null :
                            (<a href={profile.social.linkedin} className="text-white p-2" target="_blank">
                            <i className="fa fa-linkedin fa-2x"></i>
                            </a>)
                            }
                              {isEmpty(profile.social && profile.social.youtube) ? null :
                            (<a href={profile.social.youtube} className="text-white p-2" target="_blank">
                            <i className="fa fa-youtube fa-2x"></i>
                            </a>)
                            }
                        
                       
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfileHeader;
