import axios from 'axios'

import hostname from '../../../config'
import {MY_PROJECT_GET_PROJECTS, MY_PROJECT_STORE_PROJECTS} from '../types'

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

export const storeList =(list)=> {
    return dispatch=> {
        dispatch({
            type: MY_PROJECT_STORE_PROJECTS,
            payload: list
        })
        console.log('list', list)
    }
}