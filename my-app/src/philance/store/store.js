import {
    createStore,
    applyMiddleware
} from 'redux'
import Immutable from 'immutable'
import reducers  from '../reducers'
import ReduxThunk from 'redux-thunk'

const initialState = Immutable.fromJS({})

const store = createStore(
    reducers,
    initialState,
    applyMiddleware(ReduxThunk)
)

export default store