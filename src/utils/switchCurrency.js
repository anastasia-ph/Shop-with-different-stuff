export function switchCurrency(e) {
    localStorage.setItem("currentCurrency", e.currentTarget.children[0].innerHTML)
    console.log(e.currentTarget.children[0].innerHTML)
    this.setState({ currentCurrency: e.currentTarget.children[0].innerHTML })
    this.setState({ Displayed: !this.state.Displayed })
}