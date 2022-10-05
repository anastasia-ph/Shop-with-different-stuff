import $ from "jquery"
import store from "../store";


export function addToCart() {
    let unsubscribe = store.subscribe(() => {
        localStorage.setItem("itemsPresentInCart", JSON.stringify(store.getState().itemsInCart.cart))
    })
    let attributesValues = {}

    const ATTRIBUTES_GROUP = ($("div.attributes").find(".value-color__selected, .value-text__selected"));
    attributesValues["id"] = this.props.id;
    ATTRIBUTES_GROUP.each((i, e) => {
        //setup id 

        //setup key and values for object parameters (like color, size) which are created from first part of items id
        // (key) and last part of id(value)
        attributesValues[e.id.substring(0, e.id.indexOf("-"))] = (e.id.substring(e.id.lastIndexOf("-") + 1, e.id.length))
    })
    let uniqueKey = ""
    //setup unique key which is created from all parameters of item
    Object.keys(attributesValues).map((e) => uniqueKey += attributesValues[e])
    attributesValues["unique_key"] = uniqueKey
    //amount on this stage is always one, but items can be stacked inside the reducer
    attributesValues["amount"] = 1;
    //find all available attributes and compare them with those attributes we received in ATTRIBUTES_GROUP
    //if any of attributes is not set, warning message is displayed and data is not send to store until missed attribute will be
    //set up properly
    let availableAttributes = ($(".item-attributes__group").find(".item-attribute__name"))
    compareTwoSetsOfAttributes(availableAttributes, attributesValues)
    //compare unique key with other unique keys in store
    let itemsPresentInCart = store.getState().itemsInCart.cart
    let index;
    itemsPresentInCart.map((item, i) => item.unique_key === attributesValues.unique_key ? index = i : null)
    //if index of item in store with similar is not exist, send data as new object to store.
    //if index exists, just increase the amount for specific product in store
    let amountOfItems = store.getState().itemsInCart.cart.reduce((sum, e) => sum + e.amount, 1)
    localStorage.setItem("amountOfItems", amountOfItems)
    document.getElementById("attribute-not-set").innerHTML === "" && (index !== undefined ? this.props.updateAmountInCart(index, amountOfItems) :
        this.props.sendItemToCart(attributesValues, amountOfItems))
    this.setState({ amountOfItemsNumber: amountOfItems })

    unsubscribe()
}
function compareTwoSetsOfAttributes(available, present) {
    document.getElementById("attribute-not-set").innerHTML = "";
    let availableAttributesValues = []
    let presentAttributesValues = []
    available.each((i, e) => availableAttributesValues.push(e.innerHTML))
    Object.keys(present).map(e => presentAttributesValues.push(e))
    for (let i = 0; i < availableAttributesValues.length; i++) {
        if (presentAttributesValues.indexOf(availableAttributesValues[i]) < 0) {


            document.getElementById("attribute-not-set").innerHTML = `* Please specify all options!`
            break
        }
    }
}