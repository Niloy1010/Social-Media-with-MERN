import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getPost} from '../../actions/postActions';
import SinglePost from './single-post/SinglePost';
import Spinner from '../common/Spinner';
import {Link} from 'react-router-dom';
import CommentForm from './Comment/comment-form/CommentForm';
import CommentFeed from './Comment/comment-feed/CommentFeed';
import isEmpty from '../../validation/is-empty';
import {getProfiles} from '../../actions/profileActions';


class Post extends Component {

    componentDidMount() {
        this.props.getPost(this.props.match.params.id);
    }
    render() {

        const {post} = this.props.post;
        const showSinglePost = !isEmpty(post) ? (
            <div>
        <SinglePost post={post} />
        <CommentForm postId={post._id} />
        <CommentFeed postId={post._id} comments={post.comments} />
        </div>
        
        ) : <Spinner />;

        return (
            <div>
                <Link to="/posts" className="btn btn-light mb-3">Back to feed</Link>
                {showSinglePost}
            </div>
        )
    }
}

Post.propTypes = {
    getPost : PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    post: state.post,
    auth: state.auth,
    errors: state.errors,
    profile: state.profile
})
export default  connect(mapStateToProps,{getPost,getProfiles})(Post);
