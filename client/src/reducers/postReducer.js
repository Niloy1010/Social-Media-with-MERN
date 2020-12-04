import {ADD_POST, GET_POSTS,POST_LOADING, DELETE_POST, GET_POST,ADD_LIKE,REMOVE_LIKE,ADD_COMMENT} from '../actions/types';

const initialState = {
    posts: [],
    post: {},
    loading: false
};

export default function(state = initialState, action) {
    switch(action.type) {
    case ADD_POST:
        return {
            ...state,
            posts: [action.payload, ...state.posts]
        }
    case DELETE_POST:
        console.log(action.payload);
        return {
            ...state,
            posts : state.posts.filter(post => post._id != action.payload)
        }
    
    case POST_LOADING: 
        return {
            loading: true
        }
    case GET_POST:
        return {
            ...state,
            post: action.payload,
            loading: false
        }
    case GET_POSTS:
        return {
            ...state,
            posts : action.payload,
            loading: false
        }
    case REMOVE_LIKE: 
        return {
            ...state,
            posts: action.payload
        }
    case ADD_COMMENT:
        return {
            ...state,
            posts: action.payload

        }
    case ADD_LIKE:
        return {
            ...state,
            posts: [...state.posts.slice(0,action.payload.index),
            action.payload.data,...state.posts.slice(action.payload.index)
        ]
        }
    default:
        return state;
    }
}