import {
    USER_PROFILE_FIELDS_EMPTY,
    USER_PROFILE_TEXT_CHANGED
} from '../actions/types'

const INITIAL_STATE = {
    userName: null,
    email: null,
    firstName: null,
    lastName: null,
    city: null,
    country: null,
    postalCode: null,
    description: null,
    text: 'UPDATE PROFILE'
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case USER_PROFILE_TEXT_CHANGED:
            return {...state, text: 'UPDATE PROFILE'}
        case USER_PROFILE_FIELDS_EMPTY:
            return {...state, text: 'ALL FIELDS ARE REQUIRED'}
        default:
            return state
    }
}