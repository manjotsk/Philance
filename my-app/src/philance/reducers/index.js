import {combineReducers} from 'redux'
import AuthReducer from './AuthReducer'
import RegisterReducer from './RegisterReducer'
import UserProfileReducer from './UserProfileReducer'
import StartProjectReducer from './StartProjectReducer'
import CommonReducer from './CommonReducer';
import ResetPasswordReducer from './ResetPasswordReducer';
import MyProjectReducer from './MyProjectReducer' 
import ProjectDetailsReducer from './ProjectDetailsReducer'
import ApplyProjectReducer from './ApplyProjectReducer'
import FindProjectReducer from './FindProjectReducer';
import CandidateReviewReducer from './CandidateReviewReducer';
import PublicProfileReducer from './PublicProfileReducer';

export default combineReducers({
    auth: AuthReducer,
    reg: RegisterReducer,
    user: UserProfileReducer,
    start: StartProjectReducer,
    findProject: FindProjectReducer,
    candidateReview: CandidateReviewReducer,
    common: CommonReducer,
    resetpass: ResetPasswordReducer,
    mypro: MyProjectReducer,
    proDetails: ProjectDetailsReducer,
    applypro: ApplyProjectReducer,
    publicUserPage: PublicProfileReducer
});