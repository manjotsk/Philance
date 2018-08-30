import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER,
    PASSWORD_EMPTY,
    EMAIL_EMPTY,
    FIELDS_EMPTY,
    INVALID_CREDENTIALS,
    LOGIN_NETWORK_ERROR,
    RESET_PASSWORD_NETWORK_ERROR
} from '../actions/types'

const INITIAL_STATE = {
    email: ''
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case EMAIL_CHANGED: 
            return {...state, email: action.payload}
        case EMAIL_EMPTY:
            return {...state, error: 'Email Field can\'t be empty'} 
        case RESET_PASSWORD_NETWORK_ERROR:
            return {...state, error: 'Invalid Credentials'}
        default:
        return state
    }
}