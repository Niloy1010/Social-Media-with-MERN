import axios from 'axios';
import { PROFILE_LOADING, GET_ERRORS, SET_CURRENT_USER,GET_PROFILES } from './types';
import {GET_PROFILE, CLEAR_CURRENT_PROFILE} from './types';

export const getCurrentProfile= ()=> dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile').then(res => 
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        }))
        .catch(err=>
            dispatch({
                type: GET_PROFILE,
                payload: {}
            }))
}


const setProfileLoading =() =>{
    return {
        type: PROFILE_LOADING
    }
}



//Get profile by handle
export const getProfileByHandle= (handle)=> dispatch => {
    dispatch(setProfileLoading());
    axios.get(`/api/profile/handle/${handle}`).then(res => {
        console.log(res);
        return dispatch({
            type: GET_PROFILE,
            payload: res.data
        })})
        .catch(err=>
            dispatch({
                type: GET_PROFILE,
                payload: {}
            }))
}



//Create Profile
export const createProfile = (profileData, history)=> dispatch => {
    axios.post('/api/profile', profileData)
    .then(res=> history.push('/dashboard'))
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
  
      })
      )
  }

  //Add experience
  export const addExperience = (expData, history) => dispatch => {
      axios.post('/api/profile/experience', expData)
      .then(res=> history.push('/dashboard'))
      .catch(err=>(
          dispatch({
              type: GET_ERRORS,
              payload: err.response.data
          })
      ))
  }


  //Add education
  export const addEducation = (eduData, history) => dispatch => {
      axios.post('/api/profile/education', eduData)
      .then(res=>history.push('/dashboard'))
      .catch(err=> (
          dispatch({
              type: GET_ERRORS,
              payload: err.response.data
          })
      ))
  }

  //Delete Experience
  export const deleteExperience = (id) => dispatch=> {
      axios.delete(`/api/profile/experience/${id}`)
      .then(res=> dispatch({
          type: GET_PROFILE,
          payload: res.data
      }))
      .catch(err=> dispatch({
          type: GET_ERRORS,
          payload: err.response.data
      }))
      
  }

  //Delete education
  export const deleteEducation = (id) => dispatch=> {
    axios.delete(`/api/profile/education/${id}`)
    .then(res=> dispatch({
        type: GET_PROFILE,
        payload: res.data
    }))
    .catch(err=> dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
    
}


 //Get all Profiles
 export const getProfiles = () => dispatch=> {
     console.log("Inside getProfiles");
     dispatch(setProfileLoading());
    axios.get("/api/profile/all")
    .then(res=> {
        
        console.log("Inside then");
        console.log(res.data);
        return dispatch({
        type: GET_PROFILES,
        payload: res.data
    }
    )
    }
)

    .catch(err=> dispatch({
        type: GET_PROFILES,
        payload: {}
    }))
    
}

//Delete Profile and account
export const deleteAccount = () => dispatch =>{
    if(window.confirm('Are you sure you want to delete your account?This cannot be undone')){
        axios.delete('/api/profile')
        .then(res=> {
            dispatch({
                type: SET_CURRENT_USER,
                payload: {}
            })
        })
        .catch(err=>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
    }
}

  
//Clear profile
export const clearCurrentProfile =() =>{
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}