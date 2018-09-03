import { INTERESTS_ARRIVED } from '../actions/types'

const INITIAL_STATE = {
    interestOptions:[]
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case INTERESTS_ARRIVED:
            return {...state, interestOptions: action.payload}
        default:
        return state
    }
}