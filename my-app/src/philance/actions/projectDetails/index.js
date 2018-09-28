import axios from 'axios'

import {hostname} from '../../../config'
import {
    PROJECT_DETAILS_GET_DETAILS,
    PROJECT_DETAILS_BUDGET_CHANGED,
    PROJECT_DETAILS_DESCRIPTION_CHANGED,
    PROJECT_DETAILS_FREELANCERS_CHANGED,
    PROJECT_DETAILS_NAME_CHANGED,
    PROJECT_DETAILS_COUNTRY_CHANGED,
    PROJECT_DETAILS_START_DATE_CHANGED,
    PROJECT_DETAILS_ZIP_CODE_CHANGED,
    PROJECT_DETAILS_VOLUNTEERS_CHANGED,
    PROJECT_DETAILS_END_DATE_CHANGED,
    PROJECT_DETAILS_STATUS_CHANGED,
    PROJECT_DETAILS_UPDATE_SUCESS,
    PROJECT_DETAILS_REMOVE_TOASTER,
    PROJECT_DETAILS_ID_STORED
} from '../types'

export const removeToaster =()=> {
    return {
        type: PROJECT_DETAILS_REMOVE_TOASTER
    }
}

export const budgetChanged = text => {
    return {
        type: PROJECT_DETAILS_BUDGET_CHANGED,
        payload: text
    }
  }
  
  export const descriptionChanged = text => {
    return {
        type: PROJECT_DETAILS_DESCRIPTION_CHANGED,
        payload: text
    }
  }
  
  export const endDateChanged = text => {
    return {
        type: PROJECT_DETAILS_END_DATE_CHANGED,
        payload: text
    }
  }
  
  export const freelancersChanged = text => {
    return {
        type: PROJECT_DETAILS_FREELANCERS_CHANGED,
        payload: text
    }
  }
  
  export const projectNameChanged = text => {
    return {
        type: PROJECT_DETAILS_NAME_CHANGED,
        payload: text
    }
  }
  
  export const countryChanged = text => {
    return {
        type: PROJECT_DETAILS_COUNTRY_CHANGED,
        payload: text
    }
  }
  
  export const startDateChanged = text => {
    return {
        type: PROJECT_DETAILS_START_DATE_CHANGED,
        payload: text
    }
  }
  
  export const volunteersChanged = text => {
    return {
        type: PROJECT_DETAILS_VOLUNTEERS_CHANGED,
        payload: text
    }
  }
  
  export const zipCodeChanged = text => {
    return {
        type: PROJECT_DETAILS_ZIP_CODE_CHANGED,
        payload: text
    }
  }

  export const statusChanged = text => {
    return {
        type: PROJECT_DETAILS_STATUS_CHANGED,
        payload: text
    }
  }

  export const idStored =(id)=> {
    return {
        type: PROJECT_DETAILS_ID_STORED,
        payload: id
    }
  }

export const updateProject =({name, status, country, description, volunteers, freelancers, budget, startDate, endDate, id}, loaderCallback)=> {
    return dispatch => {
        axios.put(hostname()+`/philance/projects/${id}`, {
            projectName : name,
            description : description,
            location : "Sample Location",
            volunteers : volunteers,
            freelancers : freelancers,
            estimatedBudget : budget,
            userId : id,
            startDate : startDate,
            endDate : endDate,
            projectDetails:[  
                {  
                    detailType: "SKILLS",
                    name: "NODE JS Development",
                    certificationReq: "NO",
                    certificationLink: "",
                    attribute1 : "",
                    attribute2 : "",
                    attribute3 : "",
                    attribute4 : "",
                    attribute5 : ""
                },
                {  
                detailType: "IMPACT_CATEGORY",
                    name: "Other",
                    certificationReq: "NO",
                    certificationLink: "",
                    attribute1 : "",
                    attribute2 : "",
                    attribute3 : "",
                    attribute4 : "",
                    attribute5 : ""
                }
            ]
        })
        .then(
            response=> {
                loaderCallback(false)
                console.log(response)
                dispatch({type: PROJECT_DETAILS_UPDATE_SUCESS})
            }
        )
        .catch(
            error=> {
                loaderCallback(false)
                console.log(error)
            }
        )
    }
}

export const getProjectById =(id, loaderCallback)=> {
    return dispatch=> {
        let arr = [], interests = [];
        axios.get(hostname()+`/philance/projects/${id}`)
        .then(response=>{
            console.log(response)
            arr = response.data.project[0].project_details;
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                interests.push(element.name)
            }
        loaderCallback(false)
            dispatch({
                type: PROJECT_DETAILS_GET_DETAILS,
                payload: response.data.project[0],
                interests:interests
            })
        })
        .catch(err=>{
        loaderCallback(false)
        console.log(err)
        })
    }
}