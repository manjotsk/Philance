import {
    USER_PROFILE_TEXT_CHANGED
} from '../types'

export const textChanged = () => {
    return {
        type: USER_PROFILE_TEXT_CHANGED
    }
}

export const updateProfile = ({ userName, email, firstName, lastName, city, country, postalCode, description, text }) => {
    
}