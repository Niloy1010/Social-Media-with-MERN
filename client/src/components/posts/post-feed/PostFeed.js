import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostItem from '../post-item/PostItem';

class PostFeed extends Component {
    render() {
        const {posts} = this.props;
        const newPost = posts.sort((a,b)=> b.likes.length - a.likes.length);
        return (
            newPost.map(post => <PostItem key={post._id} post={post} />)
        )
    
    }
}

PostFeed.propTypes = {
    posts: PropTypes.array.isRequired
}

export default PostFeed;
