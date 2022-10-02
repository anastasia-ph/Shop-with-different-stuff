import { CHANGE_CURRENCY } from "../actions/actions"

export function currentCurrencyReducer(state = { currentCurrency: localStorage.getItem("currentCurrency") || "undefined" }, action) {
    switch (action.type) {
        case CHANGE_CURRENCY:
            return {
                ...state,
                currentCurrency: action.currentCurrency
            };
        default:
            return state;

    }
}