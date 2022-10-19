
export function countTotalAmount() {
    const PARSED_JSON = JSON.parse(localStorage.getItem("itemsPresentInCart"))
    const CURRENT_CURRENCY = localStorage.getItem("currentCurrency")
    const AMOUNT = document.getElementsByClassName("buttons-container__amount")

    if (PARSED_JSON !== null) {
        const PRICES = document.getElementsByClassName("fullsize-cart__item-price");

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

            document.getElementsByClassName("value__tax")[0].innerHTML = result !== 0 ? `${((result / 100) * 21).toFixed(2)}${CURRENT_CURRENCY}` : `${0}${CURRENT_CURRENCY}`
            document.getElementsByClassName("value__total-price")[0].innerHTML = result !== 0 ? `${result.toFixed(2)}${CURRENT_CURRENCY}` : `0${CURRENT_CURRENCY}`
        }

    }
    else {
        document.getElementsByClassName("value__total-price")[0].innerHTML = `0${CURRENT_CURRENCY}`

    }
}
