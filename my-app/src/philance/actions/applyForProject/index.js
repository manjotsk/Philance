import axios from 'axios'

import {hostname} from '../../../config'
import {
    APPLY_FOR_PROJECT_MESSAGE_CHANGED,
    APPLY_FOR_PROJECT_ROLE_CHANGED,
    APPLY_FOR_PROJECT_REMOVE_TOASTER,
    APPLY_FOR_PROJECT_UPDATE_SUCCESS,
    APPLY_FOR_PROJECT_ALREADY_APPLIED,
} from '../types'

export const removeToaster =()=> {
    return {
        type: APPLY_FOR_PROJECT_REMOVE_TOASTER
    }
}

export const messageChanged = text => {
    return {
        type: APPLY_FOR_PROJECT_MESSAGE_CHANGED,
        payload: text
    }
  }
  
  export const roleChanged = text => {
    return {
        type: APPLY_FOR_PROJECT_ROLE_CHANGED,
        payload: text
    }
  }

export const applyForProject =({userId, projectId, message, role})=> {
    return dispatch => {
        axios.post(hostname()+`/philance/projects/${projectId}/users`, {
            userId : userId,
            applicationMessage : message,
            role : role,
            type: ''
        })
        .then(
            response=> {
                console.log(response, userId, projectId)
                dispatch({
                    type: APPLY_FOR_PROJECT_UPDATE_SUCCESS
                })
            }
        )
        .catch(
            error=> {
                const status = error.response.status
                if(status===409) {
                    dispatch({
                        type: APPLY_FOR_PROJECT_ALREADY_APPLIED
                    })
                }
            }
        )
    }
}