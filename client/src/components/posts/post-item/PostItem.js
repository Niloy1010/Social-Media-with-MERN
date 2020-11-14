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

    constructor(props) {
        super(props);
        this.state=({
            image: null
        })
    }

    componentDidMount() {
        const {post} = this.props;
        if(post.hasImage) {
            this.setState({
                image: post.image
            })
        }
    }

    onDeleteClick = (id) => {
        this.props.deletePost(id);
    }
    onLikeClick = (id,newLike) =>  {
        this.props.addLike(id,newLike,this.props.posts.posts);
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

        const {post, auth,profile} = this.props;
        
        const newLike = {
            name: auth.user.name,
            displayPicture: auth.user.displayPicture
        }
        let showImage = null;
        if(this.state.image) {
            showImage = (<img src={this.state.image} height="50%" width="50%" />)
        }
        let profileHandle = null;
        let profileStatus = null;
        let profileTime = null;
        if(profile.profiles) {
            let profileProperty = profile.profiles.filter(prof => prof.user._id.toString() === post.user.toString());
            profileHandle = profileProperty[0].handle;
            profileStatus = profileProperty[0].status;

            
        }
        return (
            <div>
            <div className={`card card-body ${styles.mycard} mb-3`}>
                
                <div className="row">
                    <div className="col-2 col-lg-1">
                    <Link to={`/profile/${profileHandle}`} className="" >
                            <img src={post.displayPicture} height="50px" width="50px" className={`rounded-circle ${styles.displayBorder}`} alt=""/>
                        </Link>
                    </div>
                    <div className="col-9 col-lg-10">
                        
                      <Link to={`/profile/${profileHandle}`} className={styles.nameText}>{post.name}</Link> 
                        <span className={styles.profileStatus}>{profileStatus}</span>
                        
                       

                    </div>
                    
                    <div className="col-1 col-lg-1">
                    {post.user === auth.user.id ? (
                            
                                 <FormatListBulletedIcon classnames={styles.editDeleteBtn} onClick={this.onDeleteClick.bind(this,post._id)} />
                              
                        ) : null}
                    </div>
                   
                    
                </div>
                <p className={styles.postText}>
                            {post.text}
                        </p>
                        <div style={{textAlign:"center"}}>
                        {showImage}
                        </div>
                    <span className={styles.likeLength}><i className={
                               `fa fa-thumbs-up ${styles.thumbBtn} `
                               }></i>{post.likes.length}</span> 

                    <div className={styles.likeCommentDiv}>
                    <button className={`${styles.likeElement} btn btn-light`} onClick={this.onLikeClick.bind(this,post._id,newLike)} type="button">
                            <i className={
                                this.findUserLike(post.likes) ? `fa fa-thumbs-up ${styles.thumbBtn} ` : `fa fa-thumbs-up`
                               }></i>
                            <span className="badge">Like</span>
                        </button>
                    <Link  to={`/post/${post._id}`} className={`${styles.commentBtn} ${styles.CommentElement} btn btn-info`}>Comments</Link>
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
    auth : state.auth,
    profile: state.profile,
    posts: state.post
})

export default  connect(mapStateToProps, {deletePost,addLike,removeLike})(PostItem);
