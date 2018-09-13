import {combineReducers} from 'redux'
import AuthReducer from './AuthReducer'
import RegisterReducer from './RegisterReducer'
import UserProfileReducer from './UserProfileReducer'
import StartProjectReducer from './StartProjectReducer'
import CommonReducer from './CommonReducer';
import ResetPasswordReducer from './ResetPasswordReducer';
import MyProjectReducer from './MyProjectReducer' 
import ProjectDetailsReducer from './ProjectDetailsReducer'

export default combineReducers({
    auth: AuthReducer,
    reg: RegisterReducer,
    user: UserProfileReducer,
    start: StartProjectReducer,
    common: CommonReducer,
    resetpass: ResetPasswordReducer,
    mypro: MyProjectReducer,
    proDetails: ProjectDetailsReducer
});