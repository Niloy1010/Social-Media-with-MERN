import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import Posts from '../Posts';
import {deletePost, addLike,removeLike} from '../../../actions/postActions';
import CommentFeed from '../../post/Comment/comment-feed/CommentFeed';
import styles from './postItem.module.css';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

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
        let showImage = null;
        if(post.hasImage) {
            showImage = (<img src={post.image} height="500px" width="auto" />)
        }

        return (
            <div>
            <div className={`card card-body ${styles.mycard} mb-5`}>
                <div className="row mb-3">
                    <div className="col-md-1">
                        <a href="">
                            <img src={post.displayPicture} height="50px" width="50px" className={`rounded-circle d-none d-md-block ${styles.displayBorder}`} alt=""/>
                        </a>
                        <br></br>
                    </div>
                    <div className="col-md-10">
                        
                        <p className={styles.nameText}>{post.name}</p>
                        <p className={styles.postText}>
                            {post.text}
                        </p>
                        <div style={{textAlign:"center"}}>
                        {showImage}
                        </div>

                    </div>
                    
                    <div className="col-md-1">
                    {post.user === auth.user.id ? (
                            
                                 <FormatListBulletedIcon classnames={styles.editDeleteBtn} onClick={this.onDeleteClick.bind(this,post._id)} />
                              
                        ) : null}
                    </div>
                    <span className={styles.likeLength}><i className={
                               `fa fa-thumbs-up ${styles.thumbBtn} `
                               }></i>{post.likes.length}</span> 
                    <div className={styles.likeCommentDiv}>
                    <button className={`${styles.likeElement} btn btn-light mr-1`} onClick={this.onLikeClick.bind(this,post._id,newLike)} type="button">
                            <i className={
                                this.findUserLike(post.likes) ? `fa fa-thumbs-up ${styles.thumbBtn} ` : `fa fa-thumbs-up`
                               }></i>
                            <span className="badge">Like</span>
                        </button>
                    <Link  to={`/post/${post._id}`} className={`${styles.commentBtn} ${styles.CommentElement} btn btn-info mr-1`}>Comments</Link>
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
