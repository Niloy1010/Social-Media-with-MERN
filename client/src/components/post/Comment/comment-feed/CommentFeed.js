import React, { useState, useEffect } from "react";
import CommentItem from "../comment-item/CommentItem";
import Spinner from "../../../common/Spinner";
import isEmpty from "../../../../validation/is-empty";
import styles from "./commentFeed.module.css";

const CommentFeed = (props) => {
  const [commentNumber, setCommentNumber] = useState(3);
  const { comments, postId } = props;
  const commentFeed = isEmpty(comments)
    ? null
    : comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} postId={postId} />
      ));
  const showCommentItems = isEmpty(comments)
    ? null
    : commentFeed.splice(0, commentNumber);

  const increaseCommentNumber = () => {
    handleChange(comments.length);
  };
  function handleChange(value) {
    console.log(value);
    if (commentNumber <= value) {
      setCommentNumber(commentNumber + 5);
    }
  }

  const seeMoreComments =
    comments.length > 3 && comments.length > commentNumber ? (
      <span className={styles.seeMore}>...See More Comments</span>
    ) : null;

  return (
    <div className={styles.commentFeed}>
      {showCommentItems}
      <div className={styles.countNumberDiv} onClick={increaseCommentNumber}>
        {seeMoreComments}
      </div>
    </div>
  );
};
export default CommentFeed;
