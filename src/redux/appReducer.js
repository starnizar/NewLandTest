import {
    HIDE_ALERT,
    HIDE_EDIT_ALERT,
    SHOW_ALERT,
    SHOW_EDIT_ALERT,
    TOGGLE_EDIT_MODAL,
} from "./types";

const initialState = {
    showEditModal: false,
    formAlert: false,
    editAlert: false,
}

export function appReducer(state = initialState, action) {
    switch (action.type){
        case TOGGLE_EDIT_MODAL:
            return {...state, showEditModal: !state.showEditModal}
        case SHOW_ALERT:
            return {...state, formAlert: action.payload}
        case HIDE_ALERT:
            return {...state, formAlert: false}
        case SHOW_EDIT_ALERT:
            return {...state, editAlert: action.payload}
        case HIDE_EDIT_ALERT:
            return {...state, editAlert: false}
        default: return state
    }
}