import {
    USER_PROFILE_TEXT_CHANGED,
    USER_PROFILE_FIELDS_EMPTY,
    USER_PROFILE_COUNTRY_CHANGED,
    USER_PROFILE_NAME_CHANGED,
    USER_PROFILE_ORGANIZATION_CHANGED,
    USER_PROFILE_TITLE_CHANGED,
    USER_PROFILE_DESCRIPTION_CHANGED,
    USER_PROFILE_EMAIL_CHANGED,
    USER_PROFILE_PASSWORD_CHANGED,
    USER_PROFILE_POSTAL_CODE_CHANGED,
    USER_PROFILE_INTERESTS_CHANGED,
    USER_PROFILE_CONTACT_CHANGED
} from '../types'

import axios from 'axios'

import hostname from '../../../config'

export const textChanged = () => {
    return {
        type: USER_PROFILE_TEXT_CHANGED
    }
}

export const emailChanged = text => {
    return {
        type: USER_PROFILE_EMAIL_CHANGED,
        payload: text
    }
}

export const nameChanged = text => {
    return {
        type: USER_PROFILE_NAME_CHANGED,
        payload: text
    }
}

export const oraganizationChanged = text => {
    return {
        type: USER_PROFILE_ORGANIZATION_CHANGED,
        payload: text
    }
}

export const titleChanged = text => {
    return {
        type: USER_PROFILE_TITLE_CHANGED,
        payload: text
    }
}

export const contactChanged = text => {
    return {
        type: USER_PROFILE_CONTACT_CHANGED,
        payload: text
    }
}

export const descriptionChanged = text => {
    return {
        type: USER_PROFILE_DESCRIPTION_CHANGED,
        payload: text
    }
}

export const postalCodeChanged = text => {
    return {
        type: USER_PROFILE_POSTAL_CODE_CHANGED,
        payload: text
    }
}

export const countryChanged = text => {
    return {
        type: USER_PROFILE_COUNTRY_CHANGED,
        payload: text
    }
}

export const passwordChanged = text => {
    return {
        type: USER_PROFILE_PASSWORD_CHANGED,
        payload: text
    }
}

export const interestschanged = text => {
    return {
        type: USER_PROFILE_INTERESTS_CHANGED,
        payload: text
    }
}

export const updateProfile = ({ name, email, password, contact, country, postalCode, description, organization, title, interests }) => {
    if(email === ''
        || country === '' 
        || password === ''
        || postalCode === ''
        || description === ''
        || contact === ''
        || title === ''
        || organization === ''
        || name === '' 
        || interests === ''
    ) {
        return {
            type: USER_PROFILE_FIELDS_EMPTY
        }
    }
    else return dispatch => {
        dispatch({type: USER_PROFILE_TEXT_CHANGED})
        axios.put(hostname()+'/philance/users/1', {
            firstName: name.split(" ")[0],
            lastName: name.split(" ")[1],
            email: email,
            password: password,
            contact: contact,
            postalCode: postalCode,
            country: country,
            description: description,
            title: title,
            organization: organization,
            interests: interests
         })
            .then(response=>
                console.log(response)
            )
            .catch(error=>{
                console.log(error)
            });
    }
}