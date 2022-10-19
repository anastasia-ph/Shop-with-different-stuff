import store from "../store";


export function addToCartQuickBuy(data) {
    let unsubscribe = store.subscribe(() => {
        localStorage.setItem("itemsPresentInCart", JSON.stringify(store.getState().itemsInCart.cart))
    })
    let attributesValues = {}
    attributesValues["id"] = data.product.id
    const ATTRIBUTES_GROUP = data.product.attributes
    ATTRIBUTES_GROUP.map((e) => attributesValues[e.name] = e.items[0].value)
    let uniqueKey = ""
    Object.keys(attributesValues).map((e) => uniqueKey += attributesValues[e])
    attributesValues["unique_key"] = uniqueKey
    attributesValues["amount"] = 1;
    let { itemsInCart: { cart: itemsPresentInCart } } = store.getState()
    let index;
    itemsPresentInCart.map((item, i) => item.unique_key === attributesValues.unique_key ? index = i : null)
    let amountOfItems = store.getState().itemsInCart.cart.reduce((sum, e) => sum + e.amount, 1)
    localStorage.setItem("amountOfItems", amountOfItems)
    index !== undefined ? this.props.updateAmountInCart(index, amountOfItems) :
        this.props.sendItemToCart(attributesValues, amountOfItems)

    unsubscribe()
}