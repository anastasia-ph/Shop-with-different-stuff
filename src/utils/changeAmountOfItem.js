import store from "../store"
export function changeAmountOfItem(e) {
    let unsubscribe = store.subscribe(() => {
        localStorage.setItem("itemsPresentInCart", JSON.stringify(store.getState().itemsInCart.cart))
        console.log(store.getState().itemsInCart.amountOfItemsNumber)
        localStorage.setItem("amountOfItems", store.getState().itemsInCart.amountOfItemsNumber)

    })
    let action = e.target.innerHTML
    let itemID = e.target.parentElement.parentElement.id
    if (itemID === "") {
        itemID = (e.target.parentElement).parentElement.parentElement.id
        itemID = itemID.slice(0, itemID.lastIndexOf("-"))

    }

    action === "+" ? this.props.increaseAmountOfItem(itemID) : this.props.decreaseAmountOfItem(itemID)




    unsubscribe()
}