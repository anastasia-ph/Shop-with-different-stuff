import { combineReducers } from "redux";
import { currentCategoryReducer } from "./currentCategoryReducer";
import { shopCartReducer } from "./itemsInCartReducer";
import { currentCurrencyReducer } from "./currentCurrencyReducer"
import { switchCartDropdown } from "./switchCartDropdown";
import { setIDReducer } from "./setIDReducer";

export const rootReducer = combineReducers({
    categoryReducer: currentCategoryReducer,
    itemsInCart: shopCartReducer,
    currencyReducer: currentCurrencyReducer,
    switchCartDropdown: switchCartDropdown,
    setID: setIDReducer
})