export function switchCurrency(e) {
    this.props.sendCurrency(e.currentTarget.children[0].innerHTML)
    localStorage.setItem("currentCurrency", e.currentTarget.children[0].innerHTML);
    this.setState({ isCurrencyBlockDisplayed: !this.state.isCurrencyBlockDisplayed })
    this.setState({ currentCurrency: e.currentTarget.children[0].innerHTML })
}