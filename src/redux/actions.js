import {ADD_COST, TOGGLE_EDIT_MODAL} from './types'

export function addCost(cost) {
    return {
        type: ADD_COST,
        payload: cost
    }
}

export function toggleEditModal() {
    return {
        type: TOGGLE_EDIT_MODAL
    }
}