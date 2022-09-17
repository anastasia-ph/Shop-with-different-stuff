import { CHANGE_CATEGORY } from "../actions/actions"

const initialState = {
    currentCategory: localStorage.getItem("currentCategory")
}
function shopReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_CATEGORY:
            return {
                currentCategory: state.currentCategory
            };
        default:
            return state;

    }
}

export default shopReducer