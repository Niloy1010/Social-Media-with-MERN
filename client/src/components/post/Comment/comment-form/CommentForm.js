import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextAreaFieldGroup from "../../../common/TextAreaFieldGroup";
import { addComment, addCommentToFeed } from "../../../../actions/postActions";
import styles from "./CommentForm.module.css";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {},
      forPostFeed: false,
    };
  }

  componentDidMount() {
    this.setState({
      forPostFeed: this.props.forPostFeed,
    });
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors) {
      return {
        ...prevState,
        errors: nextProps.errors,
      };
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();

    const { user } = this.props.auth;
    const { postId } = this.props;

    const newComment = {
      text: this.state.text,
      name: user.name,
      displayPicture: user.displayPicture,
    };
    if (this.state.forPostFeed) {
      this.props.addCommentToFeed(postId, newComment, this.props.posts.posts);
      this.setState({
        text: "",
      });
    } else {
      this.props.addComment(postId, newComment);
      this.setState({
        text: "",
      });
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className={`post-form m2-3 ${styles.commentForm}`}>
          <div className="card card-info">
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <TextAreaFieldGroup
                    placeholder="Reply"
                    name="text"
                    value={this.state.text}
                    onChange={this.onChange}
                  />
                  <button
                    disabled={!this.state.text}
                    type="submit"
                    className={`${styles.commentBtn} btn`}
                    style={{ float: "right" }}
                  >
                    Comment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
  posts: state.post,
});

export default connect(mapStateToProps, { addComment, addCommentToFeed })(
  CommentForm
);
