import store from "../store"

export function simulatePurchase() {

    let unsubscribe = store.subscribe(() => {
        localStorage.removeItem("itemsPresentInCart")
        localStorage.setItem("amountOfItems", 0)
    })
    this.props.simulatePurchase()

    if (document.getElementsByClassName("cart-dropdown__total-value").length !== 0) { document.getElementsByClassName("cart-dropdown__total-value")[0].innerHTML = 0 }
    if (document.getElementsByClassName("value__tax").length !== 0) { document.getElementsByClassName("value__tax")[0].innerHTML = 0 }

    if (document.getElementsByClassName("value__total-price").length !== 0) { document.getElementsByClassName("value__total-price")[0].innerHTML = 0 }
    unsubscribe()
}