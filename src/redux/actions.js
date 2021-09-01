import {
    ADD_COST,
    EDIT_COST,
    FILTER_COST,
    GET_COST,
    HIDE_ALERT, HIDE_EDIT_ALERT, HIDE_FILER_ALERT, SHOW_ALERT, SHOW_EDIT_ALERT, SHOW_FILTER_ALERT,
    SORT_CLICKED,
    TOGGLE_EDIT_MODAL, TOGGLE_FILTER_ALERT,
    UPDATE_COST
} from './types'

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

export function updateCost(sortedCost) {
    return {
        type: UPDATE_COST,
        payload: sortedCost
    }
}

export function filterCost(filteredCost) {
    return {
        type: FILTER_COST,
        payload: filteredCost
    }
}

export function sortClicked() {
    return {
        type: SORT_CLICKED
    }
}

export function toggleEditModal() {
    return {
        type: TOGGLE_EDIT_MODAL
    }
}

export function showAlert(message) {
    return dispatch => {
        dispatch({type: SHOW_ALERT, payload: message})
        setTimeout(() => dispatch(hideAlert()), 3000)
    }
}

export function hideAlert() {
    return {
        type: HIDE_ALERT
    }
}

export function showEditAlert(message) {
    return dispatch => {
        dispatch({type: SHOW_EDIT_ALERT, payload: message})
        setTimeout(() => dispatch(hideEditAlert()), 3000)
    }
}

export function hideEditAlert() {
    return {
        type: HIDE_EDIT_ALERT
    }
}