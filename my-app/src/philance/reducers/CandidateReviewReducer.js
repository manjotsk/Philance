import {
    MY_CANDIDATE_GET_REVIEW,
    MY_CANDIDATE_STORE_REVIEW
} from '../actions/types'

const INITIAL_STATE = {
    response: null,
    length: 0,
    list: []
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case MY_CANDIDATE_GET_REVIEW:
        console.log(action.payload);
            return {...state, response: action.payload, length: action.length}
        case MY_CANDIDATE_STORE_REVIEW:
        console.log(action.payload);
            return {...state, list: action.payload}
        default:
            return state
    }
}