import React from 'react';
import CommentItem from '../comment-item/CommentItem';
import Spinner from '../../../common/Spinner';
import isEmpty from '../../../../validation/is-empty';

const CommentFeed = (props) => {

    const {comments, postId} = props;
    const commentFeed = isEmpty(comments) ? 
    null
    :
   ( comments.map(comment=> 
        <CommentItem 
        key={comment._id} 
        comment={comment} 
        postId={postId}
         />))
    ;
    return (
        <div>
       {commentFeed}
       </div>
    )
}
export default CommentFeed;
