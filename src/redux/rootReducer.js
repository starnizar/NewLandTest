import {combineReducers} from 'redux'
import {costReducer} from './costReducer'
import {appReducer} from './appReducer'

export const rootReducer = combineReducers({
    costs: costReducer,
    app: appReducer
})