import store from "../store"
export function changeAmountOfItem(e) {
    let unsubscribe = store.subscribe(() => {
        localStorage.setItem("itemsPresentInCart", JSON.stringify(store.getState().itemsInCart.cart))
        localStorage.setItem("amountOfItems", store.getState().amountOfItems)

    })
    let action = e.target.innerHTML
    let itemID = (e.target.parentElement).parentElement.id

    action === "+" ? this.props.increaseAmountOfItem(itemID) : this.props.decreaseAmountOfItem(itemID)


    unsubscribe()
}