import { INTERESTS_ARRIVED, UPLOAD_FAILED, UPLOAD_SUCCESS } from '../actions/types'

const INITIAL_STATE = {
    interestOptions:[],
    uploadStatus:'NOT_INITIATED'
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case INTERESTS_ARRIVED:
            return {...state, interestOptions: action.payload}
        case UPLOAD_SUCCESS:
            return {...state, uploadStatus: 'Done!'}
        case UPLOAD_FAILED:
            return {...state, uploadStatus: 'Upload Failed'}
        default:
        return state
    }
}