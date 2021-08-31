import {ADD_COST, EDIT_COST, GET_COST, TOGGLE_EDIT_MODAL} from './types'

export function addCost(cost) {
    return {
        type: ADD_COST,
        payload: cost
    }
}

export function getCost(selectedCost) {
    return {
        type: GET_COST,
        payload: selectedCost
    }
}

export function editCost(editedCost) {
    return {
        type: EDIT_COST,
        payload: editedCost
    }
}

export function toggleEditModal() {
    return {
        type: TOGGLE_EDIT_MODAL
    }
}