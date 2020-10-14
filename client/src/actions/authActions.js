import axios from 'axios';
import {GET_ERRORS} from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {SET_CURRENT_USER} from './types'


//ACTION CREATOR
//Register User
export const registerUser = (userData,history) => dispatch => {
    axios
        .post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err=> {
          return dispatch({
              type : GET_ERRORS,
              payload: err.response.data
          })
        });
}


//Get user token
export const loginUser = (userData) =>dispatch => {
  axios.post('/api/users/login', userData)
  .then(res=> {
      const {token} = res.data;


      localStorage.setItem('jwtToken',token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      return dispatch(setCurrentUser(decoded));

  })
  .catch(err=> {
      return dispatch({
                    type : GET_ERRORS,
                    payload: err.response.data
                })
  })
}


//Log user out
export const logoutUser = ()=> dispatch => {
  //remove token from localstorage
  localStorage.removeItem('jwtToken');
  //remove auth header for future request
  setAuthToken(false);

  //set current user to {}
  return dispatch(setCurrentUser({}))

}


//Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}