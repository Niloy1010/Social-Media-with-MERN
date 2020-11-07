import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import Posts from '../Posts';
import {deletePost, addLike,removeLike} from '../../../actions/postActions';
import CommentFeed from '../../post/Comment/comment-feed/CommentFeed';
import styles from './postItem.module.css';

class PostItem extends Component {

    onDeleteClick = (id) => {
        this.props.deletePost(id);
    }
    onLikeClick = (id,newLike) =>  {
        this.props.addLike(id,newLike);
    }
    onUnlikeClick = (id) => {
        this.props.removeLike(id);
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
        const newLike = {
            name: auth.user.name,
            displayPicture: auth.user.displayPicture
        }

        return (
            <div>
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <a href="">
                            <img src={post.displayPicture} height="50px" width="50px" className="rounded-circle d-none d-md-block" alt=""/>
                        </a>
                        <br></br>
                    </div>
                    <div className="col-md-8 mb-5">
                        
                    {post.name}
                        <p className="lead">
                            {post.text}
                        </p>
                        
                <hr></hr>
                        <button onClick={this.onLikeClick.bind(this,post._id,newLike)} type="button" className="btn btn-light mr-1">
                            <i className={
                                this.findUserLike(post.likes) ? `fa fa-thumbs-up ${styles.thumbBtn} ` : `fa fa-thumbs-up`
                               }></i>
                            <span className="badge badge-light">{post.likes.length}</span>
                        </button>
                        <button onClick={this.onUnlikeClick.bind(this,post._id)} type="button" className="btn btn-light mr-1">
                            <i className=" fa fa-thumbs-down"></i>
                            <span className="badge badge-light"></span>
                        </button>
                        <Link to={`/post/${post._id}`} className={`${styles.commentBtn} btn btn-info mr-1`}>Comments</Link>
                       
                <hr></hr>
                    </div>
                    
                    <div className="col-md-2">
                    {post.user === auth.user.id ? (
                            <button onClick={this.onDeleteClick.bind(this,post._id)} type="button" className="btn btn-danger mr-1">
                                Delete &nbsp;<i className={`fa fa-times `}></i>
                                </button>
                        ) : null}
                    </div>
                </div>
                <CommentFeed comments={post.comments} postId={post._id} />
            </div>
            </div>
        )
    }
}

PostItem.propTypes = {
    post : PropTypes.object.isRequired,
    auth : PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth : state.auth
})

export default  connect(mapStateToProps, {deletePost,addLike,removeLike})(PostItem);
