import React from "react";

export class AddToCartButton extends React.Component {
    render() {
        return (
            <div className="button__add-to-cart" onClick={this.props.onClick}>{this.props.text}</div>
        )
    }
}