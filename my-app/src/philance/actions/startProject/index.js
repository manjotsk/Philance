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
  budget
})=>{

  if(
    name === '' ||
    description === '' ||
    volunteers === '' ||
    freelancers === '' ||
    zipCode === '' ||
    interests === '' ||
    zipCode === '' ||
    interests === '' ||
    startDate === '' ||
    endDate === '' ||
    budget
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
        zipCode: zipCode,
        interests: interests,
        volunteers:volunteers,
        freelancers:freelancers,
        startDate :startDate,
        endDate :endDate,
        estimatedBudget:budget
        }
)
      .then(response=>console.log(response))
      .catch(error=>{
      console.log(error);
      });
  }
}