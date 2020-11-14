import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostItem from '../post-item/PostItem';
import {getProfiles} from '../../../actions/profileActions';
import store from '../../../store';

class PostFeed extends Component {

    componentDidMount() {
        
        store.dispatch(getProfiles());
    }
    render() {
        const {posts} = this.props;
        
       // const newPost = posts.sort((a,b)=> b.likes.length - a.likes.length);
        return (
            posts.map(post => <PostItem key={post._id} post={post} />)
        )
    
    }
}

PostFeed.propTypes = {
    posts: PropTypes.array.isRequired
}

export default PostFeed;
