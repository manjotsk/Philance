import axios from 'axios'

import {hostname} from '../../../config'
import {PROJECT_DETAILS_GET_DETAILS, PROJECT_DETAILS_CHANGED} from '../types'

export const budgetChanged = text => {
    return {
        type: PROJECT_DETAILS_CHANGED,
        payload: text
    }
  }
  
  export const filesChanged = text => {
    return {
        type: PROJECT_DETAILS_CHANGED,
        payload: text
    }
  }
  
  export const descriptionChanged = text => {
    return {
        type: PROJECT_DETAILS_CHANGED,
        payload: text
    }
  }
  
  export const endDateChanged = text => {
    return {
        type: PROJECT_DETAILS_CHANGED,
        payload: text
    }
  }
  
  export const freelancersChanged = text => {
    return {
        type: PROJECT_DETAILS_CHANGED,
        payload: text
    }
  }
  
  export const projectNameChanged = text => {
    return {
        type: PROJECT_DETAILS_CHANGED,
        payload: text
    }
  }
  
  export const countryChanged = text => {
    return {
        type: PROJECT_DETAILS_CHANGED,
        payload: text
    }
  }
  
  export const startDateChanged = text => {
    return {
        type: PROJECT_DETAILS_CHANGED,
        payload: text
    }
  }
  
  export const volunteersChanged = text => {
    return {
        type: PROJECT_DETAILS_CHANGED,
        payload: text
    }
  }
  
  export const zipCodeChanged = text => {
    return {
        type: PROJECT_DETAILS_CHANGED,
        payload: text
    }
  }
export const getProjectById =(id)=> {
    return dispatch=> {
        axios.get(hostname()+`/philance/projects/${id}`)
        .then(response=>{
            console.log(response)
            dispatch({
                type: PROJECT_DETAILS_GET_DETAILS,
                payload: response.data.project[0]
            })
        })
        .catch(err=>console.log(err))
    }
}