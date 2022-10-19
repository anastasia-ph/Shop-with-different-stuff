import React from "react";
import { Query } from "@apollo/client/react/components"
import { GET_ATTRIBUTES_BY_ID } from "../GRAPHQL/Queries";
import { addToCartQuickBuy } from "../utils/addToCartQuickBuy"
import { connect } from "react-redux";
import { ADD_NEW_TO_CART, UPDATE_AMOUNT_OF_ITEM } from "../actions/actions"


export class ProductCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isQuickBuyActive: false,
            id: "id"
        }
    }
    addToCartQuickBuyBinded = addToCartQuickBuy
    setQuickBuyParameter = (e) => {
        this.setState({ isQuickBuyActive: true })
        this.setState({ id: (e.currentTarget.parentElement).parentElement.id })
        e.stopPropagation()

    }
    render() {
        return (
            <div className="product-card__container" onClick={this.props.onClick} id={this.props.id}>
                <div className="product-card__container-with-cart-icon" >
                    <img src="../assets/add_to_cart.svg" alt="add to cart" className="product-card__cart-icon" onClick={this.setQuickBuyParameter}></img>
                    <div className="product-card__image-container">

                        <img className={this.props.inStock ? (this.props.name === "Jacket" ? "product-card__image_jacket" : "product-card__image") : (this.props.name === "Jacket" ? "product-card__image_jacket product-card__image-outofstock" : "product-card__image product-card__image-outofstock")} src={this.props.src} alt={this.props.name}></img>
                        {!this.props.inStock && <p className="product_card__outofstock-text">Out of stock</p>}
                        {this.state.isQuickBuyActive && <Query query={GET_ATTRIBUTES_BY_ID} variables={{ "id": this.state.id }} >
                            {({ data, error, loading }) => {
                                if (error) return <p>Error!</p>
                                if (loading) return <p>Loading...</p>
                                data.product.inStock && this.addToCartQuickBuyBinded(data)
                                return (
                                    <React.Fragment></React.Fragment>
                                )
                            }}
                        </Query>}

                    </div>
                </div>

                <p className="product-card__product-name">{this.props.name}</p>
                <p className="product-card__product-price">{this.props.price}{this.props.symbol}</p>
            </div >
        )
    }
}
const mapDispatchToProps = function (dispatch) {
    return {
        sendItemToCart: (value, amountOfItemsNumber) => dispatch({
            "type": ADD_NEW_TO_CART,
            "cart": value,
            "amountOfItemsNumber": amountOfItemsNumber
        }),
        updateAmountInCart: (value, amountOfItemsNumber) => dispatch({
            "type": UPDATE_AMOUNT_OF_ITEM,
            "i": value,
            "amountOfItemsNumber": amountOfItemsNumber
        })
    }
}
export default connect(undefined, mapDispatchToProps)(ProductCard)