import axios from 'axios';
import {CHANGE_NOTIFICATION, SET_CURRENT_USER,SET_CURRENT_USER_NOTIFICATION} from './types'

export const changeNotification = () => dispatch => {
    axios.get('/api/users/notifications/visited').then(user=> {
        return dispatch({
            type: SET_CURRENT_USER_NOTIFICATION,
            payload: user.data

        })
    })
}

export const changeNotificationToRead = (id) => dispatch => {
    axios.get(`/api/users/notifications/visited/${id}`).then(user=> {
        return dispatch({
            type: SET_CURRENT_USER_NOTIFICATION,
            payload: user.data

        })
    })
}
