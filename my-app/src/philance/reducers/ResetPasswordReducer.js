import {
    EMAIL_CHANGED,
    EMAIL_EMPTY,
    RESET_PASSWORD_NETWORK_ERROR,
    RESET_PASSWORD_EMAIL_SENT    
} from '../actions/types'

const INITIAL_STATE = {
    email: '',
    emailSent:false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case EMAIL_CHANGED: 
            return {...state, email: action.payload}
        case EMAIL_EMPTY:
            return {...state, error: 'Email Field can\'t be empty'} 
        case RESET_PASSWORD_NETWORK_ERROR:
            return {...state, error: 'Invalid Credentials'}
        case RESET_PASSWORD_EMAIL_SENT:
            return {...state, emailSent: true}
        default:
        return state
    }
}