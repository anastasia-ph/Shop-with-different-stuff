import React from "react";


export class AddToCartButton extends React.Component {
    render() {
        return (
            <div id="add-to-cart-button" className={this.props.inStock ? "button__add-to-cart" : "button__add-to-cart_out-of-stock"} onClick={this.props.inStock ? this.props.onClick : undefined}>{this.props.text}</div>
        )
    }
}