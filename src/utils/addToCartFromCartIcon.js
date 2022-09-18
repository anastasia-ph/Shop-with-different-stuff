export function addToCartFromCartIcon(e) {
    console.log(this)
    this.setState({ itemsInCart: this.state.itemsInCart + 1 })
    e.stopPropagation();
}