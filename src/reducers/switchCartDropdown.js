import { SWITCH_CART_DROPDOWN } from "../actions/actions";

export function switchCartDropdown(state = { isCartDropdown: false }, action) {
    switch (action.type) {
        case SWITCH_CART_DROPDOWN:
            return {
                ...state,
                isCartDropdown: action.isCartDropdown
            };
        default:
            return state
    }
}