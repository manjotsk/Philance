import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    PASSWORD_EMPTY,
    EMAIL_EMPTY,
    FIELDS_EMPTY
} from '../types'

import axios from 'axios'

export const emailChanged = text => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    }
}

export const passwordChanged = text => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    }
}

export const textChanged = () => {
    return {
        type: LOGIN_USER
    }
}

export const loginUser = ({email, password}) => {
    if(email === '' && password === '') 
        return {
            type: FIELDS_EMPTY
        }
    else if(email === '')
        return {
            type: EMAIL_EMPTY
        }
    else if(password === '')
        return {
            type: PASSWORD_EMPTY
        }
    return dispatch => {
        dispatch({type: LOGIN_USER})
        console.log('email is', email)
        console.log('password is', password)
        axios.post('http://127.0.0.1:3001/philance/users/login/', {
            email: email,
            password: password
        })
        .then(response=>console.log(response))
        .catch(error=>{
        console.log(error);
        });
    }
}

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    })
}

const loginUserFail = (dispatch, user) => {
    dispatch({type: LOGIN_USER_FAIL})
}
