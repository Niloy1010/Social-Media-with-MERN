import React, { Component } from "react";
import { connect } from "react-redux";
import isEmpty from "../../../validation/is-empty";
import styles from "./profileRight.module.css";
import ProfileEducation from "./profile-education/ProfileEducation";
import ProfileExperience from "./profile-experience/ProfileExperience";
import ProfilePosts from "./profile-posts/ProfilePosts";
import { getPosts } from "../../../actions/postActions";
import Spinner from "../../common/Spinner";
import SchoolOutlinedIcon from "@material-ui/icons/SchoolOutlined";
import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import FaceOutlinedIcon from "@material-ui/icons/FaceOutlined";

class ProfileRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInformation: "posts",
    };
  }

  componentDidMount() {
    this.props.getPosts();
  }

  changeBtnToPost = () => {
    this.setState({
      showInformation: "posts",
    });
  };
  changeBtnToExperience = () => {
    this.setState({
      showInformation: "experience",
    });
  };

  changeBtnToEducation = () => {
    this.setState({
      showInformation: "education",
    });
  };
  render() {
    const profile = this.props.profile;
    const { posts } = this.props.post;
    const { auth } = this.props;
    const firstName = profile?.user?.name.trim().split(" ")[0];
    const lastName = profile?.user?.name.trim().split(" ")[1];

    const profileEducationContent = !isEmpty(profile?.education) ? (
      <div style={{ width: "100%" }}>
        <ProfileEducation education={profile?.education} />
      </div>
    ) : (
      <div>No education listed</div>
    );

    const profileExperienceContent = !isEmpty(profile?.experience) ? (
      <div style={{ width: "100%" }}>
        <ProfileExperience experience={profile?.experience} />
      </div>
    ) : (
      <div>No experience Listed</div>
    );

    const profilePostsContent = !isEmpty(posts) ? (
      <div style={{ width: "100%" }}>
        <ProfilePosts auth={auth} posts={posts} profile={profile} />
      </div>
    ) : (
      <Spinner />
    );

    return (
      <div>
        <div className={`${styles.cardbio} card`}>
          <div className="card-body">
            <h1 className="card-title">
              {firstName} {lastName}
            </h1>
            <h6 className="card-subtitle mb-2 text-muted">About me</h6>
            <p className="card-text">
              {isEmpty(profile?.bio) ? (
                <span className="text-left d-block">
                  I am a {profile?.status}
                </span>
              ) : (
                <span>{profile?.bio}</span>
              )}
            </p>
          </div>
        </div>

        <div className="row mt-3 mb-3">
          <div className="col-sm-4 text-center">
            <div
              style={{
                display: "flex",
              }}
            >
              <FaceOutlinedIcon iconstyle={styles.largeIcon} />
              <h4
                className={`${
                  this.state.showInformation === "posts"
                    ? styles.btnSelected
                    : styles.btnUnselected
                } ${styles.toggleButton} pb-2 mb-3 w-100`}
                onClick={this.changeBtnToPost}
              >
                Posts
              </h4>
            </div>
          </div>
          <div className="col-sm-4 text-center">
            <div
              style={{
                display: "flex",
              }}
              className={``}
            >
              <SchoolOutlinedIcon iconstyle={styles.largeIcon} />{" "}
              <h4
                className={`${
                  this.state.showInformation === "education"
                    ? styles.btnSelected
                    : styles.btnUnselected
                } ${styles.toggleButton} pb-2 mb-3  w-100`}
                onClick={this.changeBtnToEducation}
              >
                Education
              </h4>
            </div>
          </div>
          <div className="col-sm-4 text-center">
            {" "}
            <div
              style={{
                display: "flex",
              }}
            >
              <WorkOutlineOutlinedIcon iconstyle={styles.largeIcon} />
              <h4
                className={`${
                  this.state.showInformation === "experience"
                    ? styles.btnSelected
                    : styles.btnUnselected
                } ${styles.toggleButton} pb-2 mb-3 w-100`}
                onClick={this.changeBtnToExperience}
              >
                Experience
              </h4>
            </div>
          </div>

          {this.state.showInformation === "experience"
            ? profileExperienceContent
            : null}
          {this.state.showInformation === "education"
            ? profileEducationContent
            : null}
          {this.state.showInformation === "posts" ? profilePostsContent : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(ProfileRight);
