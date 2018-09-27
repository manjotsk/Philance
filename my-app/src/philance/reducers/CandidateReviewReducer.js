import {
    MY_CANDIDATE_GET_REVIEW,
    MY_CANDIDATE_STORE_REVIEW,
    CANDIDATE_STATUS_RESPONSE,
    MY_CANDIDATE_CHANGE_RESPONSE
} from '../actions/types'

const INITIAL_STATE = {
    response: null,
    length: 0,
    list: [],
    candidateStatusResponse:''
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case MY_CANDIDATE_GET_REVIEW:
            return {...state, response: action.payload, length: action.length}
        case MY_CANDIDATE_STORE_REVIEW:
            return {...state, list: action.payload}
        case CANDIDATE_STATUS_RESPONSE:
            return {...state, candidateStatusResponse: action.payload}
        case MY_CANDIDATE_CHANGE_RESPONSE:
            return {...state, response:action.payload }
        default:
            return state
    }
}