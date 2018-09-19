import axios from 'axios'

import {hostname} from '../../../config'
import {MY_CANDIDATE_GET_REVIEW, MY_CANDIDATE_STORE_REVIEW} from '../types'

export const getProjectCandidateReviewList =(id)=> {
    return dispatch=> {
        axios.get(hostname()+`/philance/projects/${id}/users/`)
        .then(
            response=>{
                console.log(response.data)
                dispatch({
                    type: MY_CANDIDATE_GET_REVIEW,
                    payload: response.data.Candidates,
                    length: response.data.Candidates.length
                })
            }
        )
    }
}

export const storeCandidateReview =(list)=> {
    return dispatch=> {
        console.log(list)
        dispatch({
            type: MY_CANDIDATE_STORE_REVIEW,
            payload: list
        })
        console.log('list', list)
    }
}