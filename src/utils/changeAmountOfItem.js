import store from "../store"
export function changeAmountOfItem(e) {
    let unsubscribe = store.subscribe(() => {
        localStorage.setItem("itemsPresentInCart", JSON.stringify(store.getState().itemsInCart.cart))
        localStorage.setItem("amountOfItems", store.getState().itemsInCart.amountOfItemsNumber)

    })
    let { innerHTML: action } = e.target
    let { parentElement: { parentElement: { id: itemID } } } = e.target
    if (itemID === "") {
        itemID = (e.target.parentElement).parentElement.parentElement.id
        itemID = itemID.slice(0, itemID.lastIndexOf("-"))

    }

    action === "+" ? this.props.increaseAmountOfItem(itemID) : this.props.decreaseAmountOfItem(itemID)




    unsubscribe()
}