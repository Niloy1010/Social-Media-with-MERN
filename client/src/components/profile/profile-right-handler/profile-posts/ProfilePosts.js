import React, { Component } from "react";
import PostItem from "../../../posts/post-item/PostItem";
import isEmpty from "../../../../validation/is-empty";
import PostForm from "../../../posts/post-form/PostForm";

class ProfilePosts extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { posts, profile, auth } = this.props;
    const filterPost = posts.filter(
      (post) => post?.user === profile?.user?._id
    );
    const newPost = filterPost.sort((a, b) => {
      let date1 = new Date(a.Date);
      let date2 = new Date(b.Date);
      return date2 - date1;
    });
    return (
      <div className="container">
        {auth.user.id === profile?.user?._id ? <PostForm /> : null}
        {!isEmpty(newPost) ? (
          newPost.map((post) => <PostItem key={post._id} post={post} />)
        ) : (
          <h4 style={{ textAlign: "center" }}>
            No Posts to show. Post something
          </h4>
        )}
      </div>
    );
  }
}

export default ProfilePosts;
