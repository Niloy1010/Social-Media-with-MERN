import axios from "axios";
import {
  ADD_COMMENT,
  ADD_POST,
  DELETE_POST,
  GET_ERRORS,
  GET_POSTS,
  POST_LOADING,
  GET_POST,
  ADD_IMAGE_POST,
  SET_ERRORS_NULL,
  REMOVE_LIKE,
} from "./types";
import { getCurrentUser } from "./authActions";
import addNotification from "react-push-notification";
import { ADD_LIKE } from "./types";

//ADD POST
export const addPost = (postData) => (dispatch) => {
  axios
    .post("/api/posts", postData)
    .then((res) => {
      addNotification({
        title: "Post",
        message: "Your status has been posted",
        theme: "light",
      });
      dispatch({
        type: SET_ERRORS_NULL,
      });
      return dispatch({
        type: ADD_POST,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//ADD IMAGE POST

export const addImagePost = (postData) => (dispatch) => {
  console.log(postData);
  axios
    .post("/api/posts/image", postData)
    .then((res) => {
      addNotification({
        title: "Image Upload",
        message: "Your image has been uploaded",
        theme: "light",
      });
      dispatch({
        type: SET_ERRORS_NULL,
      });
      dispatch({
        type: ADD_POST,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//DELETE POST
export const deletePost = (id) => (dispatch) => {
  axios
    .delete(`/api/posts/${id}`)
    .then((res) => {
      addNotification({
        title: "Post Deleted",
        message: "Your post has been deleted",
        theme: "light",
      });

      return dispatch({
        type: DELETE_POST,
        payload: id,
      });
    })
    .catch((err) => {
      console.log(err.response.data);
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//GET POSTS
export const getPosts = () => (dispatch) => {
  dispatch(setPostLoading());
  axios
    .get("/api/posts")
    .then((res) => {
      const posts = res.data.sort((a, b) => b.likes.length - a.likes.length);
      return dispatch({
        type: GET_POSTS,
        payload: posts,
      });
    })
    .catch((err) => {
      return dispatch({
        type: GET_POSTS,
        payload: null,
      });
    });
};

//GET POST
export const getPost = (id) => (dispatch) => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then((res) => {
      return dispatch({
        type: GET_POST,
        payload: res.data,
      });
    })
    .catch((err) => {
      return dispatch({
        type: GET_POST,
        payload: null,
      });
    });
};

//Add like
export const addLike = (id, userLike, posts) => (dispatch) => {
  axios
    .post(`/api/posts/like/${id}`, userLike)
    .then((res) => {
      const index = posts.findIndex((post) => post._id === id);
      let newPost = posts.filter((post) => {
        return post._id.toString() !== id.toString();
      });
      dispatch({
        type: REMOVE_LIKE,
        payload: newPost,
      });

      return dispatch({
        type: ADD_LIKE,
        payload: {
          data: res.data,
          index: index,
        },
      });
    })
    .catch((err) => {
      return dispatch({
        type: GET_ERRORS,
        payload: { error: "errors" },
      });
    });
};

//Add like to single post
export const addLikeSinglePost = (id, userLike) => (dispatch) => {
  axios
    .post(`/api/posts/like/${id}`, userLike)
    .then((res) => dispatch(getPost(id)))
    .catch((err) => {
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//Remove like
export const removeLikeSinglePost = (id) => (dispatch) => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then((res) => dispatch(getPost(id)))
    .catch((err) => {
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//Remove like from single post
export const removeLike = (id) => (dispatch) => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then((res) => dispatch(getPosts(id)))
    .catch((err) => {
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//Add comment
export const addComment = (id, comment) => (dispatch) => {
  axios
    .post(`/api/posts/comment/${id}`, comment)
    .then((res) => {
      dispatch(getCurrentUser());
      return dispatch({
        type: GET_POST,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

//Add comment to Post Feed
export const addCommentToFeed = (id, comment, posts) => (dispatch) => {
  axios.post(`/api/posts/comment/${id}`, comment).then((res) => {
    const index = posts.findIndex((post) => post._id.toString() === id);
    let newPosts;
    console.log(posts);
    if (index === 0) {
      newPosts = [res.data, ...posts.slice(1)];
    } else {
      newPosts = [
        ...posts.slice(0, index),
        res.data,
        ...posts.slice(index + 1),
      ];
    }

    console.log(newPosts);
    return dispatch({
      type: ADD_COMMENT,
      payload: newPosts,
    });
  });
};

//Delete comment
export const deleteComment = (postid, commentid, posts) => (dispatch) => {
  axios
    .delete(`/api/posts/comment/${postid}/${commentid}`)
    .then((res) => {
      const index = posts.findIndex((post) => post._id.toString() === postid);
      console.log(res.data);
      let newPosts;
      if (index === 0) {
        newPosts = [res.data, ...posts.slice(1)];
      } else {
        newPosts = [
          ...posts.slice(0, index),
          res.data,
          ...posts.slice(index + 1),
        ];
      }
      addNotification({
        title: "Delete comment",
        message: "Your comment has been deleted",
        theme: "light",
      });
      return dispatch({
        type: GET_POSTS,
        payload: newPosts,
      });
    })
    .catch((err) => console.log(err));
};

//Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING,
  };
};
