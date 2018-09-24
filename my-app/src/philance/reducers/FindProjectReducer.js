import {
    FIND_PROJECT_TEXT_CHANGED,
    FIND_PROJECT_LOCATION_CHANGED,
    FIND_PROJECT_RESOURCE_CHANGED,
    FIND_PROJECT_PROJECT_STATUS_CHANGED,
    FIND_PROJECT_IMPACT_CATEGORIES_CHANGED,
    FIND_PROJECT_COUNTRY_CHANGED,
    FIND_PROJECT_KEYWORD_CHANGED,
    FIND_PROJECT_UNMOUNT,
    FIND_PROJECTS_REQUEST_SUCCESS
} from '../actions/types'
const INITIAL_STATE = {
    tableData: [],
    impactCategories: [],
    yourLocation: "",
    resourceType: "0",
    projectStatus: "0",
    distanceFromYou: "0",
    keyword: '',
    country: '',
    textChanged: true
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FIND_PROJECTS_REQUEST_SUCCESS:
            return { ...state, tableData: action.payload }
        case FIND_PROJECT_TEXT_CHANGED:
            return { ...state, textChanged: action.payload }
        case FIND_PROJECT_LOCATION_CHANGED:
            return { ...state, yourLocation: action.payload }
        case FIND_PROJECT_COUNTRY_CHANGED:
            return { ...state, country: action.payload }
        case FIND_PROJECT_IMPACT_CATEGORIES_CHANGED:
            return { ...state, impactCategories: action.payload }
        case FIND_PROJECT_KEYWORD_CHANGED:
            return { ...state, keyword: action.payload }
        case FIND_PROJECT_RESOURCE_CHANGED:
            return { ...state, resourceType: action.payload }
        case FIND_PROJECT_PROJECT_STATUS_CHANGED:
            return { ...state, projectStatus: action.payload }
        case FIND_PROJECT_UNMOUNT:
            return { ...state, tableData: [], country: "", interests: '', resourceType: "0", projectStatus: "0", }
        default:
            return state
    }
}