import axios from 'axios'

import hostname from '../../../config'
import {MY_PROJECT_GET_PROJECTS} from '../types'

export const myProject =()=> {
    return dispatch=> {
        axios.get(hostname()+'/philance/users/1/projects/')
        .then(
            response=>{
                dispatch({
                    type: MY_PROJECT_GET_PROJECTS,
                    payload: response.data.Projects,
                    length: response.data.Projects.length
                })
            }
        )
    }
}