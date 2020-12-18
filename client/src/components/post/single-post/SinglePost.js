import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { withRouter, Link } from "react-router-dom";
import Spinner from "../../common/Spinner";
import styles from "./singlePost.module.css";
import {
  deletePost,
  addLike,
  removeLike,
  addLikeSinglePost,
  removeLikeSinglePost,
} from "../../../actions/postActions";
import isEmpty from "../../../validation/is-empty";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "20%",
    left: "40%",
    right: "auto",
    bottom: "auto",
    width: "500px",
  },
};
class SinglePost extends Component {
  state = {
    modalIsOpen: false,
  };
  onDeleteClick = (id) => {
    this.props.deletePost(id);
    this.props.history.push("/");
  };
  onLikeClick = (id) => {
    this.props.addLikeSinglePost(id);
  };
  onUnlikeClick = (id) => {
    this.props.removeLikeSinglePost(id);
  };
  closeModal = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
    });
  };

  findUserLike = (likes) => {
    const { auth } = this.props;
    if (likes.filter((like) => like.user == auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };
  render() {
    const { post, auth, profile } = this.props;

    const newLike = {
      name: auth.user.name,
      displayPicture: auth.user.displayPicture,
    };
    let showImage = null;
    if (this.state.image) {
      showImage = (
        <img
          src={this.state.image}
          style={{
            height: "auto",
            maxHeight: "350px",
            width: "auto",
            maxWidth: "350px",
          }}
        />
      );
    }
    let profileHandle = null;
    let profileStatus = null;
    if (profile.profiles) {
      let profileProperty = profile.profiles.filter(
        (prof) => prof.user._id.toString() === post.user.toString()
      );
      profileHandle = profileProperty[0].handle;
      profileStatus = profileProperty[0].status;
    }
    const showComment = !isEmpty(post) ? (
      <div className="row">
        {this.state.modalIsOpen ? (
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            ariaHideApp={false}
          >
            <h5 style={{ color: " #14a5ee" }}>Likes</h5>
            <hr />
            {post.likes.map((like) => (
              <Link
                to={`/profile/${
                  this.props.profile?.profiles.find((profile) => {
                    return profile.user._id === like.user;
                  }).handle
                }`}
              >
                <div className={styles.modalOpenBox} key={post.likes.id}>
                  <div className={styles.modalImage}>
                    <img
                      src={`${like.displayPicture}`}
                      height="50px"
                      width="50px"
                      className="rounded-circle"
                    />
                  </div>
                  <div className={styles.modalName}>{like.name}</div>
                </div>
              </Link>
            ))}

            <button style={{ float: "right" }} onClick={this.closeModal}>
              Close
            </button>
          </Modal>
        ) : null}
        <div className="col-md-4">
          <a href="">
            <img
              src={post.displayPicture}
              width="100px"
              height="100px"
              className="rounded-circle d-none d-md-block"
              alt=""
            />
          </a>
          <br></br>
        </div>
        <div className="col-md-8">
          {post.name}
          <p className="lead">{post.text}</p>
          {showImage}
          <button
            onClick={this.onLikeClick.bind(this, post._id)}
            type="button"
            className="btn btn-light mr-1"
          >
            <i
              className={classnames("fa fa-thumbs-up", {
                "text-info": this.findUserLike(post.likes),
              })}
            ></i>
            <span className={`badge badge-light`}>Like</span>
          </button>
          <span
            className={`${styles.numOfLikes} badge badge-light`}
            onClick={this.closeModal}
          >
            {post.likes.length} Likes
          </span>

          {post.user === auth.user.id ? (
            <button
              onClick={this.onDeleteClick.bind(this, post._id)}
              type="button"
              className="btn btn-danger mr-1"
              style={{ float: "right" }}
            >
              <i className="fa fa-times">Delete Post</i>
            </button>
          ) : null}
        </div>
      </div>
    ) : (
      <Spinner />
    );

    return (
      <div className={`${styles.allComments} card card-body mb-3`}>
        {showComment}
      </div>
    );
  }
}

SinglePost.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLikeSinglePost: PropTypes.func.isRequired,
  removeLikeSinglePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile,
  posts: state.post,
});

export default withRouter(
  connect(mapStateToProps, {
    deletePost,
    addLikeSinglePost,
    removeLikeSinglePost,
  })(SinglePost)
);
