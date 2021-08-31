import {TOGGLE_EDIT_MODAL} from "./types";

const initialState = {
    showEditModal: false
}

export function appReducer(state = initialState, action) {
    switch (action.type){
        case TOGGLE_EDIT_MODAL:
            return {...state, showEditModal: !state.showEditModal}
        default: return state
    }
}