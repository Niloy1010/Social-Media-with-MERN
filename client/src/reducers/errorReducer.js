import {GET_ERRORS,SET_ERRORS_NULL} from '../actions/types'

const initialState = {};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ERRORS :
            return action.payload;
        case SET_ERRORS_NULL:
            return {}
        default: 
            return state
    }
}