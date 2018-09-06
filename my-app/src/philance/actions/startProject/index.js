import {
  START_PROJECT,
  START_PROJECT_BUDGET_CHANGED,
  START_PROJECT_DESCRIPTION_CHANGED,
  START_PROJECT_END_DATE_CHANGED,
  START_PROJECT_FIELDS_EMPTY,
  START_PROJECT_FREELANCERS_CHANGED,
  START_PROJECT_NAME_CHANGED,
  START_PROJECT_START_DATE_CHANGED,
  START_PROJECT_VOLUNTEERS_CHANGED,
  START_PROJECT_ZIP_CODE_CHANGED,
  START_PROJECT_NETWORK_ERROR,
  START_PROJECT_REQUEST_SUCCESS,
  START_PROJECT_UNMOUNT,
  START_PROJECT_FILES_CHANGED
} from '../types'

import axios from 'axios'

import hostname from '../../../config'

export const textChanged = () => {
    return {
        type: START_PROJECT
    }
}

export const budgetChanged = text => {
  return {
      type: START_PROJECT_BUDGET_CHANGED,
      payload: text
  }
}

export const filesChanged = text => {
  return {
      type: START_PROJECT_FILES_CHANGED,
      payload: text
  }
}

export const descriptionChanged = text => {
  return {
      type: START_PROJECT_DESCRIPTION_CHANGED,
      payload: text
  }
}

export const endDateChanged = text => {
  return {
      type: START_PROJECT_END_DATE_CHANGED,
      payload: text
  }
}

export const freelancersChanged = text => {
  return {
      type: START_PROJECT_FREELANCERS_CHANGED,
      payload: text
  }
}

export const projectNameChanged = text => {
  return {
      type: START_PROJECT_NAME_CHANGED,
      payload: text
  }
}

export const startDateChanged = text => {
  return {
      type: START_PROJECT_START_DATE_CHANGED,
      payload: text
  }
}

export const volunteersChanged = text => {
  return {
      type: START_PROJECT_VOLUNTEERS_CHANGED,
      payload: text
  }
}

export const zipCodeChanged = text => {
  return {
      type: START_PROJECT_ZIP_CODE_CHANGED,
      payload: text
  }
}

export const startProject=({
  name,
  description,
  volunteers,
  freelancers,
  zipCode,
  interests,
  startDate,
  endDate,
  budget,
  userId,
  files
})=>{
  
  if(
    name === '' ||
    description === '' ||
    volunteers === '' ||
    freelancers === '' ||
    interests === '' ||
    zipCode === '' ||
    startDate === '' ||
    endDate === '' ||
    budget === ''
   ) {
    return {
      type: START_PROJECT_FIELDS_EMPTY
    }
  }
  return dispatch => {
      dispatch({type: START_PROJECT})
      axios.post(hostname()+'/philance/projects/', {  
        projectName : name,
        description : description,
        location: zipCode,
        volunteers:volunteers,
        freelancers:freelancers,
        estimatedBudget:budget,
        startDate :startDate,
        endDate :endDate,
        userId:userId,
        files:files,
        "projectDetails":[  
          {  
            "detailType": "SKILLS",
            "name": "Database Development",
            "certificationReq": "NO",
            "certificationLink": "",
            "attribute1" : "",
            "attribute2" : "",
            "attribute3" : "",
            "attribute4" : "",
            "attribute5" : ""
          },
          {  
            "detailType": "SKILLS",
            "name": "Java Development",
            "certificationReq": "NO",
            "certificationLink": "",
            "attribute1" : "",
            "attribute2" : "",
            "attribute3" : "",
            "attribute4" : "",
            "attribute5" : ""
          },
          {  
            "detailType": "IMPACT_CATEGORY",
            "name": "Elderly",
            "certificationReq": "NO",
            "certificationLink": "",
            "attribute1" : "",
            "attribute2" : "",
            "attribute3" : "",
            "attribute4" : "",
            "attribute5" : ""
          },
          {  
          "detailType": "IMPACT_CATEGORY",
            "name": "Other",
            "certificationReq": "NO",
            "certificationLink": "",
            "attribute1" : "",
            "attribute2" : "",
            "attribute3" : "",
            "attribute4" : "",
            "attribute5" : ""
          }
       ]
        }
)
      .then(response=>{
        console.log(response)
        if(response.status !== 200) {
          return {
            type: START_PROJECT_NETWORK_ERROR
          }
        }else{
          dispatch({
            type: START_PROJECT_REQUEST_SUCCESS
          })
        }
      })
      .catch(error=>{
      console.log(error);
      return {
        type: START_PROJECT_NETWORK_ERROR
      }
      });
  }
}
export const startProjectUnmount=()=>{
  return {
    type: START_PROJECT_UNMOUNT
}
}