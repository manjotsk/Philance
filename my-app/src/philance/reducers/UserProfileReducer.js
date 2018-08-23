import {
    USER_PROFILE_FIELDS_EMPTY,
    USER_PROFILE_TEXT_CHANGED,
    USER_PROFILE_CITY_CHANGED,
    USER_PROFILE_COUNTRY_CHANGED,
    USER_PROFILE_DESCRIPTION_CHANGED,
    USER_PROFILE_EMAIL_CHANGED,
    USER_PROFILE_FIRSTNAME_CHANGED,
    USER_PROFILE_LASTNAME_CHANGED,
    USER_PROFILE_POSTAL_CODE_CHANGED,
    USER_PROFILE_USERNAME_CHANGED
} from '../actions/types'

const INITIAL_STATE = {
    userName: '',
    email: '',
    firstName: '',
    lastName: '',
    city: '',
    country: '',
    postalCode: '',
    description: '',
    text: 'UPDATE PROFILE'
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case USER_PROFILE_TEXT_CHANGED:
            return {...state, text: 'UPDATE PROFILE'}
        case USER_PROFILE_FIELDS_EMPTY:
            return {...state, text: 'ALL FIELDS ARE REQUIRED'}
        case USER_PROFILE_LASTNAME_CHANGED:
            return {...state, lastName: action.payload}
        case USER_PROFILE_CITY_CHANGED:
            return {...state, city: action.payload}
        case USER_PROFILE_COUNTRY_CHANGED:
            return {...state, country: action.payload}
        case USER_PROFILE_DESCRIPTION_CHANGED:
            return {...state, description: action.payload}
        case USER_PROFILE_FIRSTNAME_CHANGED:
            return {...state, firstName: action.payload}
        case USER_PROFILE_EMAIL_CHANGED:
            return {...state, email: action.payload}
        case USER_PROFILE_POSTAL_CODE_CHANGED:
            return {...state, postalCode: action.payload}
        case USER_PROFILE_USERNAME_CHANGED:
            return {...state, userName: action.payload}
        default:
            return state
    }
}