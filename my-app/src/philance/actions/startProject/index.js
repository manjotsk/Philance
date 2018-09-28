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
  START_PROJECT_FILES_CHANGED,
  START_PROJECT_FILES_UPLOAD_FAILED,
  START_PROJECT_FILES_UPLOAD_SUCCESS,
  START_PROJECT_COUNTRY_CHANGED,
  START_PROJECT_INTERESTS_CHANGED
} from '../types'

import axios from 'axios'

import {hostname} from '../../../config'

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

export const countryChanged = text => {
  return {
      type: START_PROJECT_COUNTRY_CHANGED,
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
  country,
  interests,
  startDate,
  endDate,
  budget,
  userId,
  files
},uploadCallback , loaderCallback)=>{

  if(
    name === '' ||
    description === '' ||
    interests === '' ||
    country === '' ||
    startDate === ''
   ) {
     loaderCallback(false)
    return {
      type: START_PROJECT_FIELDS_EMPTY
    }
  }  var projectDetails=[]
  var interestsArray=interests.split(',')
  for(var i=0;i<interestsArray.length;i++){
    projectDetails.push({  
      "detailType": "IMPACT_CATEGORY",
      "name": interestsArray[i],
      "certificationReq": "NO",
      "certificationLink": "",
      "attribute1" : "",
      "attribute2" : "",
      "attribute3" : "",
      "attribute4" : "",
      "attribute5" : ""
    })
  }
  return dispatch => {
    loaderCallback(false)
      dispatch({type: START_PROJECT})
      axios.post(hostname()+'/philance/projects/', {  
        projectName : name,
        description : description,
        zipCode: zipCode,
        country: country,
        volunteers:volunteers,
        freelancers:freelancers,
        estimatedBudget:budget,
        startDate :startDate,
        interests :interests,
        endDate :endDate,
        userId:userId,
        files:files,
        "projectDetails":projectDetails
        }
)
      .then(response=>{
        if(response.status !== 200) {
          loaderCallback(false)
          return {
            type: START_PROJECT_NETWORK_ERROR
          }
        }else{
          loaderCallback(false)
          dispatch({
            type: START_PROJECT_REQUEST_SUCCESS
          })
          uploadCallback(response.data.project[0].projectId);
        }
      })
      .catch(error=>{
        loaderCallback(false)
      console.log(error);
      return {
        type: START_PROJECT_NETWORK_ERROR
      }
      });
  }
}
export const startProjectUnmount=()=>{
  return dispatch=> {
    dispatch({
      type: START_PROJECT_UNMOUNT
    })
  }
}
export const interestschanged = text => {
  return {
      type: START_PROJECT_INTERESTS_CHANGED,
      payload: text
  }
}
export const uploadFiles = (metadata, files) => {
  if(!files){
      return dispatch=>{
          dispatch({
              type:START_PROJECT_FILES_UPLOAD_FAILED
          })
      }
  }else{
      return dispatch => {
          const url = hostname() + '/philance/files';
          const formData = new FormData();
          formData.append('file', files)
          formData.append('param', JSON.stringify(metadata))          
          const config = {
              headers: {
                  'content-type': 'multipart/form-data'
              }
          }
          axios.post(url, formData, config)
              .then(() => {
                  dispatch({
                      type: START_PROJECT_FILES_UPLOAD_SUCCESS
                  })
              })
              .catch(() => {
                  dispatch({
                      type: START_PROJECT_FILES_UPLOAD_FAILED
                  })
  
              })
      }
  }

}