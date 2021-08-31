import {ADD_COST} from './types'

const initialState = {
    allCosts:[]
}

export function costReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_COST:
            console.log(action.payload)
            return {...state, allCosts:[...state.allCosts, action.payload]}
        default: return state
    }
}