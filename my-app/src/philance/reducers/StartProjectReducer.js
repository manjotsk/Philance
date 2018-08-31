import {
    START_PROJECT,
    START_PROJECT_BUDGET_CHANGED,
    START_PROJECT_DESCRIPTION_CHANGED,
    START_PROJECT_END_DATE_CHANGED,
    START_PROJECT_FIELDS_EMPTY,
    START_PROJECT_FREELANCERS_CHANGED,
    START_PROJECT_NAME_CHANGED,
    START_PROJECT_START_DATE_CHANGED,
    START_PROJECT_VOLUNTEERS_CHANGED,
    START_PROJECT_ZIP_CODE_CHANGED,
} from '../actions/types'

const INITIAL_STATE = {
    name: '',
    description: '',
    zipCode: '',
    volunteers: '',
    freelancers: '',
    startDate: '',
    endDate: '',
    budget: '',
    text: 'CREATE A PROJECT'
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case START_PROJECT:
            return {...state, text: 'CREATE A PROJECT'}
        case START_PROJECT_NAME_CHANGED: 
            return {...state, name: action.payload}
        case START_PROJECT_DESCRIPTION_CHANGED:
            return{...state, description: action.payload}
        case START_PROJECT_ZIP_CODE_CHANGED:
            return{...state, zipCode: action.payload}
        case START_PROJECT_VOLUNTEERS_CHANGED:
            return{...state, volunteers: action.payload}
        case START_PROJECT_FREELANCERS_CHANGED:
            return{...state, freelancers: action.payload} 
        case START_PROJECT_START_DATE_CHANGED:
            return{...state, startDate: action.payload} 
        case START_PROJECT_END_DATE_CHANGED:
            return{...state, endDate: action.payload} 
        case START_PROJECT_BUDGET_CHANGED:
            return{...state, budget: action.payload}
        case START_PROJECT_BUDGET_CHANGED:
            return{...state, budget: action.payload}
        case START_PROJECT_FIELDS_EMPTY:
            return{...state, text: 'ALL FIELDS REQUIRED'}  
        default:
        return state
    }
}