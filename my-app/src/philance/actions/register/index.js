import {
    ALREADY_REGISTER,
    FIELDS_EMPTY,
    INVALID_EMAIL,
    NETWORK_ERROR,
    REGISTER_EMAIL_CHANGED,
    REGISTER_FIRST_NAME_CHANGED,
    REGISTER_LAST_NAME_CHANGED,
    REGISTER_PASSWORD_CHANGED,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    WEAK_PASSWORD
} from '../types'

import axios from 'axios'

export const firstNameChanged = text => {
    return {
        type: REGISTER_FIRST_NAME_CHANGED,
        payload: text
    }
}

export const lastNameChanged = text => {
    return {
        type: REGISTER_LAST_NAME_CHANGED,
        payload: text
    }
}

export const emailChanged = text => {
    return {
        type: REGISTER_EMAIL_CHANGED,
        payload: text
    }
}

export const passwordChanged = text => {
    return {
        type: REGISTER_PASSWORD_CHANGED,
        payload: text
    }
}

export const textChanged = () => {
    return {
        type: REGISTER_USER
    }
}

export const registerUser = ({ firstName, lastName, email, password }) => {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(email === '' || password === '' || firstName == '' || lastName == '' ) 
        return {
            type: FIELDS_EMPTY
        }
    else if (reg.test(email) == false) {
        return {
            type: INVALID_EMAIL
        }
    }

    else if (password.length<6) {
        return {
            type: WEAK_PASSWORD
        }
    }

    else {
        return dispatch => {
            dispatch({type: REGISTER_USER})
            console.log('email is', email)
            console.log('password is', password)
            axios.post('http://localhost:3001/philance/users/', {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            })
            .then(response=>
                dispatch({
                    type: REGISTER_USER_SUCCESS,
                    payload: response
                })
            )
            .catch(error=>{
                if(error.response.status==null){
                    dispatch({type: NETWORK_ERROR})
                }else{
                    console.log('ss',typeof(error.response.status))
                    const status = error.response.status
                    if (status == 409)
                        dispatch({type: ALREADY_REGISTER})
                    else if (status == 500)
                        dispatch({type: INVALID_EMAIL})
                    else 
                        dispatch({type: NETWORK_ERROR})
                }
            });
        }
    }
}

