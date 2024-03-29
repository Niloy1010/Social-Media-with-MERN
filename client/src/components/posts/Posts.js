import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostForm from "./post-form/PostForm";
import Spinner from "../common/Spinner";
import { getPosts } from "../../actions/postActions";
import PostFeed from "./post-feed/PostFeed";
import isEmpty from "../../validation/is-empty";
import PostGroupItem from "./postGroupItem/PostGroupItem";
import styles from "./post.module.css";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { posts, loading } = this.props.post;
    const { auth } = this.props;

    let postContent;

    if (isEmpty(posts) || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed auth={auth} posts={posts} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className={`${styles} col-lg-3 d-none d-lg-block`}>
              {auth ? (
                <PostGroupItem displayPicture={auth.user.displayPicture} />
              ) : null}
            </div>
            <div
              className="col-sm-12 col-lg-9"
              style={{ paddingRight: "0px", paddingLeft: "0px" }}
            >
              <PostForm />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPosts })(Posts);
