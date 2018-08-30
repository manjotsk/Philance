import {
    EMAIL_CHANGED,
    INVALID_CREDENTIALS,
    LOGIN_NETWORK_ERROR,
    RESET_PASSWORD,
    RESET_PASSWORD_EMAIL_SENT,
    LOGIN_USER_SUCCESS,
    LOGIN_USER,
    PASSWORD_EMPTY,
    EMAIL_EMPTY,
    FIELDS_EMPTY,
    RESET_PASSWORD_NETWORK_ERROR
} from '../types'

import axios from 'axios'

import hostname from '../../../config'

/**
 * The method recieves the text from password input field and updates the email key parameter in the redux store
 * @param {*} param0 Input is received in the form of text
 */

export const emailChanged = text => {
    console.log(text)
    return {
        type: EMAIL_CHANGED,
        payload: text
    }
}

/**
 * The method checks weather text in any of the input field is changed
 * @param {*} param0 No inputs received
 */

export const textChanged = () => {
    return {
        type: LOGIN_USER
    }
}

/**
 * Logins the user based on input criteria.
 *  All the fields must be filled
 * @param {*} param0 input object in the format { email, password }
 */

export const resetPassword = ({email}) => {
    console.log('email is', email)
    if(email === '')
    return {
        type: EMAIL_EMPTY
    }
    return dispatch => {
        dispatch({type: RESET_PASSWORD})
        var userId='1'
        console.log('********'+hostname()+`/philance/users/passwordReset/create/${userId}`)
        axios.post(hostname()+`/philance/users/passwordReset/create/${userId}`, {       //TODO: Neglect User Id in posting
            token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpankuZ2FuZHJhQGdtYWlsLmNvbSIsInVzZXJJZCI6MSwiaWF0IjoxNTM1NDAzMDI5fQ.KHCgfsrVKBahOPLdadS-FuPdEUw7WpAAhmDiE2o75SY",
            email: email
        })
        .then(response=>{
            const status = response.status
                dispatch({type: RESET_PASSWORD_EMAIL_SENT})
        })
        .catch(error=>{
            const status = error.response.status 
                dispatch({type: RESET_PASSWORD_NETWORK_ERROR})
        });
    }
}
