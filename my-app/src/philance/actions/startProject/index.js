import {
  START_PROJECT
} from '../types'

import axios from 'axios'

export const startProject=({
  name,
  description,
  volunteers,
  freelancers,
  skill,
  impact,
  latitude,
  longitude,
  startDate,
  endDate,
  budget
})=>{
  return dispatch => {
      dispatch({type: START_PROJECT})
      axios.post('http://localhost:3001/philance/projects/', {  
 projectName : name,
 description : description,
 location:latitude+','+longitude,
 volunteers:volunteers,
 freelancers:freelancers,
 estimatedBudget:budget,
 userId:"1",
 startDate :startDate,
 endDate :endDate,
 projectDetails:[  
    {  
      detailType: "SKILLS",
      name: "Database Development",
      certificationReq: "NO",
      certificationLink: "",
      attribute1 : "",
      attribute2 : "",
      attribute3 : "",
      attribute4 : "",
      attribute5 : ""
    },
    {  
      detailType: "SKILLS",
      name: "Java Development",
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
      name: "Elderly",
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
}
)
      .then(response=>console.log(response))
      .catch(error=>{
      console.log(error);
      });
  }
}