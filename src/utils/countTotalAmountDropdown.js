
export function countTotalAmount() {
    const PARSED_JSON = JSON.parse(localStorage.getItem("itemsPresentInCart"))
    const PRICES = document.getElementsByClassName("cart-item-dropdown__product-price");
    const AMOUNT = document.getElementsByClassName("buttons-container__amount")
    const CURRENT_CURRENCY = localStorage.getItem("currentCurrency")
    if (PARSED_JSON !== null) {
        if (PRICES.length !== PARSED_JSON.length) {
            window.setTimeout(countTotalAmount, 5)
        }
        else {
            let totalAmount = []
            for (let i = 0; i < PRICES.length; i++) {
                totalAmount.push(PRICES[i].innerHTML.slice(0, PRICES[i].innerHTML.indexOf(localStorage.getItem("currentCurrency"))) * AMOUNT[i].innerHTML)
            }
            let result = 0;
            for (let i = 0; i < totalAmount.length; i++) {

                result = result + Number(totalAmount[i])
            }

            document.getElementsByClassName("cart-dropdown__total-value")[0].innerHTML = `${result.toFixed(2)}${CURRENT_CURRENCY}`
        }
    }
    else {
        document.getElementsByClassName("cart-dropdown__total-value")[0].innerHTML = `0${CURRENT_CURRENCY}`

    }

}
