import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import Spinner from '../../common/Spinner'
import {deletePost, addLike,removeLike,addLikeSinglePost,removeLikeSinglePost} from '../../../actions/postActions';
import isEmpty from '../../../validation/is-empty'

class SinglePost extends Component {

    onDeleteClick = (id) => {
        this.props.deletePost(id);
    }
    onLikeClick = (id) =>  {
        this.props.addLikeSinglePost(id);
    }
    onUnlikeClick = (id) => {
        this.props.removeLikeSinglePost(id);
    }

    findUserLike = (likes) => {
        const {auth} = this.props;
        if(likes.filter(like => like.user == auth.user.id).length > 0) {
            return true
        }
        else{
            return false;
        }
    }
    render() {

        const {post, auth} = this.props;
        let showImage = null;
        if(post.hasImage) {
            showImage = <img src={post.image} height="250px" width="250px" />
        }

        const showComment = !isEmpty(post) ? 
        (
            <div className="row">
            <div className="col-md-4">
                <a href="">
                    <img src={post.displayPicture} width="100px" height="100px" className="rounded-circle d-none d-md-block" alt=""/>
                </a>
                <br></br>
            </div>
            <div className="col-md-8">
                
            {post.name}
                <p className="lead">
                    {post.text}
                </p>
                {showImage}
                <button onClick={this.onLikeClick.bind(this,post._id)} type="button" className="btn btn-light mr-1">
                    <i className={classnames('fa fa-thumbs-up',{
                        'text-info' : this.findUserLike(post.likes)
                    })}></i>
                    <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button onClick={this.onUnlikeClick.bind(this,post._id)} type="button" className="btn btn-light mr-1">
                    <i className="text-info fa fa-thumbs-down"></i>
                    <span className="badge badge-light"></span>
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">Comments</Link>
                {post.user === auth.user.id ? (
                    <button onClick={this.onDeleteClick.bind(this,post._id)} type="button" className="btn btn-danger mr-1">
                        <i className="fa fa-times"></i>
                        </button>
                ) : null}
            </div>
        </div>
        )
        :
        (<Spinner />);

        return (
            <div className="card card-body mb-3">
               {showComment}
            </div>
        )
    }
}

SinglePost.propTypes = {
    post : PropTypes.object.isRequired,
    auth : PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    addLikeSinglePost: PropTypes.func.isRequired,
    removeLikeSinglePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth : state.auth,
    errors: state.errors
})

export default  connect(mapStateToProps, {deletePost,addLikeSinglePost,removeLikeSinglePost})(SinglePost);
