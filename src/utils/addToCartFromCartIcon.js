export function addToCartFromCartIcon(e) {

    this.setState({ itemsInCart: this.state.itemsInCart + 1 })
    e.stopPropagation();
}