import {
    PROJECT_DETAILS_GET_DETAILS,
    PROJECT_DETAILS_CHANGED
} from '../actions/types'

const INITIAL_STATE = {
    name: '',
    status: '',
    description: '',
    zipCode: '',
    country: '',
    startDate: '',
    endDate: '',
    budget: '',
    interests: '',
    volunteers: '',
    freelancers: ''
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case PROJECT_DETAILS_GET_DETAILS:
            return {
                ...state,
                name: action.payload.projectName,
                status: action.payload.status,
                description: action.payload.description,
                zipCode: action.payload.zipCode,
                country: action.payload.country,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate,
                budget: action.payload.estimatedBudget,
                volunteers: action.payload.volunteers,
                freelancers: action.payload.freelancers
            }
        case PROJECT_DETAILS_CHANGED:
            return {
                ...state
            }
        default:
            return state
    }
}