import React from "react";
import isEmpty from "../../../validation/is-empty";
import { Link } from "react-router-dom";
import styles from "./profileLeft.module.css";
import Spinner from "../../common/Spinner";

const ProfileLeft = (props) => {
  let { profile, auth } = props;
  // console.log(props.location);
  // if(!isEmpty(props.location.data)) {
  //     profile = {...props.location.data.profile};
  //     auth = {...props.location.data.auth}
  // }
  // else{

  //     profile = {...props.profile};
  //     auth = {...props.auth}
  // }

  const editProfileContent =
    profile?.user &&
    (auth.isAuthenticated === true && profile.user._id === auth.user.id ? (
      <Link to="/dashboard" className={`${styles.mybtn} btn`}>
        Edit Profile
      </Link>
    ) : null);

  const socialContent = !isEmpty(profile?.social) ? (
    <div className="text-left mt-3">
      <h6 className={`${styles.socialLink} p-2`}>
        <span>Social Link</span>
      </h6>

      <div>
        {isEmpty(profile.social && profile.social.facebook) ? null : (
          <a href={profile?.social.facebook} className="p-2" target="_blank">
            <i className={`${styles.mylink} fa fa-facebook fa-2x`}></i>
          </a>
        )}
        {isEmpty(profile.social && profile.social.instagram) ? null : (
          <a href={profile?.social.instagram} className="p-2" target="_blank">
            <i className={`${styles.mylink} fa fa-instagram fa-2x `}></i>
          </a>
        )}
        {isEmpty(profile.social && profile.social.linkedin) ? null : (
          <a href={profile?.social.linkedin} className="p-2" target="_blank">
            <i className={`${styles.mylink} fa fa-linkedin fa-2x `}></i>
          </a>
        )}
        {isEmpty(profile.social && profile.social.youtube) ? null : (
          <a href={profile?.social.youtube} className="p-2" target="_blank">
            <i className={`${styles.mylink} fa fa-youtube fa-2x `}></i>
          </a>
        )}
      </div>
    </div>
  ) : null;

  const skills = profile?.skills?.map((skill, index) => (
    <div key={index} className="p-3">
      <i className="fa fa-check" />
      {skill}
    </div>
  ));

  return (
    <div className="row">
      <div className="col-md-12">
        <div
          className="imageHolder mb-4"
          style={{ backgroundColor: "#f1f1f1" }}
        >
          <img
            src={profile?.user?.displayPicture}
            alt=""
            style={{
              height: "350px",
              width: "100%",
              objectFit: "contain",
              boxShadow:
                "0 0 0 1px rgba(14, 52, 91, 0.15), 0 2px 3px rgba(14, 52, 91, 0.2)",
            }}
          />
        </div>
        <div className={`card card-body card-bg ${styles.infoCard}`}>
          <p className="font-weight-bold text-center">{profile?.status}</p>
          {editProfileContent}

          <div className="text-center">
            {socialContent}
            {/* <h1 className="display-4 text-center">{profile.user.name}</h1> */}

            <div className="text-left mt-3">
              <h6 className={`${styles.skillink} p-2`}>
                <span>Skills</span>
              </h6>
            </div>
            <div className="d-flex flex-wrap  align-items-center">{skills}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileLeft;
