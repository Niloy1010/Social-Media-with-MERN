import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {deleteComment} from '../../../../actions/postActions';
import styles from './commentItem.module.css';

class CommentItem extends Component {

    onDeleteClick = (postid, commentid) =>{
        this.props.deleteComment(postid,commentid);
    }
    render() {

        const { comment, postId, auth} = this.props;

        return (
            <div className={`card card-body mb-1 ${styles.commentCard} `}>
                <div className="row">
                    <div className="col-2 col-xl-1 pl-0 mr-auto">
                            <img src={comment.displayPicture} alt="" height="50px" width="50px" className="rounded-circle d-block"/>
                       
                        <br></br>
                    </div>
                    <div className={`col-10 col-xl-11 text-left ${styles.commentItem} `}>
                        
                    <span className={styles.commentName}>{comment.name}</span>
                    {comment.user === auth.user.id ? (
                            <button onClick={this.onDeleteClick.bind(this,postId, comment._id)} type="button" style={{float:"right"}}>
                                <i className="fa fa-times"></i>
                                </button>
                        ) : null}
                    <br></br>
                        <span className={styles.commentText}>
                            {comment.text}
                        </span>
                    
                    </div>
                        
                </div>
                
            </div>
        )
    }
}

CommentItem.propTypes = {
    deleteComment : PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth : state.auth
})

export default connect(mapStateToProps,{deleteComment})(CommentItem);
