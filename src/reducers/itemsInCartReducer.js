import { ADD_NEW_TO_CART, INCREASE_AMOUNT_OF_ITEM, DECREASE_AMOUNT_OF_ITEM, UPDATE_AMOUNT_OF_ITEM, COUNT_TOTAL, SIMULATE_PURCHASE } from "../actions/actions"


export function shopCartReducer(state = { cart: JSON.parse(localStorage.getItem("itemsPresentInCart")) || [], amountOfItemsNumber: localStorage.getItem("amountOfItems") || 0, totalAmount: 0 }, action) {
    switch (action.type) {
        case ADD_NEW_TO_CART:
            return {
                ...state,
                cart: [...state.cart, action.cart],
                amountOfItemsNumber: action.amountOfItemsNumber
            }
        case UPDATE_AMOUNT_OF_ITEM:
            return {
                ...state,
                cart: state.cart.map((e, i) => i === action.i ? { ...e, amount: e.amount + 1 } : e),
                amountOfItemsNumber: action.amountOfItemsNumber
            }
        case INCREASE_AMOUNT_OF_ITEM:

            return {
                ...state,
                cart: state.cart.map((e) => e["unique_key"] == action.unique_key ? { ...e, amount: e.amount + 1 } : e),
                amountOfItemsNumber: Number(state.amountOfItemsNumber) + 1
            }
        case DECREASE_AMOUNT_OF_ITEM:
            let newCart = state.cart.map((e, i) => e["unique_key"] == action.unique_key ? { ...e, amount: e.amount - 1 } : e)
            newCart = newCart.filter((e) => e.amount != 0)
            return {
                ...state,

                cart: newCart,
                amountOfItemsNumber: state.amountOfItemsNumber - 1
            }
        case COUNT_TOTAL:
            return {
                ...state,
                totalAmount: action.totalAmount
            }
        case SIMULATE_PURCHASE:
            return {
                ...state,
                cart: [],
                amountOfItemsNumber: 0
            }
        default:
            return state;

    }
}