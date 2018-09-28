import {
  FIND_PROJECT_TEXT_CHANGED,
  FIND_PROJECT_LOCATION_CHANGED,
  FIND_PROJECT_RESOURCE_CHANGED,
  FIND_PROJECT_PROJECT_STATUS_CHANGED,
  FIND_PROJECT_IMPACT_CATEGORIES_CHANGED,
  FIND_PROJECT_COUNTRY_CHANGED,
  FIND_PROJECT_KEYWORD_CHANGED,
  FIND_PROJECT_UNMOUNT
} from '../types'
import axios from 'axios'

import { hostname } from '../../../config'

export const textChanged = () => {
  return {
    type: FIND_PROJECT_TEXT_CHANGED
  }
}

export const locationChanged = text => {
  return {
      type: FIND_PROJECT_LOCATION_CHANGED,
      payload: text
  }
}

export const resourceChanged = text => {
  return {
      type: FIND_PROJECT_RESOURCE_CHANGED,
      payload: text
  }
}

export const projectStatusChanged = text => {
  return {
      type: FIND_PROJECT_PROJECT_STATUS_CHANGED,
      payload: text
  }
}

export const impactCategoriesChanged = text => {
  return {
      type: FIND_PROJECT_IMPACT_CATEGORIES_CHANGED,
      payload: text
  }
}

export const countryChanged = text => {
  return {
      type: FIND_PROJECT_COUNTRY_CHANGED,
      payload: text
  }
}

export const keywordChanged = text => {
  return {
      type: FIND_PROJECT_KEYWORD_CHANGED,
      payload: text
  }
}

export const findProjects = ({
  resourceType,
  projectStatus,
  interests,
  zipCode,
  country,
  keyword
},loaderCallback) => {
  var volunteers=false;
  var freelancers=false;
  switch(resourceType){
    case 'Volunteers':{
      volunteers=true
    }
    case 'Freelancers':{
      freelancers=true
    }
    case 'Both':{
      volunteers=true
      freelancers=true
    }
  }
  return dispatch => {
    dispatch({ type: 'START_PROJECT' })
    var interestsArray=null
    if(interests){
      interestsArray=interests.split(',')
    }
    axios.post(hostname() + '/philance/projects/search', {
      zipCode: zipCode,
      country: country,
      // volunteers: volunteers,
      // freelancers: freelancers,
      interests:interestsArray,
      keywords:keyword
    })
      .then(response => {
        // loaderCallback(false)
        if (response.status !== 200) {
          return {
            type: 'FIND_PROJECTS_NETWORK_ERROR'
          }
        } else {
          dispatch({
            type: 'FIND_PROJECTS_REQUEST_SUCCESS',
            payload: response.data.respProjects
          })
        }
      })
      .catch(error => {
        // loaderCallback(false)
        console.log(error);
        return {
          type: 'FIND_PROJECTS_NETWORK_ERROR'
        }
      });
  }
}

export const findProjectUnmount=()=>{
  return dispatch=> {
    dispatch({
      type: FIND_PROJECT_UNMOUNT
    })
  }
}

  
export const findProjectsUnmount = () => {
  return dispatch => {
    dispatch({
      type: 'FIND_PROJECTS_UNMOUNT'
    })
  }
}
