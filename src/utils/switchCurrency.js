export function switchCurrency(e) {
    this.props.sendCurrency(e.currentTarget.children[0].innerHTML)
    localStorage.setItem("currentCurrency", e.currentTarget.children[0].innerHTML)
}