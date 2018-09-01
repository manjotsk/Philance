import {
    USER_PROFILE_FIELDS_EMPTY,
    USER_PROFILE_TEXT_CHANGED,
    USER_PROFILE_COUNTRY_CHANGED,
    USER_PROFILE_DESCRIPTION_CHANGED,
    USER_PROFILE_EMAIL_CHANGED,
    USER_PROFILE_PASSWORD_CHANGED,
    USER_PROFILE_POSTAL_CODE_CHANGED,
    USER_PROFILE_CONTACT_CHANGED,
    USER_PROFILE_INTERESTS_CHANGED,
    USER_PROFILE_NAME_CHANGED,
    USER_PROFILE_ORGANIZATION_CHANGED,
    USER_PROFILE_TITLE_CHANGED,
    USER_PROFILE_UPDATE_SUCCESS,
    USER_PROFILE_UPDATE_UNMOUNT
} from '../actions/types'

const INITIAL_STATE = {
    contact: '',
    email: '',
    name: '',
    password: '',
    title: '',
    organization: '',
    country: '',
    postalCode: '',
    description: '',
    interests: '',
    text: 'SAVE CHANGES',
    update: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case USER_PROFILE_TEXT_CHANGED:
            return {...state, text: 'SAVE CHANGES'}
        case USER_PROFILE_FIELDS_EMPTY:
            return {...state, text: 'ALL FIELDS ARE REQUIRED'}
        case USER_PROFILE_PASSWORD_CHANGED:
            return {...state, password: action.payload}
        case USER_PROFILE_COUNTRY_CHANGED:
            return {...state, country: action.payload}
        case USER_PROFILE_INTERESTS_CHANGED:
            return {...state, interests: action.payload}
        case USER_PROFILE_DESCRIPTION_CHANGED:
            return {...state, description: action.payload}
        case USER_PROFILE_EMAIL_CHANGED:
            return {...state, email: action.payload}
        case USER_PROFILE_POSTAL_CODE_CHANGED:
            return {...state, postalCode: action.payload}
        case USER_PROFILE_CONTACT_CHANGED:
            return {...state, contact: action.payload}
        case USER_PROFILE_NAME_CHANGED:
            return {...state, name: action.payload}
        case USER_PROFILE_TITLE_CHANGED:
            return {...state, title: action.payload}
        case USER_PROFILE_ORGANIZATION_CHANGED:
            return {...state, organization: action.payload}
        case USER_PROFILE_UPDATE_SUCCESS:
            return {...state, update: true}
        case USER_PROFILE_UPDATE_UNMOUNT:
            return {...state, update: false}
        default:
            return state
    }
}