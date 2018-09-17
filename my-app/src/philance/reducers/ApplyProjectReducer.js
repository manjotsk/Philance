import {
    APPLY_FOR_PROJECT_MESSAGE_CHANGED,
    APPLY_FOR_PROJECT_ROLE_CHANGED,
    APPLY_FOR_PROJECT_REMOVE_TOASTER,
    APPLY_FOR_PROJECT_UPDATE_SUCCESS,
} from '../actions/types'

const INITIAL_STATE = {
    message: '',
    role: '',
    toast: false,
    response: null
}

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case APPLY_FOR_PROJECT_MESSAGE_CHANGED: 
            return {...state, message: action.payload}
        
        case APPLY_FOR_PROJECT_ROLE_CHANGED: 
            return {...state, role: action.payload}
        
        case APPLY_FOR_PROJECT_REMOVE_TOASTER: 
            return {...state, toast: false}
        
        case APPLY_FOR_PROJECT_UPDATE_SUCCESS: 
            return {...state, response: action.payload, toast: true}

        default:
            return state
    }
}