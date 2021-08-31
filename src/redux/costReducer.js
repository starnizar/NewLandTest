import {ADD_COST, EDIT_COST, GET_COST} from './types'

const initialState = {
    allCosts:[],
    selectedCost:{}
}

export function costReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_COST:
            return {...state, allCosts:[...state.allCosts, action.payload]}
        case GET_COST:
            console.log(action.payload)
            return {...state, selectedCost: {...action.payload}}
        case EDIT_COST:
            const index = state.allCosts.indexOf(state.allCosts.find(cost => cost.id === action.payload.id))
            const updatedCosts = [...state.allCosts]
            updatedCosts[index] = action.payload
            return {...state, allCosts: [...updatedCosts]}
        default: return state
    }
}