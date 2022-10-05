import { SET_ID } from "../actions/actions"

export function setIDReducer(state = { id: localStorage.getItem("currentID") || "undefined" }, action) {
    switch (action.type) {
        case SET_ID:
            return {
                ...state,
                id: action.ID
            };
        default:
            return state;

    }
}