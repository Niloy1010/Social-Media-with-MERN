import axios from 'axios';
import {ADD_POST, DELETE_POST, GET_ERRORS, GET_POSTS, POST_LOADING, GET_POST,ADD_IMAGE_POST, SET_ERRORS_NULL} from './types';
import {getCurrentUser} from './authActions';
import addNotification from 'react-push-notification';

//ADD POST
export const addPost = postData => dispatch => {
    axios.post('/api/posts', postData)
    .then(res => {

        addNotification({
            title: 'Post',
            message: 'Your status has been posted',
            theme: 'light'
        });
        dispatch({
            type: SET_ERRORS_NULL
        })
        return dispatch({
            type: ADD_POST,
            payload: res.data
        })
    })
    .catch(err=> (
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    ))
}


//ADD IMAGE POST


export const addImagePost = postData => dispatch => {
    console.log(postData);
    axios.post('/api/posts/image', postData)
    .then(res => {

        
        addNotification({
            title: 'Image Upload',
            message: 'Your image has been uploaded',
            theme: 'light'
        });
        dispatch({
            type: SET_ERRORS_NULL
        })
        dispatch({
            type: ADD_POST,
            payload: res.data
        })
    })
    .catch(err=> (
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    ))
}


//DELETE POST
export const deletePost = id => dispatch => {
    axios.delete(`/api/posts/${id}`)
    .then(res => {
       
        return dispatch({
            type: DELETE_POST,
            payload: id
        })
    })
    .catch(err=> {
        console.log(err.response.data);
      return  dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}


//GET POSTS
export const getPosts = () => dispatch => {
    dispatch(setPostLoading());
    axios.get('/api/posts')
    .then(res => 
        {
        return dispatch({
            type: GET_POSTS,
            payload: res.data
        })
})
    .catch(err=> 
        {
        return dispatch({
            type: GET_POSTS,
            payload: null
        })
    })
}

//GET POST
export const getPost = (id) => dispatch => {
    dispatch(setPostLoading());
    axios.get(`/api/posts/${id}`)
    .then(res => 
        {
        return dispatch({
            type: GET_POST,
            payload: res.data
        })
})
    .catch(err=> 
        {
        return dispatch({
            type: GET_POST,
            payload: null
        })
    })
}

//Add like
export const addLike = (id,userLike) => dispatch => {
    axios.post(`/api/posts/like/${id}`,userLike)
    .then(res => {
        dispatch(getCurrentUser());
        return dispatch(getPosts())})
    .catch(err=> 
        {
        return dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}

//Add like to single post
export const addLikeSinglePost = (id,userLike) => dispatch => {
    axios.post(`/api/posts/like/${id}`,userLike)
    .then(res => dispatch(getPost(id)))
    .catch(err=> 
        {
        return dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}


//Remove like
export const removeLikeSinglePost = id => dispatch => {
    axios.post(`/api/posts/unlike/${id}`)
    .then(res => dispatch(getPost(id)))
    .catch(err=> 
        {
        return dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}


//Remove like from single post
export const removeLike = id => dispatch => {
    axios.post(`/api/posts/unlike/${id}`)
    .then(res => dispatch(getPosts(id)))
    .catch(err=> 
        {
        return dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}

//Add comment
export const addComment = (id, comment) => dispatch => {
    axios.post(`/api/posts/comment/${id}`, comment)
    .then(res=> {
        console.log("comment");
        dispatch(getCurrentUser());
        return dispatch({
            type: GET_POST,
            payload: res.data
        })})
    .catch(err=> console.log(err))
}


//Delete comment
export const deleteComment = (postid, commentid) => dispatch => {
    axios.delete(`/api/posts/comment/${postid}/${commentid}`)
    .then(res=> 
        dispatch({
            type: GET_POST,
            payload: res.data
        }))
    .catch(err=> console.log(err))
}






//Set loading state
export const setPostLoading = () => {
    return {
        type: POST_LOADING
    }
}