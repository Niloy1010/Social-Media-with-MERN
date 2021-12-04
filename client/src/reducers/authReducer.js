import isEmpty from '../validation/is-empty';
import {SET_CURRENT_USER, SET_CURRENT_USER_NOTIFICATION} from '../actions/types'
import {GET_CURRENT_USER,CHANGE_NOTIFICATION} from '../actions/types'
const initialState = {
    isAuthenticated : false,
    user : {}
}

export default function(state = initialState, action) {
    switch(action.type) {
       case SET_CURRENT_USER:
           return {
               ...state,
               isAuthenticated: !isEmpty(action.payload),
               user: action.payload
           }
        case GET_CURRENT_USER:
            return{
                ...state,
                user: {
                    ...state.user,
                    notifications: [...action.payload.notifications],
                    hasNotification: action.payload.hasNotification
                }
            }
        case CHANGE_NOTIFICATION:
            return {
                ...state,
                user: {
                    ...state.user,
                    hasNotification: false
                }
            }
        case SET_CURRENT_USER_NOTIFICATION:
            return {
                ...state,
                user:{
                    ...state.user,
                    hasNotification: action.payload.hasNotification,
                    notifications: [
                        ...action.payload.notifications
                    ]
                }
            }
        default:
            return state;
    }
}