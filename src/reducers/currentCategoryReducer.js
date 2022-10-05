import { CHANGE_CATEGORY } from "../actions/actions"


export function currentCategoryReducer(state = { currentCategory: localStorage.getItem("currentCategory") || "undefined" }, action) {
    switch (action.type) {
        case CHANGE_CATEGORY:
            return {

                currentCategory: action.currentCategory
            };
        default:
            return state;

    }
}