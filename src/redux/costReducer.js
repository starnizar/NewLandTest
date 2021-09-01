import {ADD_COST, EDIT_COST, FILTER_COST, GET_COST, REMOVE_COST, SORT_CLICKED, UPDATE_COST} from './types'

const initialState = {
    allCosts:[],
    filteredCosts:[],
    selectedCost:{},
    isSortClicked: false
}

export function costReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_COST:
            return {...state, allCosts:[...state.allCosts, action.payload]}
        case GET_COST:
            return {...state, selectedCost: {...action.payload}}
        case REMOVE_COST:
            return{...state, allCosts: state.allCosts.filter(item => item.id !== action.payload)}
        case EDIT_COST:
            const index = state.allCosts.indexOf(state.allCosts.find(cost => cost.id === action.payload.id))
            const updatedCosts = [...state.allCosts]
            updatedCosts[index] = action.payload
            return {...state, allCosts: [...updatedCosts]}
        case UPDATE_COST:
            return {...state, allCosts: [...action.payload]}
        case FILTER_COST:
            return {...state, filteredCosts: [...action.payload]}
        case SORT_CLICKED:
            return {...state, isSortClicked: !state.isSortClicked}
        default: return state
    }
}