import axios from 'axios'

import {hostname} from '../../../config'
import {MY_PROJECT_GET_PROJECTS, MY_PROJECT_STORE_PROJECTS} from '../types'

export const myProject =(id)=> {
    return dispatch=> {
        axios.get(hostname()+`/philance/users/${id}/projects/`)
        .then(
            response=>{
                console.log(response.data)
                dispatch({
                    type: MY_PROJECT_GET_PROJECTS,
                    payload: response.data,
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