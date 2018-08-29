import {combineReducers} from 'redux'
import AuthReducer from './AuthReducer'
import RegisterReducer from './RegisterReducer'
import UserProfileReducer from './UserProfileReducer'

export default combineReducers({
    auth: AuthReducer,
    reg: RegisterReducer,
    user: UserProfileReducer
});