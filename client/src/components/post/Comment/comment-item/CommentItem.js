import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {deleteComment} from '../../../../actions/postActions';

class CommentItem extends Component {

    onDeleteClick = (postid, commentid) =>{
        this.props.deleteComment(postid,commentid);
    }
    render() {

        const { comment, postId, auth} = this.props;

        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-4">
                        <a href="">
                            <img src={comment.displayPicture} alt="" height="50px" width="50px" className="rounded-circle d-none d-md-block"/>
                        </a>
                        <br></br>
                    </div>
                    <div className="col-md-8">
                        
                    <p className="">{comment.name}</p>
                        <p className="lead">
                            {comment.text}
                        </p>
                        {comment.user === auth.user.id ? (
                            <button onClick={this.onDeleteClick.bind(this,postId, comment._id)} type="button" className="btn btn-danger mr-1">
                               Delete <i className="fa fa-times"></i>
                                </button>
                        ) : null}
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
