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
    USER_PROFILE_UPDATE_UNMOUNT,
    USER_PROFILE_GET_USER_INFO,
    LOGOUT_USER,
    USER_PROFILE_USER_IMAGE_CHANGED_FOR_PREVIEW,
    USER_PROFILE_USER_IMAGE_CHANGED_AFTER_UPLOAD,
    USER_PROFILE_USER_IMAGE_CHANGED_WAS_CHANGED,
    UPLOAD_STARTED,
    PROFILE_IMAGE_UPLOAD_SUCCESS
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
    update: false,
    interestsArrived: true,
    userId: '',
    displayImage:true,
    imageRefresh:false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_PROFILE_USER_IMAGE_CHANGED_FOR_PREVIEW:
            return { ...state, userImageFile: action.payload, userImage: URL.createObjectURL(action.payload) }
        case USER_PROFILE_USER_IMAGE_CHANGED_AFTER_UPLOAD:
            return { ...state, userImage: action.payload }
        case USER_PROFILE_USER_IMAGE_CHANGED_WAS_CHANGED:
            return { ...state, imageRefresh:true }
        case USER_PROFILE_TEXT_CHANGED:
            return { ...state, text: 'SAVE CHANGES' }
        case USER_PROFILE_FIELDS_EMPTY:
            return { ...state, text: 'ALL FIELDS ARE REQUIRED' }
        case USER_PROFILE_PASSWORD_CHANGED:
            return { ...state, password: action.payload }
        case USER_PROFILE_COUNTRY_CHANGED:
            return { ...state, country: action.payload }
        case USER_PROFILE_INTERESTS_CHANGED:
            return { ...state, interests: action.payload }
        case USER_PROFILE_DESCRIPTION_CHANGED:
            return { ...state, description: action.payload }
        case USER_PROFILE_EMAIL_CHANGED:
            return { ...state, email: action.payload }
        case USER_PROFILE_POSTAL_CODE_CHANGED:
            return { ...state, postalCode: action.payload }
        case USER_PROFILE_CONTACT_CHANGED:
            return { ...state, contact: action.payload }
        case USER_PROFILE_NAME_CHANGED:
            return { ...state, name: action.payload }
        case USER_PROFILE_TITLE_CHANGED:
            return { ...state, title: action.payload }
        case USER_PROFILE_ORGANIZATION_CHANGED:
            return { ...state, organization: action.payload }
        case USER_PROFILE_UPDATE_SUCCESS:
            return { ...state, update: true }
        case USER_PROFILE_UPDATE_UNMOUNT:
            return { ...state, update: false}
        case 'USER_PROFILE_IMAGE_REFRESH_NOT_REQUIRED':
            return { ...state, imageRefresh:false}
        case PROFILE_IMAGE_UPLOAD_SUCCESS:
            return { ...state, displayImage: true }
        case UPLOAD_STARTED:
            return { ...state, displayImage: false }
        case USER_PROFILE_GET_USER_INFO:
            return {
                ...state,
                email: action.payload.email,
                name: action.payload.fname + ' ' + action.payload.lname,
                title: action.payload.title,
                organization: action.payload.organization,
                description: action.payload.description,
                interests: action.payload.interests,
                userId: action.payload.user_id,
                userImage: action.payload.user_profile_image_url,
                contact: action.payload.ph_number,
                postalCode: action.payload.zip_code,
                country: action.payload.country
            }
        case LOGOUT_USER:
            return {
                ...state,
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
                update: false,
                interestsArrived: true,
                userId: '',
                userImage:null

            }
        default:
            return state
    }
}