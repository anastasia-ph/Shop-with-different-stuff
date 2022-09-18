import React from "react";

export class ProductCard extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="product-card__container" onClick={this.props.onClick} id={this.props.id}>
                <div className="product-card__container-with-cart-icon">
                    <img src="../assets/add_to_cart.svg" alt="add to cart" className="product-card__cart-icon" onClick={this.props.addToCart}></img>
                    <div className="product-card__image-container">

                        <img className={this.props.inStock ? (this.props.name == "Jacket" ? "product-card__image_jacket" : "product-card__image") : (this.props.name == "Jacket" ? "product-card__image_jacket product-card__image-outofstock" : "product-card__image product-card__image-outofstock")} src={this.props.src} alt={this.props.name}></img>
                        {!this.props.inStock && <p className="product_card__outofstock-text">Out of stock</p>}

                    </div>
                </div>

                <p className="product-card__product-name">{this.props.name}</p>
                <p className="product-card__product-price">{this.props.price}{this.props.symbol}</p>
            </div >
        )
    }
}